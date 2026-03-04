import { createContext } from "react";
import { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {
    const [games, setGames] = useState([])

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

    return (
        <GlobalContext.Provider value={{ games }}>
            {children}
        </GlobalContext.Provider>
    )
}