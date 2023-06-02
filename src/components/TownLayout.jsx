// import React from "react"
import { Outlet } from "react-router-dom"
import TownHeader from "./TownHeader"
import Footer from "./Footer"

export default function TownLayout() {
    return (
        <div className="flex flex-col h-full font-serif max-w-screen-xl mx-auto">
            <TownHeader />
                <main className="flex-grow self-center max-w-screen-xl w-screen">
                    <Outlet />
                </main>
            <Footer />
        </div>
    )
}