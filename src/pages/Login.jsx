
// import { useContext } from "react"
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData
} from "react-router-dom"
import { loginUser, checkUser } from "../api"

export async function loader({ request }) {
    try {
        const isLoggedIn = await checkUser()
        console.log(isLoggedIn)
        redirect('/town2')
    } catch(e) {
        console.log(`login`, e)
        return new URL(request.url).searchParams.get("message")
    }
}

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/town2"
    
    try {
        const data = await loginUser({ email, password })
        console.log(data)
        return redirect(pathname)
    } catch(error) {
        console.log(error)
        return error.message
    }
}

export default function Login() {
    const errorMessage = useActionData()
    const message = useLoaderData()
    const navigation = useNavigation()

    return (
        <div className="login-container">
            <h2>Sign in to your account</h2>
            {message && <h3 className="red">{message}</h3>}
            {errorMessage && <h3 className="red">{errorMessage}</h3>}

            <Form
                method="post"
                className="login-form"
                replace
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting"
                        ? "Logging in..."
                        : "Log in"
                    }
                </button>
            </Form>
        </div>
    )
}