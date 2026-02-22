"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentUrl: string;
  amount: number;
  plan: string;
}

export function QRModal({ isOpen, onClose, paymentUrl, amount, plan }: QRModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState("");

  useEffect(() => {
    if (isOpen && paymentUrl) {
      QRCode.toDataURL(paymentUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: "#FF6B35",
          light: "#0a0a0f",
        },
      }).then(setQrDataUrl);
    }
  }, [isOpen, paymentUrl]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="card p-8 max-w-md w-full relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* Content */}
              <div className="text-center">
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  🌊
                </motion.div>

                <h2 className="text-2xl font-black mb-2">Paiement Wave</h2>
                <p className="text-gray-400 text-sm mb-6">
                  Scanne ce QR code avec ton app Wave pour payer {amount} FCFA
                </p>

                {/* QR Code */}
                {qrDataUrl && (
                  <motion.div
                    className="bg-white p-4 rounded-2xl inline-block mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.3 }}
                  >
                    <img src={qrDataUrl} alt="QR Code Wave" className="w-64 h-64" />
                  </motion.div>
                )}

                {/* Instructions */}
                <div className="space-y-3 text-left bg-[#1a1a2e] rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF6B35] flex items-center justify-center text-xs font-bold flex-shrink-0">
                      1
                    </div>
                    <p className="text-sm text-gray-300">Ouvre ton application Wave</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF6B35] flex items-center justify-center text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <p className="text-sm text-gray-300">Scanne le QR code ci-dessus</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF6B35] flex items-center justify-center text-xs font-bold flex-shrink-0">
                      3
                    </div>
                    <p className="text-sm text-gray-300">Confirme le paiement de {amount} FCFA</p>
                  </div>
                </div>

                {/* Plan info */}
                <div className="text-xs text-gray-500">
                  Plan {plan === "quarterly" ? "Trimestriel" : "Annuel"} — ADN_237_225 Premium
                </div>

                {/* Alternative link */}
                <a
                  href={paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm text-[#FF6B35] hover:underline"
                >
                  Ouvrir le lien de paiement →
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
