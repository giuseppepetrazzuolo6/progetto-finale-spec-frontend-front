import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

import Card from "../components/Card"

export default function GamesList() {
    const { filteredGames, search, setSearch, category, setCategory, categoriesOptions } = useContext(GlobalContext)




    return (
        <section>
            <div className="container">
                <div>
                    <input className="searchbar" type="text"
                        placeholder="Cerca..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <select value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Tutte le categorie</option>
                        {categoriesOptions.map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                </div>
                {
                    filteredGames && filteredGames.map(game => (
                        <Card key={game.id} game={game} />
                    ))
                }
            </div>
        </section>
    )
}