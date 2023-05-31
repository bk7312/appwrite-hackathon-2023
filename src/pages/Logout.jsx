
import { logoutUser } from "../api"


export async function loader() {
    try {
        const data = await logoutUser()
        console.log("logout", data)
    } catch(error) {
        console.log(error)
        return error.message
    }
    return null
}

export default function Logout() {

    return (
        <h2>Logged out</h2>
    )
}