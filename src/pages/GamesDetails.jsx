import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { GlobalContext } from "../context/GlobalContext"

const apiUrl = import.meta.env.VITE_API_URL

export default function GamesDetails() {

    const { id } = useParams()
    const [game, setGame] = useState(null)

    const {
        addToFav,
        removeFromFav,
        isInFav
    } = useContext(GlobalContext)

    const fetchDetails = async () => {
        try {
            const response = await fetch(`${apiUrl}/games/${id}`)
            const data = await response.json()
            setGame(data.game)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchDetails()
    }, [id])

    if (!game) return null

    return (
        <div className="detail-wrapper">
            <div className="detail-card">
                <div className="detail-header">
                    <h1 className="detail-title">
                        {game.title}
                    </h1>
                </div>
                <p className="detail-description">
                    {game.description}
                </p>
                <div className="detail-grid">
                    <div>
                        <strong>Categoria</strong>
                        <p>{game.category}</p>
                    </div>
                    <div>
                        <strong>Piattaforma</strong>
                        <p>{game.platform}</p>
                    </div>
                    <div>
                        <strong>Sviluppatore</strong>
                        <p>{game.developer}</p>
                    </div>
                    <div>
                        <strong>Durata</strong>
                        <p>{game.playtime}h</p>
                    </div>
                    <div>
                        <strong>Prezzo</strong>
                        <p>{game.price}€</p>
                    </div>
                    <div>
                        <strong>Valutazione</strong>
                        <p>{game.rating}</p>
                    </div>
                </div>
                <div className="detail-actions">
                    <button
                        className={isInFav(game.id)
                            ? "btn btn-warning btn-sm fav-btn"
                            : "btn btn-outline-warning btn-sm fav-btn"}
                        onClick={() =>
                            isInFav(game.id)
                                ? removeFromFav(game.id)
                                : addToFav(game)
                        }>
                        {isInFav(game.id)
                            ? "Rimuovi dai Preferiti"
                            : "Aggiungi ai Preferiti"}
                    </button>
                    <Link className="btn btn-primary btn-sm" to="/">
                        ← Torna alla lista giochi
                    </Link>
                </div>
            </div>
        </div>
    )
}