import { useRef } from "react"
import { Link, Form, useNavigation, useLoaderData, useActionData } from 'react-router-dom'
import { getUserData, updateEmail, updatePassword, updateBio, uploadPic, checkUser } from '../../appwrite'

export async function loader() {
    try {
        const user = await checkUser()
        const data = await getUserData(user.name)
        return data
    } catch(error) {
        return error
    }
}

export async function action({ request }) {
    const formData = await request.formData()
    try {
        const intent = formData.get("intent")
        if (intent === "uploadPic") {
            const pic = document.getElementById('pic').files[0]
            await uploadPic(pic)
            return { success: "Profile picture successfully updated!" }
        }
        if (intent === "updateBio") {
            const bio = JSON.stringify(formData.get("bio"))
            await updateBio(bio)
            return { success: "Bio successfully updated!" }
        }
        if (intent === "updateEmail") {
            const email = formData.get("email")
            const password = formData.get("password")
            await updateEmail(email, password)
            return { success: "Email successfully updated!" }
        }
        if (intent === "updatePassword") {
            const newPassword = formData.get("new-password")
            const oldPassword = formData.get("old-password")
            await updatePassword(newPassword, oldPassword)
            return { success: "Password successfully updated!" }
        }
        throw { message:"Invalid action" }
    } catch(error) {
        return error
    }
}

export default function Profile() {
    const navigation = useNavigation()
    const loaderData = useLoaderData()
    const actionData = useActionData()
    const emailFormRef = useRef(null)
    const passwordFormRef = useRef(null)
    const bioFormRef = useRef(null)
    function resetForms() {
        emailFormRef.current.reset()
        passwordFormRef.current.reset()
        bioFormRef.current.reset()
    }
    return (
        <div className="container mx-auto flex flex-col h-full">
            <Link to="../" relative="path" className="container mx-auto p-2 m-2">⬅ Back to forum menu</Link>
            <h1 className='text-4xl font-bold mt-12 py-2 text-center'>
                Profile settings
            </h1>
            <Link to={`${loaderData.user.name}`} className='text-lg underline text-center self-center py-2'>View my profile</Link>
            {actionData?.success && <h3 className="text-green-600 text-xl py-2 text-center">{actionData?.success}</h3>}
            {actionData?.success && resetForms()}
            {actionData?.message && <h3 className="text-red-600 text-xl py-2 text-center">{actionData?.message}</h3>}
            <Form
                method="post"
                className="flex flex-col mx-auto "
                ref={bioFormRef}
            >
                <h3 className='text-xl font-bold mt-4 py-2 text-center'>
                    Update Profile Picture
                </h3>
                <input
                    name="pic"
                    type="file"
                    id="pic"
                    accept="image/png, image/jpeg"
                    className="border rounded px-8 py-2 my-2 dark:bg-gray-900 w-80"
                    required
                />
                <button
                    disabled={navigation.state === "submitting"}
                    className='border w-80 py-2 my-2 rounded bg-blue-600 mx-auto font-bold border-neutral-600  text-gray-50'
                    name="intent"
                    value="uploadPic"
                >
                    Update Profile Picture
                </button>
            </Form>
            <Form
                method="post"
                className="flex flex-col mx-auto "
                ref={bioFormRef}
            >
                <h3 className='text-xl font-bold mt-4 py-2 text-center'>
                    Update Bio
                </h3>
                <textarea
                    name="bio"
                    placeholder={JSON.parse(loaderData.user.bio) || "Bio"}
                    rows="4"
                    className="border rounded px-8 py-4 my-2 dark:bg-gray-900"
                />
                <button
                    disabled={navigation.state === "submitting"}
                    className='border w-80 py-2 my-2 rounded bg-blue-600 mx-auto font-bold border-neutral-600  text-gray-50'
                    name="intent"
                    value="updateBio"
                >
                    Update Bio
                </button>
            </Form>
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
                    placeholder="New email address"
                    className="border rounded px-8 py-2 my-2 dark:bg-gray-900"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="border rounded px-8 py-2 my-2 dark:bg-gray-900"
                    required
                />
                <button
                    disabled={navigation.state === "submitting"}
                    className='border w-80 py-2 my-2 rounded bg-blue-600 mx-auto font-bold border-neutral-600  text-gray-50'
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
                    placeholder="New password"
                    className="border rounded px-8 py-2 my-2 dark:bg-gray-900"
                    required
                />
                <input
                    name="old-password"
                    type="password"
                    placeholder="Current password"
                    className="border rounded px-8 py-2 my-2 dark:bg-gray-900"
                    required
                />
                <button
                    disabled={navigation.state === "submitting"}
                    className='border w-80 py-2 my-2 rounded bg-blue-600 mx-auto font-bold border-neutral-600  text-gray-50'
                    name="intent"
                    value="updatePassword"
                >
                    Update Password
                </button>
            </Form>
            
        </div>
    )
}