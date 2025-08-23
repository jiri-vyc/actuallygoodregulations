import React, { useState } from "react"
import { X } from "lucide-react"

export function NewsBox() {
  const [open, setOpen] = useState(true)
  if (!open) return null

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl border border-red-400/30 bg-white/85 px-6 py-5 shadow-sm backdrop-blur-sm transition hover:shadow-md">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-20 blur-lg"
        style={{ background: "linear-gradient(90deg, rgba(248,113,113,0.4), rgba(251,191,36,0.35))" }}
      />

      <button
        onClick={() => setOpen(false)}
        aria-label="Dismiss"
        className="absolute top-2.5 right-2.5 z-20 text-stone-400 hover:text-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded p-1"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="relative z-10 text-stone-900">
        <p className="text-base sm:text-lg font-bold tracking-tight">
          🚨 “Chat Control” threatens private messaging
        </p>
        <p className="mt-1 text-sm sm:text-base leading-snug">
          It would force scanning of private chats and undermine end-to-end encryption. Nobody is
          infallible — and when a regulation is not right, <span className="font-semibold">we will voice our
          concern and inform</span>. Stay aware and take action when needed.{" "}
          <a
            href="https://fightchatcontrol.eu/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 hover:text-red-600"
          >
            Learn more →
          </a>
        </p>
      </div>
    </div>
  )
}
