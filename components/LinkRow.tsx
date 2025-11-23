"use client";

import { motion } from "framer-motion";

export default function LinkRow({ link, onDelete, onCopy }: any) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.15 }}
      className="border-b hover:bg-slate-50"
    >
      {/* Short Code */}
      <td className="p-3 font-medium text-blue-600">
        <a href={`/${link.code}`} target="_blank" className="hover:underline">
          {link.code}
        </a>
      </td>

      {/* URL */}
      <td className="p-3 max-w-[45ch] truncate text-slate-700">
        <a href={link.url} target="_blank" className="hover:underline">
          {link.url}
        </a>
      </td>

      {/* Clicks */}
      <td className="p-3 text-center font-bold">{link.clicks}</td>

      {/* Last Click */}
      <td className="p-3 text-center text-slate-600">
        {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "-"}
      </td>

      {/* Actions */}
      <td className="p-3">
        <div className="flex justify-center gap-3">
          <button
            onClick={() => onCopy(link.code)}
            className="px-3 py-1 rounded bg-sky-100 hover:bg-sky-200"
            title="Copy"
          >
            📋
          </button>

          <a
            href={`/code/${link.code}`}
            className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300"
            title="Stats"
          >
            📊
          </a>

          <button
            onClick={() => onDelete(link.code)}
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </td>
    </motion.tr>
  );
}
