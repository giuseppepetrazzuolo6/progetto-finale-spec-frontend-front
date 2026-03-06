import { NavLink, Link } from "react-router-dom"


import logo from '../img/PowerPLay_shop.png'

export default function NavBar() {

    return (
        <nav className="navbar navbar-expand-sm navbar-light">
            <div className="container">
                <div className="img-box">
                    <Link to='/'>
                        <img src={logo} alt="logo_ecommerce" />
                    </Link>
                </div>
                <div className="text-center">
                    <h3>POWERPLAY</h3>
                    <p>GAMESHOP</p>
                </div>
                <div className="navbar-nav">
                    <NavLink
                        to='/'
                        className="nav-link mx-2">
                        Lista Giochi
                    </NavLink>
                    <NavLink
                        to='/favourite'
                        className="nav-link mx-2">
                        Preferiti
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}