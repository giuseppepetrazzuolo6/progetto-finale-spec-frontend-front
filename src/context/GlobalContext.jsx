import { createContext } from "react";
import { useState, useEffect, useMemo, useCallback } from "react";

const apiUrl = import.meta.env.VITE_API_URL

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    const [games, setGames] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')
    const [compareIds, setCompareIds] = useState([])
    const [compareList, setCompareList] = useState([])

    const [favList, setFavList] = useState(() => {
        const savedFav = localStorage.getItem("favourites")
        return savedFav ? JSON.parse(savedFav) : []
    })

    const fetchGames = useCallback(async () => {
        try {
            const response = await fetch(`${apiUrl}/games`)
            const data = await response.json()
            setGames(data)
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        fetchGames()
    }, [fetchGames])

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

    const fetchGameById = useCallback(async (id) => {
        const response = await fetch(`${apiUrl}/games/${id}`)
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`)
        }
        const data = await response.json()
        return data.game
    }, [])

    const toggleCompare = useCallback((game) => {
        setCompareIds(prev => {
            if (prev.includes(game.id)) {
                return prev.filter(id => id !== game.id)
            }
            if (prev.length >= 2) {
                return [prev[1], game.id]
            }
            return [...prev, game.id]
        })
    }, [])

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

    }, [compareIds, fetchGameById])

    const clearCompareList = useCallback(() => {
        setCompareList([])
    }, [])

    const addToFav = useCallback((game) => {
        setFavList(prev => {
            if (prev.find(g => g.id === game.id)) {
                return prev
            }
            return [...prev, game]
        })
    }, [])

    const removeFromFav = useCallback((id) => {
        setFavList(prev => prev.filter(g => g.id !== id))
    }, [])

    const isInFav = useCallback((id) => {
        return favList.some(g => g.id === id)
    }, [favList])

    const clearFav = useCallback(() => {
        setFavList([])
    }, [])

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