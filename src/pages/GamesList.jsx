import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

import Card from "../components/Card"

export default function GamesList() {
    const { filteredGames, search, setSearch, category, setCategory, categoriesOptions, sortOrder, setSortOrder } = useContext(GlobalContext)




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
                    <button
                        onClick={() =>
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                        {sortOrder === "asc" ? <i className="bi bi-sort-alpha-up"></i> : <i className="bi bi-sort-alpha-up-alt"></i>}
                    </button>
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