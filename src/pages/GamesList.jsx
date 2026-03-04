import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function GamesList() {
    const { games } = useContext(GlobalContext)

    return (
        <div>
            {
                games && games.map(game => (
                    <div key={game.id}>
                        <h4>Titolo del gioco: {game.title}</h4>
                        <p>categoria: {game.category}</p>
                    </div>
                ))
            }
        </div>
    )
}