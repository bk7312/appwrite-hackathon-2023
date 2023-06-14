import { Outlet } from "react-router-dom"
import ForumHeader from "./ForumHeader"
import Footer from "./Footer"

export default function ForumLayout() {
    return (
        <div className="flex flex-col h-full font-serif max-w-screen-xl mx-auto">
            <ForumHeader />
                <main className="flex-grow self-center max-w-screen-xl w-screen">
                    <Outlet />
                </main>
            <Footer />
        </div>
    )
}