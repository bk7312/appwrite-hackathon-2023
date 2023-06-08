import { Link } from 'react-router-dom'

export default function Home() {

    return (
        <div
            className='text-center flex flex-col justify-center h-full '
        >
            <h1 className='text-4xl font-bold'>
                Welcome to the Town Square!
            </h1>
            <p className='text-xl pt-4 pb-20'>
                The best place to find out the latest happenings in town.
            </p>
            <Link to="login" className='border w-60 py-2 my-2 rounded bg-sky-600 mx-auto font-bold  text-gray-50 border-neutral-600'>
                Enter
            </Link>
            <Link to="about" className='underline decoration-2 py-1'>
                Learn more
            </Link>
        </div>
    )
}