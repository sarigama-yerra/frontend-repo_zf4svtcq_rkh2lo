import { useState } from "react";
import Hero from "./components/Hero";
import CreatorDemo from "./components/CreatorDemo";
import SubscriberDemo from "./components/SubscriberDemo";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none" />
      <main className="relative">
        {!started ? (
          <Hero onStart={() => setStarted(true)} />
        ) : (
          <>
            <section id="how" className="max-w-6xl mx-auto px-6 pt-16">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
                  <div className="text-sm text-blue-200/70 mb-2">Monetization</div>
                  <h3 className="text-xl font-semibold mb-2">Subscriptions</h3>
                  <p className="text-blue-100/80">Creators define tiers with pricing and benefits. Audience subscribes for gated access.</p>
                </div>
                <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
                  <div className="text-sm text-blue-200/70 mb-2">Appreciation</div>
                  <h3 className="text-xl font-semibold mb-2">Token Tips</h3>
                  <p className="text-blue-100/80">Members buy tokens and send one‑time tips to support creators directly.</p>
                </div>
                <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
                  <div className="text-sm text-blue-200/70 mb-2">Safety</div>
                  <h3 className="text-xl font-semibold mb-2">Non‑Adult Policy</h3>
                  <p className="text-blue-100/80">Strict moderation ensures content remains professional, educational, and hobby‑focused.</p>
                </div>
              </div>
            </section>

            <CreatorDemo />
            <SubscriberDemo />

            <footer className="max-w-6xl mx-auto px-6 pb-16 text-blue-200/70">
              Built as an interactive MVP demo. Set VITE_BACKEND_URL to test API live.
            </footer>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
