import { Link } from "@tanstack/react-router"
import { Button } from "./Button"
import { useState, useEffect } from "react"

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`island-shell rounded-[1.5rem] flex items-center justify-between px-6 md:px-10 py-5 mb-16 md:mb-24 rise-in z-50 sticky top-6 transition-all duration-300 ${scrolled ? 'shadow-lg backdrop-blur-xl border-[var(--lagoon)] scale-[0.98]' : ''
                }`}
        >
            <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--lagoon)] to-[var(--lagoon-deep)] shadow-inner group cursor-pointer overflow-hidden">
                    {/* animated burst inside logo on hover */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </div>
                <h1 className="display-title text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
                    SocialChat
                </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-10 items-center">
                <div className="flex gap-8 items-center bg-[var(--surface-strong)] px-6 py-2.5 rounded-full border border-[var(--line)] shadow-sm">
                    <a href="#features" className="nav-link font-semibold text-[14px] hover:text-[var(--lagoon-deep)] transition">Features</a>
                    <a href="#download" className="nav-link font-semibold text-[14px] hover:text-[var(--lagoon-deep)] transition">Download</a>
                    <a href="#pricing" className="nav-link font-semibold text-[14px] hover:text-[var(--lagoon-deep)] transition">Pricing</a>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/auth/login" className="font-semibold text-[15px] text-[var(--sea-ink)] hover:text-[var(--palm)] transition-colors">
                        Login
                    </Link>
                    <Link to="/auth/register">
                        <Button variant="primary" size="sm" className="px-6 rounded-full group">
                            Get Started
                            <svg className="w-4 h-4 ml-2 inline-block transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Mobile menu toggle (static visual only for now) */}
            <button className="md:hidden p-2 text-[var(--sea-ink)] focus:outline-none">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
        </nav>
    )
}
