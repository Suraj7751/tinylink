"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message, show, onClose }: any) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 bg-black text-white px-4 py-3 rounded-lg shadow-xl"
        >
          <div className="flex items-center gap-3">
            <span>{message}</span>
            <button
              onClick={onClose}
              className="ml-2 px-2 py-1 bg-white text-black rounded-full"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
