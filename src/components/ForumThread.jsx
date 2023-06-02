// import React from "react"
import ForumPost from "./ForumPost"

export default function ForumThread() {
    return (
        <div className="flex flex-col">
            <h1 className='text-4xl font-bold mt-12 py-2 text-center'>
                Forum Thread
            </h1>
            <ForumPost/>
            <ForumPost/>
        </div>
    )
}