
import { logoutUser } from "../appwrite"
import { Link, useLoaderData } from 'react-router-dom'

export async function loader() {
    try {
        const data = await logoutUser()
        localStorage.removeItem("user")
        console.log("logout", data)
    } catch(error) {
        console.log(error)
        return error.message
    }
    return null
}

export default function Logout() {
    const message = useLoaderData()
    console.log(message)
    return (
        <div className="flex flex-col justify-center h-full text-center">
            <h2 className='text-2xl font-bold py-2 pb-8'>You have logged out</h2>
            <Link
                to="/"
                className='border w-80 py-2 my-2 rounded bg-sky-600 mx-auto font-bold border-neutral-600  text-gray-50'
            >
                Return to home
            </Link>
        </div>

    )
}