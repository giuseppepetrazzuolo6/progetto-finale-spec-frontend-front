import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

import Card from "../components/Card"

export default function GamesList() {
    const { games } = useContext(GlobalContext)

    return (
        <section>
            <div className="container">
                {
                    games && games.map(game => (
                        <Card key={game.id} game={game} />
                    ))
                }
            </div>
        </section>
    )
}