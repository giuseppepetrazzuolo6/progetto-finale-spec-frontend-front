import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

import { Link } from "react-router-dom"

export default function Card({ game }) {
    const { toggleCompare, compareList, addToFav, removeFromFav, isInFav } = useContext(GlobalContext)


    return (

        <div className="card p-2 my-2" key={game.id}>
            <h4>Titolo del gioco: {game.title}</h4>
            <p>categoria: {game.category}</p>
            <div className="buttonBox">
                <Link className="btn btn-secondary" to={`/games/${game.id}`}>Dettagli</Link>
                <button className="btn btn-secondary mx-1" onClick={() => toggleCompare(game)}>
                    {compareList.find(c => c.id === game.id) ? "Rimuovi da confronto" : "Confronta"}
                </button>
                <button onClick={() => isInFav(game.id) ? removeFromFav(game.id) : addToFav(game)}>Aggiungi ai preferiti</button>
            </div>
        </div>
    )

}