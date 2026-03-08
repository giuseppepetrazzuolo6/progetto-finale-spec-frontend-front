import { createContext } from "react";
import { useState, useEffect, useMemo } from "react";
const apiUrl = import.meta.env.VITE_API_URL

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {
    const [games, setGames] = useState([]) //variabile di stato per i record
    const [search, setSearch] = useState('') //variabile di stato per la searcbar
    const [category, setCategory] = useState('') //variabile di stato per la select
    const [sortOrder, setSortOrder] = useState('asc') //variabile di stato per l'ordinamento
    const [compareIds, setCompareIds] = useState([]) //variabile di stato per fetchData tramite id
    const [compareList, setCompareList] = useState([]) //variabile di stato per il confronto

    //variabile di stato per i preferiti
    const [favList, setFavList] = useState(() => {
        const savedFav = localStorage.getItem("favourites") //localstorage per salvare i dati nella memoria locale
        return savedFav ? JSON.parse(savedFav) : []
    })

    //chiamata API per ottenere tutti i record
    const fetchGames = async () => {
        try {
            const response = await fetch(`${apiUrl}/games`)
            const data = await response.json()
            return setGames(data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchGames()
    }, [])

    //filtraggi per searchbar, select ed ordinamento alfabetico
    const filteredGames = useMemo(() => {
        let result = games.filter(g =>
            g.title.toLowerCase().includes(search.toLowerCase()) &&
            (category === '' || g.category === category))

        if (sortOrder === "asc") {
            result = [...result].sort((a, b) =>
                a.title.localeCompare(b.title)
            )
        }

        if (sortOrder === "desc") {
            result = [...result].sort((a, b) =>
                b.title.localeCompare(a.title)
            )
        }

        return result
    }, [search, games, category, sortOrder])

    const categoriesOptions = [...new Set(games.map(g => g.category))]

    //funzione per ottenere i record tramite id
    const fetchGameById = async (id) => {
        const response = await fetch(`${apiUrl}/games/${id}`)
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`)
        }
        const data = await response.json()
        return data.game
    }

    const toggleCompare = (game) => {
        setCompareIds(prev => {
            if (prev.includes(game.id)) {
                return prev.filter(id => id !== game.id)
            }
            if (prev.length >= 2) {
                return [prev[1], game.id]
            }
            return [...prev, game.id]
        })
    }

    useEffect(() => {
        if (compareIds.length === 0) {
            setCompareList([])
            return
        }
        const loadCompareGames = async () => {
            try {
                const fullGames = await Promise.all(
                    compareIds.map(id => fetchGameById(id))
                )
                setCompareList(fullGames)
            } catch (error) {
                console.error("Errore nel caricamento del confronto:", error)
            }
        }
        loadCompareGames()
    }, [compareIds])

    const clearCompareList = () => {
        setCompareList([])
    }

    //gestione della lista dei preferiti
    const addToFav = (game) => {
        setFavList(prev => {
            if (prev.find(g => g.id === game.id)) {
                return prev
            }
            return [...prev, game]
        })
    }

    const removeFromFav = (id) => {
        setFavList(prev => prev.filter(g => g.id !== id))
    }

    const isInFav = (id) => {
        return favList.some(g => g.id === id)
    }

    const clearFav = () => {
        setFavList([])
    }

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favList))
    }, [favList])

    return (
        <GlobalContext.Provider value={{
            games,
            filteredGames,
            search,
            setSearch,
            category,
            setCategory,
            categoriesOptions,
            sortOrder,
            setSortOrder,
            toggleCompare,
            compareList,
            clearCompareList,
            favList,
            addToFav,
            removeFromFav,
            clearFav,
            isInFav
        }}>
            {children}
        </GlobalContext.Provider>
    )
}