
import { logoutUser } from "../appwrite"
import { Link } from 'react-router-dom'

export async function loader() {
    try {
        await logoutUser()
    } catch(error) {
        return error.message
    }
    return null
}

export default function Logout() {
    return (
        <div className="flex flex-col justify-center h-full text-center">
            <h2 className='text-3xl font-bold py-2 mb-8'>You have logged out</h2>
            <Link
                to="/"
                className='border w-80 py-2 my-2 rounded bg-blue-600 mx-auto font-bold border-neutral-600  text-gray-50'
            >
                Return to home
            </Link>
            <Link
                to="../login"
                className='py-2'
            >
                Log in again?
            </Link>
        </div>

    )
}