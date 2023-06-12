import { redirect } from "react-router-dom"
import { checkUser } from "./appwrite"

export async function checkAuth(request) {
    const pathname = new URL(request.url).pathname
    
    try {
        await checkUser()
    } catch(error) {
        throw redirect(
            `/login?redirectTo=${pathname}`
        )
    }

}
