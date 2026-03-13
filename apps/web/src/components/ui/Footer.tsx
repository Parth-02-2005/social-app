import { Link } from "@tanstack/react-router"
import { Button } from "./Button"

export const Footer = () => {
    return (
        <footer className="mt-32 pt-16 pb-8 px-8 md:px-16 site-footer rounded-t-[3rem] relative overflow-hidden">
            {/* Decorative background flare */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[var(--hero-b)] blur-[120px] rounded-full opacity-50 pointer-events-none"></div>

            <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8 mb-16">
                <div className="flex flex-col items-start gap-4 max-w-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--lagoon)] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        </div>
                        <h2 className="display-title text-xl font-bold text-[var(--sea-ink)]">SocialChat</h2>
                    </div>
                    <p className="text-[var(--sea-ink-soft)] text-sm leading-relaxed">
                        The premium way to stay connected. Designed for speed, security, and an unmatched user experience.
                    </p>
                    <div className="flex gap-4 mt-2">
                        <a href="#" className="w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--sea-ink)] hover:border-[var(--lagoon)] hover:text-[var(--lagoon-deep)] transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--sea-ink)] hover:border-[var(--lagoon)] hover:text-[var(--lagoon-deep)] transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-[var(--sea-ink)] mb-1">Product</h4>
                        <a href="#" className="text-[14px] text-[var(--sea-ink-soft)] hover:text-[var(--palm)] transition-colors">Features</a>
                        <a href="#" className="text-[14px] text-[var(--sea-ink-soft)] hover:text-[var(--palm)] transition-colors">Integrations</a>
                        <a href="#" className="text-[14px] text-[var(--sea-ink-soft)] hover:text-[var(--palm)] transition-colors">Pricing</a>
                        <a href="#" className="text-[14px] text-[var(--sea-ink-soft)] hover:text-[var(--palm)] transition-colors">Changelog</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-[var(--sea-ink)] mb-1">Company</h4>
                        <a href="#" className="text-[14px] text-[var(--sea-ink-soft)] hover:text-[var(--palm)] transition-colors">About Us</a>
                        <a href="#" className="text-[14px] text-[var(--sea-ink-soft)] hover:text-[var(--palm)] transition-colors">Careers</a>
                        <a href="#" className="text-[14px] text-[var(--sea-ink-soft)] hover:text-[var(--palm)] transition-colors">Blog</a>
                        <a href="#" className="text-[14px] text-[var(--sea-ink-soft)] hover:text-[var(--palm)] transition-colors">Contact</a>
                    </div>
                    <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
                        <h4 className="font-bold text-[var(--sea-ink)] mb-1">Ready to start?</h4>
                        <p className="text-[14px] text-[var(--sea-ink-soft)] mb-2">Create an account for free.</p>
                        <Link to="/auth/register" className="w-fit">
                            <Button variant="secondary" size="sm" className="rounded-full">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto border-t border-[var(--line)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[var(--sea-ink-soft)]">
                <p>© {new Date().getFullYear()} SocialChat. Design by <span className="text-[var(--lagoon-deep)]"> Parth Gandhi.</span></p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-[var(--sea-ink)] transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-[var(--sea-ink)] transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-[var(--sea-ink)] transition-colors">Cookie Policy</a>
                </div>
            </div>
        </footer>
    )
}
