
import { Link, useLoaderData } from "react-router-dom"
import { getMenu } from "../../appwrite"

export async function loader() {
    try {
        const data = await getMenu()
        return data
    } catch(error) {
        return error
    }
}

export default function Forum() {
    const loaderData = useLoaderData()
    const menus = loaderData.documents.map((menu, i) => (
        <Link to={menu.link} key={i}>
            <div className="container p-6 my-2 border rounded hover:shadow-xl hover:bg-blue-50  hover:dark:bg-blue-950">
                <h4 className="text-xl font-bold">{menu.title}</h4>
                <p className="italic pt-2">{menu.description}</p>
            </div>
        </Link>
    ))
    return (
        <div className="h-full">
            <h1 className='text-2xl font-bold mt-2 py-2 text-center'>
                Welcome to the Town Square!
            </h1>
            <p className="text-center text-lg">The online place to engage with your town community.</p>
            <nav className="container flex flex-col mx-auto p-4">
                {menus}
            </nav>
        </div>
    )
}
