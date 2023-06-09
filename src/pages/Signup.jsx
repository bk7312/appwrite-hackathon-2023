
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData
} from "react-router-dom"
import { createUser, checkUser } from "../appwrite"

export async function loader({ request }) {
    try {
        const isLoggedIn = await checkUser()
        console.log("signupLoader", isLoggedIn)
        return redirect('/forum')
    } catch(e) {
        console.log(`signupLoader`, e)
        const message = new URL(request.url).searchParams.get("redirectTo")
        return message ? "You must signup first." : ""
    }
}

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const name = formData.get("name")
    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/login"
    
    try {
        const data = await createUser({ email, password, name })
        console.log(data)
        return redirect(pathname)
    } catch(error) {
        console.log(error)
        return error.message
    }
}

export default function Signup() {
    const errorMessage = useActionData()
    const message = useLoaderData()
    const navigation = useNavigation()

    return (
        <div className="text-center container mx-auto flex flex-col justify-center h-full">
            <h2 className="text-4xl py-2">Create an account</h2>
            {message && <h3 className="text-red-600 text-xl py-2">{message}</h3>}
            {errorMessage && <h3 className="text-red-600 text-xl py-2">{errorMessage}</h3>}

            <Form
                method="post"
                className="flex flex-col mx-auto"
                replace
            >
                <input
                    name="name"
                    type="text"
                    placeholder="User name"
                    className="border rounded px-8 py-2 my-2 mt-8"
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="border rounded px-8 py-2 my-2"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="border rounded px-8 py-2 my-2"
                    required
                />
                <button
                    disabled={navigation.state === "submitting"}
                    className='border w-80 py-2 my-2 rounded bg-blue-600 mx-auto font-bold border-neutral-600  text-gray-50'
                >
                    {navigation.state === "submitting"
                        ? "Creating account..."
                        : "Sign up"
                    }
                </button>
            </Form>
        </div>
    )
}