// import React from "react"
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <h2>Home Component</h2>
            <Link to="login">Login</Link>
        </div>
    )
}