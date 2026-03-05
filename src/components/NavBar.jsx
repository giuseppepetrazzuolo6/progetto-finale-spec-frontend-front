import { NavLink } from "react-router-dom"

export default function NavBar() {

    return (
        <nav
            className="navbar navbar-expand-sm navbar-light">
            <div className="container">
                <div className="navbar-nav me-auto mt-2 mt-lg-0">
                    <div className="nav-item">
                        <NavLink to='/' className="navbar nav-link mx-2">
                            Lista Giochi
                        </NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink to='/favourite' className="navbar nav-link mx-2">
                            Preferiti
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}