import { createContext } from "react";
import { useState, useEffect, useMemo } from "react";
const apiUrl = import.meta.env.VITE_API_URL

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {
    const [games, setGames] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')
    const [compareList, setCompareList] = useState([])


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

    const toggleCompare = async (game) => {
        try {
            const response = await fetch(`${apiUrl}/games/${game.id}`)
            const data = await response.json()
            const fullGame = data.game
            setCompareList(prev => {
                if (prev.find(g => g.id === fullGame.id)) {
                    return prev.filter(g => g.id !== fullGame.id)
                }
                if (prev.length >= 2) {
                    return [prev[1], fullGame]
                }
                return [...prev, fullGame]
            })
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <GlobalContext.Provider value={{ games, filteredGames, search, setSearch, category, setCategory, categoriesOptions, sortOrder, setSortOrder, toggleCompare, compareList }}>
            {children}
        </GlobalContext.Provider>
    )
}