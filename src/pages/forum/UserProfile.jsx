import { Link, useLoaderData } from 'react-router-dom'
import { getUserData } from '../../appwrite'

export async function loader({ params }) {
    console.log('user profile loader')
    try {
        const data = await getUserData(params.user)
        console.log(data)
        return data
        
    } catch(error) {
        console.log(error)
        return error
    }
}

export default function UserProfile() {
    const loaderData = useLoaderData()


    return (
        <div className="flex flex-col h-full">
            <Link to="../" relative="path" className="container mx-auto p-2 my-2 ">⬅ Back to profile settings</Link>
            <img src={loaderData.pic} className='border rounded-full mx-auto w-32 h-32 mt-10'/>
            <h3 className='text-2xl font-bold m-4 py-2 text-center'>
                User: {loaderData.user.name}
            </h3>
            {loaderData?.error && <h3 className="text-red-600 text-xl py-2 text-center">{loaderData?.error}</h3>}
            <h3 className='text-xl font-bold text-center'>Bio:</h3>
            <h4 className='text-xl text-center whitespace-pre-wrap'>
                {JSON.parse(loaderData.user.bio)}
            </h4>
        </div>
    )
}