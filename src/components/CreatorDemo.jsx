import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function CreatorDemo() {
  const [creatorId, setCreatorId] = useState("creator-1");
  const [tierName, setTierName] = useState("Pro Tutorials");
  const [price, setPrice] = useState(500);
  const [postTitle, setPostTitle] = useState("Build a Portfolio in React");
  const [posts, setPosts] = useState([]);

  async function createTier() {
    const res = await fetch(`${API}/api/creators/tiers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creator_id: creatorId, name: tierName, description: "Access to weekly tutorials", price_monthly: price, level: 2, is_active: true }),
    });
    const data = await res.json();
    alert(`Tier created: ${data.id || "ok"}`);
  }

  async function publishPost() {
    const res = await fetch(`${API}/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creator_id: creatorId, title: postTitle, body_text: "Full lesson and assets", access_level_required: 2, is_draft: false }),
    });
    const data = await res.json();
    alert(`Post published: ${data.id || "ok"}`);
    await loadPosts();
  }

  async function loadPosts() {
    const res = await fetch(`${API}/api/creators/${creatorId}/posts?tier_level=2`);
    const data = await res.json();
    setPosts(data);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-white mb-4">Creator Demo</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-blue-200/80 mb-1">Creator ID</label>
              <input value={creatorId} onChange={(e)=>setCreatorId(e.target.value)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-blue-200/80 mb-1">Tier Name</label>
              <input value={tierName} onChange={(e)=>setTierName(e.target.value)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-blue-200/80 mb-1">Price (cents)</label>
              <input type="number" value={price} onChange={(e)=>setPrice(Number(e.target.value))} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-blue-200/80 mb-1">Post Title</label>
              <input value={postTitle} onChange={(e)=>setPostTitle(e.target.value)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={createTier} className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Create Tier</button>
            <button onClick={publishPost} className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600">Publish Post</button>
          </div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Published Posts</h3>
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
