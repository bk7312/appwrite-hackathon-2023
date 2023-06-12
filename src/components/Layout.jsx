import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
    return (
        <div className="flex flex-col h-full font-serif max-w-screen-xl mx-auto">
            <Header />
                <main className="flex-grow self-center max-w-screen-xl w-full">
                    <Outlet />
                </main>
            <Footer />
        </div>
    )
}