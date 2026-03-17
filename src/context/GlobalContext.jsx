import { createContext, useState, useEffect, useMemo, useCallback } from "react";
const apiUrl = import.meta.env.VITE_API_URL

export const GlobalContext = createContext() // creazione contenitore globale

export function GlobalProvider({ children }) {

    const [games, setGames] = useState([]) //variabile di stato per i record
    const [search, setSearch] = useState('') //variabile di stato per searchbar
    const [category, setCategory] = useState('') //vairabile di stato per select
    const [sortOrder, setSortOrder] = useState('az') //variabile di stato per ordinamento
    const [compareIds, setCompareIds] = useState([]) //variabile di stato per fetching tramite id
    const [compareList, setCompareList] = useState([]) //variabile di stato per il confronto

    // variabile di stato per i preferiti
    const [favList, setFavList] = useState(() => {
        const savedFav = localStorage.getItem("favourites")
        return savedFav ? JSON.parse(savedFav) : []
    })

    // chiamata API per ottenere tutti i record
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(`${apiUrl}/games`);
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error("Errore nel recupero dei giochi:", error);
            }
        };

        fetchGames();
    }, []);

    //filtraggi per searchbar, select ed ordinamento alfabetico
    const filteredGames = useMemo(() => {
        let result = games.filter(g =>
            g.title.toLowerCase().includes(search.toLowerCase()) &&
            (category === '' || g.category === category))

        result = [...result].sort((a, b) =>
            sortOrder === "az"
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title)
        )

        return result
    }, [search, games, category, sortOrder])

    const categoriesOptions = useMemo(() => {
        return [...new Set(games.map(g => g.category))]
    }, [games])

    //chiamata API per singolo record(id)
    const fetchGameById = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/games/${id}`);
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            const data = await response.json();
            return data.game;
        } catch (error) {
            console.error(`Errore nel recupero del gioco con id ${id}:`, error);
            throw error;
        }
    }

    //funzione per aggiungere record al confronto
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

    //promise.all per gestire le chiamate API
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
        setCompareIds([])
        setCompareList([])
    }

    //gestione lista preferiti
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
        return favList.some(g => g.id === id);
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