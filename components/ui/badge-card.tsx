"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface BadgeCardProps {
  badge: string;
  score: number;
  badgeColor: string;
  description: string;
  size?: "small" | "medium" | "large";
}

export function BadgeCard({ badge, score, badgeColor, description, size = "large" }: BadgeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: "w-32 h-32",
    medium: "w-48 h-48",
    large: "w-64 h-64",
  };

  const textSizes = {
    small: "text-4xl",
    medium: "text-6xl",
    large: "text-8xl",
  };

  const badgeEmoji = badge.split(" ")[1] || "🧬";

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={`${sizeClasses[size]} relative mx-auto`}>
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl opacity-50"
          style={{ background: badgeColor }}
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.7 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Main circle */}
        <div
          className="relative w-full h-full rounded-full flex items-center justify-center border-4"
          style={{
            borderColor: badgeColor,
            background: `radial-gradient(circle at 30% 30%, ${badgeColor}20, transparent)`,
          }}
        >
          {/* Score ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="#2a2a3a"
              strokeWidth="8"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke={badgeColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45} ${2 * Math.PI * 45}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
              animate={{
                strokeDashoffset: 2 * Math.PI * 45 * (1 - score / 100),
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>

          {/* Badge emoji */}
          <motion.div
            className={`${textSizes[size]} z-10`}
            animate={{
              rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            {badgeEmoji}
          </motion.div>
        </div>

        {/* Score display */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-4xl font-black text-gradient">{score}</div>
          <div className="text-xs text-gray-400">/100</div>
        </motion.div>
      </div>

      {/* Badge name */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-2xl font-black mb-2">{badge}</h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto">{description}</p>
      </motion.div>
    </motion.div>
  );
}
