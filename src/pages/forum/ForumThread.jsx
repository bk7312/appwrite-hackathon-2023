import { useRef } from "react"
import ForumPost from "../../components/ForumPost"
import { Form, useLoaderData, useActionData, useNavigation, useLocation } from 'react-router-dom'


import { 
    getPosts,
    replyPost, 
} from "../../appwrite"

export async function loader({params}) {
    console.log("loaderFn", params)
    // try {
    //     const data = await getPosts(params.section, params.post)
    //     console.log("forumThreadLoader", data)
    //     return data
    // } catch(e) {
    //     console.log("forumThreadLoader error", e)
    // }
    return null
}

export async function action({ params, request }) {
    // const formData = await request.formData()
    // const reply = formData.get("reply")
    // const postData = JSON.parse(formData.get("prevData"))
    // postData.push(reply)
    // try {
    //     const data = await replyPost(params.section, params.post, {postData})
    //     console.log(data)
    //     return { success: "Reply posted!" }
    // } catch(error) {
    //     console.log(error)
    //     return error.message
    // }
}

export default function ForumThread() {
    const loaderData = useLoaderData()
    const actionData = useActionData()
    const navigation = useNavigation()
    const { state } = useLocation()
    console.log('uselocation', state)
    const formRef = useRef(null)
    function resetForms() {
        formRef.current.reset()
    }
    console.log("loader data", loaderData)
    // const posts = loaderData.postData.map((post, i) => <ForumPost key={i} text={post}/>)
    return (
        <div className="flex flex-col">
            <h1 className='text-xl font-bold mt-12 py-2 text-center'>
                Forum Thread
            </h1>
            <ForumPost data={state.doc}/>
            {/* <h1>{loaderData.title}</h1> */}
            {/* {posts} */}

            {actionData?.success && resetForms()}
            <Form
                method="post"
                className="flex flex-col mx-auto"
                ref={formRef}
            >
                <textarea
                    name="reply"
                    placeholder="Reply"
                    className="border rounded px-8 py-2 my-2 dark:bg-gray-900"
                />
                <button
                    disabled={navigation.state === "submitting"}
                    className='border w-80 py-2 my-2 rounded bg-sky-600 mx-auto font-bold border-neutral-600  text-gray-50'
                    name="prevData"
                    // value={JSON.stringify(loaderData.postData)}
                >
                    {navigation.state === "submitting"
                        ? "Posting..."
                        : "Post"
                    }
                </button>
            </Form>
        </div>
    )
}