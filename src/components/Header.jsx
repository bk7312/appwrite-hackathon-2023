import { Link, NavLink } from "react-router-dom"

export default function Header() {
    
    return (
        <header className="flex place-content-between text-2xl p-4">
            <Link to="/">TownSquare</Link>
            <nav className="flex gap-4 text-lg items-center">
                <NavLink 
                    to="login" 
                    className={({ isActive }) => isActive ? 'bg-blue-50 px-2 rounded shadow dark:bg-blue-600' : 'px-2'}
                >
                    Log in
                </NavLink>
                <NavLink 
                    to="signup" 
                    className={({ isActive }) => isActive ? 'bg-blue-50 px-2 rounded shadow dark:bg-blue-600' : 'px-2'}
                >
                    Sign up
                </NavLink>
            </nav>
        </header>
    )
}