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
    const post = JSON.stringify(formData.get("post"))
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
    const buttonRef = useRef(null)
    function resetForms() {
        formRef.current.reset()
    }
    const posts = loaderData.threads.documents.map(doc => (
        <Link to={doc.$id} key={doc.$id} >
            <ForumPost data={doc} excerpt={true} className="hover:shadow-xl hover:bg-blue-50  hover:dark:bg-blue-950"/>
        </Link>
    ))
    function toggleForm() {
        formRef.current.classList.toggle("hidden")
        buttonRef.current.classList.toggle("hidden")
    }
    return (
        <div className="grid">
            <Link to="../" relative="path" className="container mx-auto p-2 m-2">⬅ Back to forum menu</Link>
            <div className="container p-4 my-2 border rounded mx-auto">
                <h4 className="text-2xl font-bold text-center">{loaderData.menu.documents[0].title}</h4>
                <p className="italic p-2 text-lg">{loaderData.menu.documents[0].description}</p>
            </div>
            {actionData?.success && resetForms()}
            {actionData?.message && <h3 className="text-red-600 text-xl py-2 text-center">{actionData?.message}</h3>}
            <div className="container mx-auto my-2">
                <h4 
                    className="bg-blue-600 rounded text-gray-50 text-center font-bold p-4 cursor-pointer"
                    onClick={toggleForm}
                    ref={buttonRef}
                >
                    Create new thread
                </h4>
                <Form
                    method="post"
                    className="container flex flex-col border rounded mx-auto p-4 hidden"
                    ref={formRef}
                >
                    <input
                        name="title"
                        type="text"
                        placeholder="Title"
                        required
                        className="border rounded px-8 py-4 my-2 dark:bg-gray-900"
                    />
                    <textarea
                        name="post"
                        placeholder="Message"
                        rows="4"
                        required
                        className="border rounded px-8 py-4 my-2 dark:bg-gray-900"
                    />
                    <button
                        disabled={navigation.state === "submitting"}
                        className='border w-full py-2 my-2 rounded bg-blue-600 mx-auto font-bold border-neutral-600  text-gray-50'
                    >
                        {navigation.state === "submitting"
                            ? "Creating new thread..."
                            : "Create new thread"
                        }
                    </button>
                </Form>
            </div>
            
            <div className="flex flex-col justify-evenly">
                {posts}
            </div>
                
        </div>
    )
}