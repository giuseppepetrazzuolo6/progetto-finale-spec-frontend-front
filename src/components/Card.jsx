import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

import { Link } from "react-router-dom"

export default function Card({ game }) {
    const { toggleCompare, compareList, addToFav, removeFromFav, isInFav } = useContext(GlobalContext)


    return (

        <div className="card p-3 my-3" key={game.id}>
            <h5 className="mb-2">{game.title}</h5>
            <p className="text-muted">
                Categoria: {game.category}
            </p>
            <div className="buttonBox">
                <Link
                    className="btn btn-primary btn-sm"
                    to={`/games/${game.id}`}>
                    Dettagli
                </Link>
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => toggleCompare(game)}>

                    {compareList.find(c => c.id === game.id)
                        ? "Rimuovi confronto"
                        : "Confronta"}

                </button>
                <button
                    className={isInFav(game.id)
                        ? "btn btn-warning btn-sm"
                        : "btn btn-outline-warning btn-sm"}
                    onClick={() =>
                        isInFav(game.id)
                            ? removeFromFav(game.id)
                            : addToFav(game)
                    }>
                    <i className="bi bi-star-fill"></i>
                </button>
            </div>
        </div>
    )

}