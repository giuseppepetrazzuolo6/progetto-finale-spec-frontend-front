import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { Link } from "react-router-dom"

export default function GamesCompare() {

    const {
        compareList,
        clearCompareList,
        addToFav,
        removeFromFav,
        isInFav
    } = useContext(GlobalContext)

    return (
        <section className="detail-wrapper">
            <div className="detail-card">
                <h1 className="detail-title" style={{ fontSize: "32px" }}>
                    Confronto giochi
                </h1>
                {compareList.length === 0 && (
                    <p className="detail-description">
                        Nessun gioco selezionato per il confronto.
                    </p>
                )}
                {compareList.length > 0 && (
                    <div className="detail-grid">
                        {compareList.map(game => (
                            <div key={game.id} className="compare-section">
                                <h3 style={{ color: "#e6e9ff", marginBottom: "15px" }}>
                                    {game.title}
                                    <button
                                        className={isInFav(game.id)
                                            ? "btn btn-warning btn-sm ms-2"
                                            : "btn btn-outline-warning btn-sm ms-2"}
                                        onClick={() =>
                                            isInFav(game.id)
                                                ? removeFromFav(game.id)
                                                : addToFav(game)
                                        }
                                    >
                                        <i className="bi bi-star-fill"></i>
                                    </button>
                                </h3>
                                <p>
                                    <strong>Categoria</strong>
                                    <br />
                                    {game.category}
                                </p>
                                <p>
                                    <strong>Prezzo</strong>
                                    <br />
                                    {game.price}
                                </p>
                                <p>
                                    <strong>Valutazione</strong>
                                    <br />
                                    {game.rating}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    {compareList.length > 0 && (
                        <button
                            onClick={clearCompareList}
                            className="btn btn-outline-danger">
                            Rimuovi tutto
                        </button>
                    )}
                    <Link to="/" className="btn btn-primary">
                        Torna alla lista giochi
                    </Link>
                </div>
            </div>
        </section>
    )
}