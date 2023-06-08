import { redirect } from "react-router-dom"
import { checkUser } from "./appwrite"

export async function checkAuth(request) {
    const pathname = new URL(request.url).pathname
    
    try {
        const user = await checkUser()
        const { name, $id } = user
        localStorage.setItem("user", JSON.stringify({name, $id}))
        console.log(user, name, $id)
    } catch(e) {
        console.log(e)
        throw redirect(
            `/login?redirectTo=${pathname}`
        )
    }

}
