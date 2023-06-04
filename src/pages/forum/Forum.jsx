// import React from "react"
// import { Link } from 'react-router-dom'
import ForumMenu from "../../components/ForumMenu"
import { 
    getDocList,
    createDoc,
    getDoc,
    updateDoc, 
} from "../../api"

export default function Forum() {
    return (
        <div className="h-full">
            <h1 className='text-4xl font-bold mt-12 py-2 text-center'>
                Forum page
            </h1>
            <div className="flex flex-col">
                <ForumMenu/>
            </div>
        </div>
    )
}