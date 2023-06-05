import { useRef } from "react"
import { Form, useNavigation, useActionData } from 'react-router-dom'
import { updateEmail, updatePassword } from '../../appwrite'

export async function action({ request }) {
    const formData = await request.formData()
    console.log('profile action', formData)
    try {
        const intent = formData.get("intent")
        console.log(intent)
        if (intent === "updateEmail") {
            const email = formData.get("email")
            const password = formData.get("password")
            const data = await updateEmail(email, password)
            console.log(data)
            return { success: "Email successfully updated!" }
        }
        if (intent === "updatePassword") {
            const newPassword = formData.get("new-password")
            const oldPassword = formData.get("old-password")
            console.log(newPassword, oldPassword)
            const data = await updatePassword(newPassword, oldPassword)
            console.log(data)
            return { success: "Password successfully updated!" }
        }
        throw { message:"Invalid action" }
    } catch(error) {
        console.log(error)
        return error
    }
}

export default function Profile() {
    const navigation = useNavigation()
    const actionData = useActionData()
    const emailFormRef = useRef(null)
    const passwordFormRef = useRef(null)
    function resetForms() {
        emailFormRef.current.reset()
        passwordFormRef.current.reset()
    }
    return (
        <div className="flex flex-col h-full">
            <h1 className='text-4xl font-bold mt-12 py-2 text-center'>
                Profile page
            </h1>
            {actionData?.success && <h3 className="text-green-600 text-xl py-2 text-center">{actionData?.success}</h3>}
            {actionData?.success && resetForms()}
            {actionData?.message && <h3 className="text-red-600 text-xl py-2 text-center">{actionData?.message}</h3>}
            <Form
                method="post"
                className="flex flex-col mx-auto "
                ref={emailFormRef}
            >
                <h3 className='text-xl font-bold mt-4 py-2 text-center'>
                    Update Email
                </h3>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="border rounded px-8 py-2 my-2 dark:bg-gray-900"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="border rounded px-8 py-2 my-2 dark:bg-gray-900"
                />
                <button
                    disabled={navigation.state === "submitting"}
                    className='border w-80 py-2 my-2 rounded bg-sky-600 mx-auto font-bold border-neutral-600  text-gray-50'
                    name="intent"
                    value="updateEmail"
                >
                    Update Email
                </button>
            </Form>
            <Form
                method="post"
                className="flex flex-col mx-auto "
                ref={passwordFormRef}
            > 
                <h3 className='text-xl font-bold mt-4 py-2 text-center'>
                    Update Password
                </h3>
                <input
                    name="new-password"
                    type="password"
                    placeholder="New Password"
                    className="border rounded px-8 py-2 my-2 dark:bg-gray-900"
                />
                <input
                    name="old-password"
                    type="password"
                    placeholder="Old Password"
                    className="border rounded px-8 py-2 my-2 dark:bg-gray-900"
                />
                <button
                    disabled={navigation.state === "submitting"}
                    className='border w-80 py-2 my-2 rounded bg-sky-600 mx-auto font-bold border-neutral-600  text-gray-50'
                    name="intent"
                    value="updatePassword"
                    
                >
                    Update Password
                </button>
            </Form>
            
        </div>
    )
}