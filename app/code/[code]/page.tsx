// app/code/[code]/page.tsx
import React from "react";

type Props = { params: { code: string } };

export default async function Page({ params }: Props) {
  const { code } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/links/${code}`, {
    cache: "no-store"
  });
  if (!res.ok) {
    return (
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-xl font-bold">Not found</h1>
        <p>Link with code {code} not found.</p>
      </main>
    );
  }
  const link = await res.json();

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Stats for {link.code}</h1>
      <div className="mb-4">
        <div>
          <strong>Short URL:</strong>{" "}
          <a
            href={`${base}/${link.code}`}
            className="text-blue-600 underline"
            target="_blank"
            rel="noreferrer"
          >
            {`${base}/${link.code}`}
          </a>
        </div>
        <div>
          <strong>Target URL:</strong>{" "}
          <a href={link.url} className="text-blue-600" target="_blank" rel="noreferrer">
            {link.url}
          </a>
        </div>
        <div><strong>Clicks:</strong> {link.clicks}</div>
        <div><strong>Last clicked:</strong> {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "-"}</div>
        <div><strong>Created:</strong> {link.createdAt ? new Date(link.createdAt).toLocaleString() : "-"}</div>
      </div>
      <div className="space-x-2">
        <a href="/" className="px-3 py-2 rounded bg-gray-200">Back</a>
      </div>
    </main>
  );
}
