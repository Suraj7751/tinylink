"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LinkRow from "../components/LinkRow";
import Toast from "../components/Toast";

type LinkT = {
  id: number;
  code: string;
  url: string;
  clicks: number;
  lastClicked?: string | null;
  createdAt?: string | null;
};

export default function Dashboard() {
  const [links, setLinks] = useState<LinkT[]>([]);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [search, setSearch] = useState("");

  async function fetchLinks() {
    const res = await fetch("/api/links");
    if (res.ok) setLinks(await res.json());
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  function showToast(message: string) {
    setToast({ show: true, message });
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, code: code || undefined }),
      });

      if (!res.ok) {
        const err = await res.json();
        showToast(err?.error || "Error creating link");
      } else {
        showToast("Link created successfully 🎉");
        setUrl("");
        setCode("");
        fetchLinks();
      }
    } catch {
      showToast("Network error");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy(c: string) {
    navigator.clipboard.writeText(`${location.origin}/${c}`);
    showToast("Copied to clipboard 📋");
  }

  async function handleDelete(c: string) {
    if (!confirm("Delete this link?")) return;

    await fetch(`/api/links/${c}`, { method: "DELETE" });
    setLinks((s) => s.filter((l) => l.code !== c));
    showToast("Deleted successfully 🗑️");
  }

  const filtered = links.filter(
    (l) =>
      l.code.toLowerCase().includes(search.toLowerCase()) ||
      l.url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-8">

      {/* CENTERED HEADER */}
      <header className="flex flex-col items-center justify-center text-center space-y-1">
        <h1 className="text-4xl font-extrabold tracking-tight">TinyLink</h1>
        <p className="text-slate-500 text-sm">
          Shorten links, share, and track clicks — fast & powerful.
        </p>
        <div className="text-xs text-green-600 font-semibold mt-1">
          ● Uptime Healthy
        </div>
      </header>

      {/* FORM */}
      <motion.form
        onSubmit={handleAdd}
        className="bg-white p-6 rounded-xl shadow border space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold">Create New Short Link ➕</h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,200px,120px] gap-3">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="🔗 Enter long URL..."
            required
            className="p-3 rounded-lg border focus:ring-2 focus:ring-sky-400"
          />

          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Custom Code"
            className="p-3 rounded-lg border focus:ring-2 focus:ring-sky-400"
          />

          <button
            disabled={loading}
            className="bg-sky-600 text-white rounded-lg shadow px-4 py-3 hover:bg-sky-500 transition font-medium"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </motion.form>

      {/* SEARCH */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Links</h2>

        <input
          type="text"
          placeholder="🔍 Search links..."
          className="border p-2 px-4 rounded-lg w-60"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <section className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="p-4 border-b flex justify-between">
          <div className="font-medium">All Links</div>
          <div className="text-sm text-slate-500">{filtered.length} links</div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-6 text-center text-slate-500">
            No links found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 text-sm text-slate-500">
                <tr>
                  <th className="p-3 text-left w-[15%]">Short Code</th>
                  <th className="p-3 text-left w-[45%]">URL</th>
                  <th className="p-3 text-center w-[10%]">Clicks</th>
                  <th className="p-3 text-center w-[15%]">Last Click</th>
                  <th className="p-3 text-center w-[15%]">Actions</th>
                </tr>
              </thead>

              <tbody>
                <AnimatePresence>
                  {filtered.map((link) => (
                    <LinkRow
                      key={link.id}
                      link={link}
                      onCopy={handleCopy}
                      onDelete={handleDelete}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Toast
        message={toast.message}
        show={toast.show}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </main>
  );
}
