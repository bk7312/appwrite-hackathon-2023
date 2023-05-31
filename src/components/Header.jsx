import { Link, NavLink } from "react-router-dom"
// import { useContext } from "react"
// import { UserContext } from "../context/UserContext"


export default function Header() {
    
    return (
        <header className="flex place-content-between text-2xl bg-gray-50 p-4">
            <Link to="/">Town Square</Link>
            <nav className="flex gap-4 text-lg items-center">
                <NavLink to=".">Home</NavLink>
                <NavLink to="town2">Town²</NavLink>
                <NavLink to="about">About</NavLink>
            </nav>
        </header>
    )
}