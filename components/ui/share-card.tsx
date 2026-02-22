"use client";

import { motion } from "framer-motion";
import { Share2, MessageCircle, Twitter, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ShareCardProps {
  shareText: string;
  whatsappUrl: string;
  twitterUrl: string;
}

export function ShareCard({ shareText, whatsappUrl, twitterUrl }: ShareCardProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const shareButtons = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: whatsappUrl,
      color: "#25D366",
      gradient: "from-[#25D366] to-[#128C7E]",
    },
    {
      name: "Twitter/X",
      icon: Twitter,
      url: twitterUrl,
      color: "#1DA1F2",
      gradient: "from-[#1DA1F2] to-[#0d8bd9]",
    },
  ];

  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Share2 size={20} className="text-[#FF6B35]" />
        <h2 className="font-bold">Partage ton ADN 🔥</h2>
      </div>

      <motion.div
        className="bg-[#1a1a2e] rounded-xl p-4 mb-4 relative overflow-hidden"
        whileHover={{ scale: 1.01 }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B35]/10 rounded-full blur-3xl" />
        <p className="text-sm text-gray-300 italic relative z-10">&ldquo;{shareText}&rdquo;</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        {shareButtons.map((btn, idx) => (
          <motion.a
            key={btn.name}
            href={btn.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center gap-2 bg-gradient-to-br ${btn.gradient} bg-opacity-10 border border-opacity-30 rounded-xl py-4 hover:shadow-lg transition-all`}
            style={{ borderColor: `${btn.color}40` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <btn.icon size={24} style={{ color: btn.color }} />
            <span className="text-xs font-bold" style={{ color: btn.color }}>
              {btn.name}
            </span>
          </motion.a>
        ))}

        <motion.button
          onClick={handleCopy}
          className="flex flex-col items-center gap-2 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-xl py-4 hover:bg-[#FF6B35]/20 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ y: -4, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? <Check size={24} className="text-green-400" /> : <Copy size={24} className="text-[#FF6B35]" />}
          <span className="text-xs font-bold text-[#FF6B35]">{copied ? "Copié !" : "Copier"}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
