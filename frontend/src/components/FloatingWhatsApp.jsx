import React from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const phone = "919876543210";
  const msg = encodeURIComponent(
    "Hi, I'm interested in booking the banquet hall on Bailey Road, Patna.",
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 transition-transform hover:scale-110"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white stroke-emerald-500" />
      <span className="hidden sm:inline font-semibold text-sm">
        Book on WhatsApp
      </span>
    </a>
  );
}
