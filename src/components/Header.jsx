import { Link, NavLink } from "react-router-dom"
// import { useContext } from "react"
// import { UserContext } from "../context/UserContext"


export default function Header() {
    
    return (
        <header className="flex place-content-between text-2xl p-4">
            <Link to="/">Town Square</Link>
            <nav className="flex gap-4 text-lg items-center">
                <NavLink 
                    to="." 
                    end
                    className={({ isActive }) => isActive ? 'underline' : null}
                >
                    Home
                </NavLink>
                <NavLink 
                    to="forum" 
                    className={({ isActive }) => isActive ? 'underline' : null}
                >
                    Town²
                </NavLink>
                <NavLink 
                    to="about" 
                    className={({ isActive }) => isActive ? 'underline' : null}
                >
                    About
                </NavLink>
            </nav>
        </header>
    )
}