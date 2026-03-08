import { useCallback, useContext, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { Link } from "react-router-dom";

import Card from "../components/Card"

//funzione di debouce
function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
}

export default function GamesList() {
    const {
        filteredGames,
        setSearch,
        category,
        setCategory,
        categoriesOptions,
        sortOrder,
        setSortOrder,
        compareList } = useContext(GlobalContext)

    const [inputValue, setInputValue] = useState("") //variabile di stato per controllare l'input

    const debouncedSearch = useCallback(
        debounce(setSearch, 500),
        [setSearch]
    );

    const handleSearch = (e) => {
        const value = e.target.value
        setInputValue(value)
        debouncedSearch(value)
    }

    return (
        <section className="py-4">
            <div className="container">
                <div className="filters">
                    <input className="searchbar"
                        type="text"
                        placeholder="Cerca..."
                        value={inputValue}
                        onChange={handleSearch} />
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
                        aria-label="Ordina giochi"
                        onClick={() =>
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                        {sortOrder === "asc" ? <i className="bi bi-sort-alpha-up"></i> : <i className="bi bi-sort-alpha-up-alt"></i>}
                    </button>
                </div>
                {compareList.length > 0 && (
                    <div className="mb-3">
                        <Link to="/compare" className="btn btn-primary">
                            Vai al confronto ({compareList.length})
                        </Link>
                    </div>
                )}
                <div className="row">
                    {filteredGames.length === 0 && (
                        <p className="text-center w-100">
                            Nessun gioco trovato...
                        </p>
                    )}
                    {filteredGames?.map(game => (
                        <div key={game.id} className="col-12 col-md-6 col-lg-4">
                            <Card game={game} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}