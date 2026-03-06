import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

import Card from "../components/Card"

export default function GamesList() {
    const {
        filteredGames,
        search,
        setSearch,
        category,
        setCategory,
        categoriesOptions,
        sortOrder,
        setSortOrder,
        compareList } = useContext(GlobalContext)

    return (
        <section className="py-4">
            <div className="container">
                <div className="filters">
                    <input className="searchbar"
                        type="text"
                        placeholder="Cerca..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <select className="form-select w-auto"
                        value={category}
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
                <div className="row">
                    {filteredGames?.map(game => (
                        <div key={game.id} className="col-12 col-md-6 col-lg-4">
                            <Card game={game} />
                        </div>
                    ))}
                </div>
            </div>

            {compareList.length > 0 && (
                <div className="compare-section">
                    <h2>Confronto</h2>
                    <div style={{ display: "flex", gap: "20px" }}>
                        {compareList.map(g => (
                            <div key={g.id}>
                                <h3>{g.title}</h3>
                                <p>Categoria: {g.category}</p>
                                <p>Prezzo: {g.price}</p>
                                <p>Valutazione: {g.rating}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </section>
    )
}