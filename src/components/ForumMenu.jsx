// import React from "react"
import { Link } from "react-router-dom"

export default function ForumMenu() {
    return (
        <>
            <h1 className='text-xl font-bold mt-12 py-2 text-center'>
                Forum Menu
            </h1>
            <nav>
                <Link to="announcement" >Announcements</Link>
                <Link to="event" >Events</Link>
                <Link to="help" >Help needed</Link>
                <Link to="advertise" >Advertise your products or services</Link>
                <Link to="conversation" >Town Square Talks</Link>
            </nav>
        </>
    )
}