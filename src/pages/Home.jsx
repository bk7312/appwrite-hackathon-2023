// import React from "react"
import { Link } from 'react-router-dom'


export default function Home() {
    const textShadow = {
        textShadow: '0px 0px 1px black, 0 0 4px black, 0 0 6px black'
    }
    return (
        <div
            className='text-center text-gray-50 flex flex-col justify-center h-full bg-home-hero bg-cover bg-no-repeat'
        >
            <h1 className='text-4xl font-bold' style={textShadow}>
                Welcome to the Town Square!
            </h1>
            <p className='text-xl pt-4 pb-20' style={textShadow}>
                The best place to find out the latest happenings in town.
            </p>
            <Link to="login" className='border w-60 py-2 my-2 rounded-full bg-sky-600 mx-auto font-bold border-neutral-600'>
                Enter
            </Link>
            <Link to="about" style={textShadow} className='underline decoration-2'>
                Learn more
            </Link>
        </div>
    )
}