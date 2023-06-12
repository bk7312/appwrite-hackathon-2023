import { Link } from 'react-router-dom'
import { useRef } from 'react'

export default function Home() {
    const aboutRef = useRef(null)
    const buttonRef = useRef(null)
    function showAbout() {
        const text = aboutRef.current.classList.contains('hidden') ? "Hide" : "Learn more"
        buttonRef.current.textContent = text
        aboutRef.current.classList.toggle('hidden')
        aboutRef.current.scrollIntoView({ behavior: "smooth" })
    }
    return (
        <div
            className='text-center flex flex-col justify-center h-full'
        >
            <h1 className='text-4xl font-bold'>
                Welcome to the Town Square!
            </h1>
            <p className='text-xl pt-4 pb-12'>
                The best place to find out the latest happenings in town.
            </p>
            <Link to="login" className='border w-60 py-2 my-2 rounded bg-blue-600 mx-auto font-bold  text-gray-50 border-neutral-600'>
                Log in
            </Link>
            <p onClick={showAbout} className='underline decoration-2 py-1 mb-4 self-center cursor-pointer' ref={buttonRef}>
                Learn more
            </p>
            <div className='hidden container mx-auto rounded bg-blue-50 dark:bg-blue-900' ref={aboutRef}>
                <h1 className='text-3xl font-bold mt-8 py-2 text-center'>
                    About the Town Square
                </h1>
                <div className="container mx-auto py-2 px-4 text-left">
                    <h3 className='text-xl p-2'>
                        Like the tagline says, it&apos;s the best place to find out the latest happenings in town.
                    </h3>
                    <p className='p-2'>
                        In more concrete terms, Town Square is a forum for the residents of any particular area to gather around and post stuff.
                        The inspiration comes from the old town square vibes where people gather and trade stuff. Kinda like a bazaar or a festival.
                        Below are some example use cases for why anyone would want to use the Town Square.
                    </p>
                    <ol>
                        <li className='p-2 list-decimal list-inside'>
                            Imagine you&apos;re a resident in a town somewhere and you want to sell a bunch of silverware, maybe because you own way too
                            many, so you organize a garage sale. How are you gonna let people know? Advertise on facebook or instagram? Of course not, 
                            you advertise in the Town Square and let all the other residents know!
                        </li>
                        <li className='p-2 list-decimal list-inside'>
                            Imagine you&apos;re new in town and you accidentally locked yourself out of your house. You need a locksmith and fast, maybe 
                            because you left the tap running while washing your newly acquired garage sale silverware, but where are you gonna find a locksmith? 
                            Google search? Of course not, you go around the Town Square and ask for one!
                        </li>
                        <li className='p-2 list-decimal list-inside'>
                            Imagine you&apos;re a mayor or the government somewhere and all your residents use amazon or some big tech giant corporation
                            thing to handle their daily necessities, like buying silverware with next day delivery. How are your local silverware stores
                            gonna compete? Create an e-commerce store? Of course not, you commission some guy to create this &quot;Town Square&quot; forum website
                            thing in an attempt to bring back the medieval town square vibe to combat modern tech giants and save your local silverware
                            store from bankruptcy!
                        </li>
                    </ol>
                    <p className='p-2 text-lg'>
                        Note: This is just an app I&apos;m writing for fun as part of the Appwrite Hackathon, the footer should&apos;ve given it away by now.
                    </p>
                </div>
            </div>
        </div>
    )
}