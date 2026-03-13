import { createFileRoute, Link, redirect } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "../components/ui/Button"
import { InputField } from "../components/ui/InputField"
import { ToastMsg } from "../components/ui/ToastMsg"
import { Navbar } from "../components/ui/Navbar"
import { Footer } from "../components/ui/Footer"

export const Route = createFileRoute("/")({
  component: LandingPage,
})

function LandingPage() {
  const [showToast, setShowToast] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setShowToast(true);
      setEmail("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen py-10 relative w-full px-4 sm:px-6 lg:px-8">
      {/* NAVBAR */}
      <Navbar />

      <main className="flex flex-col gap-24 md:gap-32 w-full max-w-full overflow-hidden sm:overflow-visible">
        {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center text-center px-4 rise-in w-full" style={{ animationDelay: "100ms" }}>
          <p className="island-kicker mb-6 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--lagoon)] shadow-[0_0_10px_2px_rgba(79,184,178,0.5)]"></span>
            Introducing SocialChat 2.0
          </p>
          <h2 className="display-title text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold max-w-6xl text-[var(--sea-ink)] leading-[1.05] tracking-tight">
            Connect vividly.
            <br />
            <span className="text-[var(--lagoon-deep)] italic relative inline-block mt-2">
              Converse fluidly.
              <svg className="absolute w-full h-4 -bottom-1 left-0 text-[var(--lagoon)] opacity-30" viewBox="0 0 200 20" preserveAspectRatio="none"><path d="M0,10 C50,20 150,0 200,10" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" /></svg>
            </span>
          </h2>

          <p className="mt-8 text-lg md:text-xl text-[var(--sea-ink-soft)] max-w-2xl leading-relaxed">
            Experience real-time messaging with an edge. Built for the modern web with premium aesthetics, instantaneous sync, and zero compromises.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mt-12 w-full sm:w-auto items-center">
            <Link to="/auth/register" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-[220px] text-[17px]">Start Chatting Free</Button>
            </Link>
            <Link to="/auth/login" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-[220px] text-[17px]">Return to App</Button>
            </Link>
          </div>
        </section>

        {/* FEATURES */}
        <section className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4 rise-in" style={{ animationDelay: "200ms" }}>
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card rounded-[2rem] p-8 md:p-10 flex flex-col items-start text-left group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--surface-strong)] shadow-[0_4px_12px_rgba(23,58,64,0.06)] border border-[var(--line)] flex items-center justify-center mb-8 text-[var(--lagoon-deep)] transition-transform group-hover:-translate-y-1">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--sea-ink)] tracking-tight">{feature.title}</h3>
              <p className="text-[var(--sea-ink-soft)] leading-relaxed text-[15px]">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* SUBSCRIBE / NEWSLETTER */}
        <section className="max-w-6xl mx-auto w-full px-4 rise-in" style={{ animationDelay: "300ms" }}>
          <div className="island-shell rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--hero-a)] blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="flex-1 w-full relative z-10 text-center lg:text-left">
              <p className="island-kicker mb-3">Early Access</p>
              <h3 className="display-title text-4xl md:text-5xl font-bold text-[var(--sea-ink)] mb-4 leading-tight">
                Stay somewhat connected
              </h3>
              <p className="text-[var(--sea-ink-soft)] text-lg mb-8 max-w-md mx-auto lg:mx-0">
                Join our beta list to be notified when new visual upgrades and features land. Drop your email below.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                <InputField
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" variant="primary" size="md" className="h-[50px]">
                  Join Waitlist
                </Button>
              </form>
            </div>

            <div className="hidden lg:flex flex-1 justify-center items-center relative z-10 w-full">
              <div className="w-full relative aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-[var(--surface-strong)] to-[var(--surface)] border border-[var(--line)] shadow-2xl p-6 flex flex-col gap-4 overflow-hidden">
                {/* Fake Chat UI Mock */}
                <div className="w-12 h-4 rounded-full bg-[var(--line)] mx-auto mb-4"></div>
                <div className="flex gap-3 items-end w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-[var(--lagoon)] shrink-0 opacity-80"></div>
                  <div className="p-4 rounded-2xl rounded-bl-sm bg-[var(--surface-strong)] border border-[var(--line)] text-sm text-[var(--sea-ink-soft)] shadow-sm">
                    Did you see the new SocialChat design? It's literally glowing. ✨
                  </div>
                </div>
                <div className="flex gap-3 justify-end items-end w-[85%] self-end">
                  <div className="p-4 rounded-2xl rounded-br-sm bg-[var(--lagoon)] text-[var(--sea-ink)] shadow-md text-sm font-medium">
                    Just saw it! Those animations are incredibly smooth.
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--surface-strong)] to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />

      {showToast && (
        <ToastMsg
          title="You're on the list!"
          description="We've added your email to our beta waitlist. Keep an eye on your inbox."
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}

const features = [
  {
    title: "Instant Synchronization",
    description:
      "Messages arrive before you can even blink. Powered by optimized WebSockets for a seamless, realtime experience across all active devices.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
    )
  },
  {
    title: "Ironclad Security",
    description:
      "Your conversations are exclusively yours. Every single message is secured with military-grade end-to-end encryption from sender to receiver.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
    )
  },
  {
    title: "Meticulous Design",
    description:
      "A premium, glassmorphic interface that adapts perfectly to your environment, featuring fluid micro-animations and exceptional typography.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
    )
  },
]