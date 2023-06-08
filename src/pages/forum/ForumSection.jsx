import { useRef } from "react"
import { Form, Link, useLoaderData, useActionData, useNavigation } from 'react-router-dom'
import ForumPost from "../../components/ForumPost"
import { createThread, getThreads, getMenu } from "../../appwrite"

export async function loader({params}) {
    console.log(params)
    try {
        const menu = await getMenu(params.section)
        const threads = await getThreads(params.section)
        console.log("forumSectionLoader", menu, threads)
        return { menu, threads}
    } catch(e) {
        console.log("forumSectionLoader error", e)
    }
}

export async function action({ params, request }) {
    const formData = await request.formData()
    const title = formData.get("title")
    const post = formData.get("post")
    try {
        const data = await createThread(params.section, {title, post})
        console.log(data)
        return { success: "New thread posted!" }
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
    const posts = loaderData.threads.documents.map(doc => (
        <Link to={doc.$id} key={doc.$id}>
            <ForumPost data={doc} excerpt={true}/>
        </Link>
    ))
    return (
        <div className="grid">
            <Link to="../" relative="path" className="container mx-auto p-2 m-2">⬅ Back to forum menu</Link>
            <div className="container p-4 my-2 border rounded mx-auto">
                <h4 className="text-2xl font-bold text-center">{loaderData.menu.documents[0].title}</h4>
                <p className="italic p-2 text-lg">{loaderData.menu.documents[0].description}</p>
            </div>
            {actionData?.success && resetForms()}
            {actionData?.message && <h3 className="text-red-600 text-xl py-2 text-center">{actionData?.message}</h3>}

            <Form
                method="post"
                className="container flex flex-col border rounded mx-auto p-4 my-2"
                ref={formRef}
            >
                <input
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="border rounded px-8 py-4 my-2 dark:bg-gray-900"
                />
                <textarea
                    name="post"
                    placeholder="Message"
                    className="border rounded px-8 py-4 my-2 dark:bg-gray-900"
                />
                <button
                    disabled={navigation.state === "submitting"}
                    className='border w-full py-2 my-2 rounded bg-sky-600 mx-auto font-bold border-neutral-600  text-gray-50'
                >
                    {navigation.state === "submitting"
                        ? "Creating new thread..."
                        : "Create new thread"
                    }
                </button>
            </Form>
            <div className="flex flex-col justify-evenly">
                {posts}
            </div>
                
        </div>
    )
}