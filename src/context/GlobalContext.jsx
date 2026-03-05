import { createContext } from "react";
import { useState, useEffect, useMemo } from "react";
const apiUrl = import.meta.env.VITE_API_URL

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {
    const [games, setGames] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')


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
        return games.filter(g =>
            g.title.toLowerCase().includes(search.toLowerCase()) &&
            (category === '' || g.category === category))
    }, [search, games, category])

    const categoriesOptions = [...new Set(games.map(g => g.category))]



    return (
        <GlobalContext.Provider value={{ games, filteredGames, search, setSearch, category, setCategory, categoriesOptions }}>
            {children}
        </GlobalContext.Provider>
    )
}