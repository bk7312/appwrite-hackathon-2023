import { redirect } from "react-router-dom"
import { checkUser } from "./api"

export async function checkAuth(request) {
    const pathname = new URL(request.url).pathname
    
    try {
        const user = await checkUser()
        console.log(user)
    } catch(e) {
        console.log(e)
        throw redirect(
            `/login?message=You must log in first.&redirectTo=${pathname}`
        )
    }

}
