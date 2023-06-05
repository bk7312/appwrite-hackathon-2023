import { useRef } from "react"
import { Form, Link, useLoaderData, useActionData, useNavigation } from 'react-router-dom'
import ForumPost from "../../components/ForumPost"
import { createThread, getThreads } from "../../appwrite"

export async function loader({params}) {
    console.log(params)
    try {
        const data = await getThreads(params.section)
        console.log("forumSectionLoader", data)
        return data
    } catch(e) {
        console.log("forumSectionLoader error", e)
    }
}

export async function action({ params, request }) {
    const formData = await request.formData()
    const title = formData.get("title")
    const post = formData.get("post")
    const postData = [post]
    try {
        const data = await createThread(params.section, {title, postData})
        console.log(data)
        return { success: "New post submitted!" }
    } catch(error) {
        console.log(error)
        return error
    }
}

export default function ForumSection() {
    const loaderData = useLoaderData()
    const actionData = useActionData()
    const navigation = useNavigation()
    const formRef = useRef(null)
    function resetForms() {
        formRef.current.reset()
    }
    const posts = loaderData.documents.map(doc => (
        <Link to={doc.$id} key={doc.$id} state={{doc}}>
            <ForumPost data={doc}/>
        </Link>
    ))
    return (
        <div className="h-full">
            <h1 className='text-xl font-bold mt-12 py-2 text-center'>
                Forum Section
            </h1>
            {actionData?.success && resetForms()}
            {actionData?.message && <h3 className="text-red-600 text-xl py-2 text-center">{actionData?.message}</h3>}

            <Form
                method="post"
                className="flex flex-col mx-auto"
                ref={formRef}
            >
                <input
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="border rounded px-8 py-2 my-2 mt-8 dark:bg-gray-900"
                />
                <textarea
                    name="post"
                    placeholder="Message"
                    className="border rounded px-8 py-2 my-2 dark:bg-gray-900"
                />
                <button
                    disabled={navigation.state === "submitting"}
                    className='border w-80 py-2 my-2 rounded bg-sky-600 mx-auto font-bold border-neutral-600  text-gray-50'
                >
                    {navigation.state === "submitting"
                        ? "Posting..."
                        : "Post"
                    }
                </button>
            </Form>
            <div className="flex flex-col justify-evenly">
                {posts}
            </div>
                
        </div>
    )
}