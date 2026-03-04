import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { Link } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

export default function GamesDetails() {
    const { id } = useParams()
    const [game, setGame] = useState(null)

    const fetchDetails = async () => {
        try {
            const response = await fetch(`${apiUrl}/games/${id}`)
            const data = await response.json()
            return setGame(data.game)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchDetails()
    }, [])

    return (
        <>

            <div>
                <div>
                    {game && (
                        <div>
                            <p>{game.title}</p>
                            <p>{game.description}</p>
                            <p>{game.developer}</p>
                            <p>{game.playtime}</p>
                            <Link to={'/'}>Torna ai giochi</Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}