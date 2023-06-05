import { redirect } from "react-router-dom"
import { checkUser } from "./appwrite"

export async function checkAuth(request) {
    const pathname = new URL(request.url).pathname
    
    try {
        const user = await checkUser()
        console.log(user)
    } catch(e) {
        console.log(e)
        throw redirect(
            `/login?redirectTo=${pathname}`
        )
    }

}
