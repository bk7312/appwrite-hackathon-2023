// import React from "react"
import { Link } from 'react-router-dom'
// import { logoutUser } from "../api"


export default function Town2() {
    return (
        <div className="flex flex-col h-full">
            <h1 className='text-4xl font-bold mt-12 py-2 text-center'>
                To be developed
            </h1>
            <div className='container mx-auto p-2'>
                <p className='p-2'>To create a town square forum.</p>
                <p className='p-2'>Create nested layout with sidebar and main content.</p>
                <p className='p-2'>Able to view/reply posts and create new threads.</p>
                <p className='p-2'>Mobile vs desktop layout?</p>
            </div>
            <Link 
                // onClick={logoutUser}
                to="../logout"
                relative='path'
                className='text-center border w-80 py-2 my-2 rounded-full bg-sky-600 mx-auto font-bold border-neutral-600  text-gray-50'
            >
                Logout
            </Link>
        </div>
    )
}