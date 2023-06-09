import { Link, NavLink } from "react-router-dom"

export default function Header() {
    
    return (
        <header className="flex place-content-between text-2xl p-4">
            <Link to=".">Town Square</Link>
            <nav className="flex gap-4 text-lg items-center">
                <NavLink 
                    to="." 
                    end
                    className={({ isActive }) => isActive ? 'bg-blue-50 px-2 rounded shadow dark:bg-blue-600' : null}
                >
                    Town²
                </NavLink>
                <NavLink 
                    to="profile" 
                    className={({ isActive }) => isActive ? 'bg-blue-50 px-2 rounded shado  dark:bg-blue-600' : null}
                >
                    Profile
                </NavLink>
                <Link 
                    to="/logout"
                >
                    Logout
                </Link>
            </nav>
        </header>
    )
}