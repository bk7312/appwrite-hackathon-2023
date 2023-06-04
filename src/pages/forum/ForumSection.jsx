// import React from "react"
import { Link, useLoaderData } from 'react-router-dom'
// import ForumThread from "./ForumThread"
import { 
    getDocList,
    createDoc,
    getDoc,
    updateDoc, 
} from "../../api"

export async function loader({params}) {
    console.log(params)
    try {
        const data = await getDocList(params.section)
        console.log("forumSectionLoader", data)
        return data
    } catch(e) {
        console.log("forumSectionLoader error", e)
    }
}

export default function ForumSection() {
    // const [page, setPage] = React.useState("announcement")
    const loaderData = useLoaderData()
    const posts = loaderData.documents.map( doc => {
        console.log(doc)
        return (
            <div key={doc.$id}>
                <p>{doc.title}</p>
                <Link to={doc.$id}>Link</Link>
            </div>
        )
    })
    console.log(loaderData)
    return (
        <div className="h-full">
            <h1 className='text-xl font-bold mt-12 py-2 text-center'>
                Forum Section
            </h1>
            <div className="flex justify-evenly">
                {posts}
            </div>
                
        </div>
    )
}