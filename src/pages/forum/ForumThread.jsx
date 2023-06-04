// import React from "react"
import ForumPost from "../../components/ForumPost"
import { useLoaderData } from 'react-router-dom'

import { 
    getDocList,
    createDoc,
    getDoc,
    updateDoc, 
} from "../../api"

export async function loader({params}) {
    console.log("loaderFn", params)
    try {
        const data = await getDoc(params.section, params.post)
        console.log("forumThreadLoader", data)
        return data
    } catch(e) {
        console.log("forumThreadLoader error", e)
    }
    return null
}

export default function ForumThread() {
    const loaderData = useLoaderData()
    console.log("loader data", loaderData)
    const posts = loaderData.postData.map((post, i) => {
        return (
            <div key={i}>
                <p>{post}</p>
            </div>
        )
    })
    return (
        <div className="flex flex-col">
            <h1 className='text-xl font-bold mt-12 py-2 text-center'>
                Forum Thread
            </h1>
            <ForumPost/>
            <ForumPost/>
            <h1>{loaderData.title}</h1>
            {posts}
        </div>
    )
}