import { Link } from "react-router-dom"

export default function Card(game) {


    return (

        <div className="card p-2 my-2" key={game.id}>
            <h4>Titolo del gioco: {game.title}</h4>
            <p>categoria: {game.category}</p>
            <Link to={`/games/${game.id}`}>Dettagli</Link>
        </div>
    )

}