import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function Favourites() {
    const { favList, removeFromFav } = useContext(GlobalContext)


    return (
        <div className="container">
            <h1>Pagina dei preferiti</h1>

            {favList?.map(game => (
                <div key={game.id}>
                    <h3>{game.title}</h3>
                    <button
                        className="btn"
                        onClick={() => removeFromFav(game.id)}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            ))}

        </div>
    )
}
