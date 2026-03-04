import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

import { Link } from "react-router-dom"

export default function GamesList() {
    const { games } = useContext(GlobalContext)

    return (
        <div>
            {
                games && games.map(game => (
                    <div key={game.id}>
                        <h4>Titolo del gioco: {game.title}</h4>
                        <p>categoria: {game.category}</p>
                        <Link to={`/games/${game.id}`}>Dettagli</Link>
                    </div>
                ))
            }
        </div>
    )
}