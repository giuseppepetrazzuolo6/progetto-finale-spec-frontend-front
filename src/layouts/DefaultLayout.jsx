import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react";

import Header from "../components/Header"
import Footer from "../components/Footer";

export default function DefaultLayout() {

    //gestione dello scroll per apparizione button
    const [showBtn, setShowBtn] = useState(false)

    useEffect(() => {
        const onScroll = () => setShowBtn(window.scrollY > 200);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
            {showBtn && (
                <button className="scroll-top-btn" onClick={scrollToTop}>
                    ↑
                </button>
            )}
        </>
    )
}