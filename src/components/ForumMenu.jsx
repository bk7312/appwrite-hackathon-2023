import { Link } from "react-router-dom"

export default function ForumMenu() {
    const menuData = [
        { 
            link: "announcement",
            title: "Announcements",
            description: "Curious about the town? Get the latest info here, come read our announcements!"
        }, 
        { 
            link: "event",
            title: "Events",
            description: "Bored? Come check out the latest events happening around town!"
        }, 
        { 
            link: "help",
            title: "Help wanted",
            description: "Need help with something? Post it here and let everyone know."
        }, 
        { 
            link: "advertise",
            title: "Advertise your products or services",
            description: "Need help advertising your products or services? Post it here and let everyone know."
        }, 
        { 
            link: "conversation",
            title: "Conversations around the town",
            description: "Wanna talk with others and hear what's going on around town? Check out our conversation corner."
        }, 
    ]

    const menus = menuData.map((menu, i) => (
        <Link to={menu.link} key={i}>
            <div className="container p-2">
                <h4 className="text-lg font-bold">{menu.title}</h4>
                <p className="italic">{menu.description}</p>
            </div>
        </Link>
    ))

    return (
        <>
            <h1 className='text-xl font-bold mt-12 py-2 text-center'>
                Forum Menu
            </h1>
            <nav className="container mx-auto p-2">
                {menus}
            </nav>
        </>
    )
}