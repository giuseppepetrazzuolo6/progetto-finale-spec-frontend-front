import { createContext } from "react";
import { useState, useEffect, useMemo } from "react";
const apiUrl = import.meta.env.VITE_API_URL

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {
    const [games, setGames] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')


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



    return (
        <GlobalContext.Provider value={{ games, filteredGames, search, setSearch, category, setCategory, categoriesOptions, sortOrder, setSortOrder }}>
            {children}
        </GlobalContext.Provider>
    )
}