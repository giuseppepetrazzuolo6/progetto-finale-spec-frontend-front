import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { Link } from "react-router-dom"

export default function Favourites() {
    const { favList, removeFromFav, clearFav } = useContext(GlobalContext)

    return (
        <div className="container py-4 vh-100">
            <h1 className="mb-4">Pagina dei preferiti</h1>

            {favList.length === 0 ? (
                <div className="text-center mt-5">
                    <h3>Lista dei preferiti vuota</h3>
                    <Link to="/" className="btn btn-primary mt-3">
                        Torna alla lista giochi
                    </Link>
                </div>
            ) : (
                <section>
                    {favList.map(game => (
                        <div className="card p-3 my-2" key={game.id}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">{game.title}</h5>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => removeFromFav(game.id)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="text-end">
                        <button
                            className="btn btn-outline-danger"
                            onClick={clearFav}>
                            Elimina tutti
                        </button>
                    </div>
                </section>
            )}
        </div>
    )
}