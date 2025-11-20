import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function SubscriberDemo() {
  const [userId, setUserId] = useState("user-1");
  const [creatorId, setCreatorId] = useState("creator-1");
  const [tokens, setTokens] = useState(0);
  const [tiers, setTiers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tipAmount, setTipAmount] = useState(10);

  async function buyTokens() {
    const res = await fetch(`${API}/api/tokens/purchase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, amount: 100 }),
    });
    const data = await res.json();
    setTokens(data.token_balance ?? 0);
  }

  async function subscribe() {
    const res = await fetch(`${API}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, creator_id: creatorId, tier_id: tiers[0]?.id || "tier-1", active: true }),
    });
    await res.json();
    await loadPosts();
  }

  async function loadTiers() {
    const res = await fetch(`${API}/api/creators/${creatorId}/tiers`);
    const data = await res.json();
    setTiers(data);
  }

  async function loadPosts() {
    const res = await fetch(`${API}/api/creators/${creatorId}/posts?tier_level=2`);
    const data = await res.json();
    setPosts(data);
  }

  async function tip() {
    await fetch(`${API}/api/tokens/tip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from_user_id: userId, to_user_id: creatorId, amount: tipAmount }),
    });
    await getBalance();
  }

  async function getBalance() {
    // quick fetch from user doc
    const res = await fetch(`${API}/test`);
    await res.json();
  }

  useEffect(() => {
    loadTiers();
    loadPosts();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-white mb-4">Subscriber Demo</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-blue-200/80 mb-1">Your User ID</label>
              <input value={userId} onChange={(e)=>setUserId(e.target.value)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-blue-200/80 mb-1">Creator ID</label>
              <input value={creatorId} onChange={(e)=>setCreatorId(e.target.value)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={buyTokens} className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Buy 100 Tokens</button>
            <button onClick={subscribe} className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600">Subscribe</button>
          </div>
          <div className="mt-4">
            <label className="block text-sm text-blue-200/80 mb-1">Tip Amount</label>
            <div className="flex gap-3">
              <input type="number" value={tipAmount} onChange={(e)=>setTipAmount(Number(e.target.value))} className="w-32 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
              <button onClick={tip} className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600">Send Tip</button>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Available Tiers</h3>
          <ul className="space-y-2 mb-6">
            {tiers.map((t)=> (
              <li key={t.id} className="p-3 rounded-lg bg-slate-900/40 border border-slate-700 flex items-center justify-between">
                <div className="text-white">{t.name}</div>
                <div className="text-blue-200/70 text-sm">${(t.price_monthly/100).toFixed(2)}/mo</div>
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold text-white mb-3">Posts (gated)</h3>
          <ul className="space-y-3">
            {posts.map((p)=> (
              <li key={p.id} className="p-3 rounded-lg bg-slate-900/40 border border-slate-700">
                <div className="text-white font-medium">{p.title}</div>
                <div className="text-xs text-blue-200/70">Access level: {p.access_level_required}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
