// import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
    return (
        <div className="flex flex-col h-screen font-serif max-w-screen-xl mx-auto">
            <Header />
                <main className="flex-grow self-center max-w-screen-xl w-screen">
                    <Outlet />
                </main>
            <Footer />
        </div>
    )
}