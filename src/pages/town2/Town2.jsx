// import React from "react"
// import { Link } from 'react-router-dom'
import ForumMenu from "../../components/ForumMenu"
import ForumThread from "../../components/ForumThread"

export default function Town2() {
    return (
        <div className="h-full">
            <h1 className='text-4xl font-bold mt-12 py-2 text-center'>
                Main Page
            </h1>
            <div className="flex justify-evenly">
                <ForumMenu/>
                <ForumThread/>
            </div>
                
        </div>
    )
}