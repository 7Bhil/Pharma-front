import { useState } from 'react';

const PickupPassModal = ({ reservation, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!reservation) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(reservation.pickupCode.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header Médical */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-9 h-9 flex items-center justify-center transition-all"
            aria-label="Fermer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                <rect x="7" y="7" width="3" height="3"></rect>
                <rect x="14" y="7" width="3" height="3"></rect>
                <rect x="7" y="14" width="3" height="3"></rect>
                <line x1="14" y1="14" x2="17" y2="14"></line>
                <line x1="14" y1="17" x2="17" y2="17"></line>
              </svg>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-200 block">Pass Retrait Officinal</span>
              <h3 className="text-xl font-bold font-heading">Commande #{reservation.id}</h3>
            </div>
          </div>
          <p className="text-emerald-100 text-xs">
            Présentez ce pass au guichet prioritaire de votre pharmacie pour retirer vos médicaments.
          </p>
        </div>

        {/* Corps de la Modale */}
        <div className="p-6 flex flex-col items-center">
          {/* QR Code SVG vectoriel propre (Sans emoji ni dépendance lourde) */}
          <div className="p-4 bg-slate-50 border-2 border-dashed border-emerald-300 rounded-2xl flex flex-col items-center justify-center mb-5">
            <svg width="180" height="180" viewBox="0 0 180 180" className="w-44 h-44">
              {/* Fond */}
              <rect width="180" height="180" fill="#ffffff" rx="12" />
              
              {/* Coins Repères QR (Top-Left) */}
              <rect x="15" y="15" width="45" height="45" rx="6" fill="#0f172a" />
              <rect x="23" y="23" width="29" height="29" rx="3" fill="#ffffff" />
              <rect x="29" y="29" width="17" height="17" rx="2" fill="#059669" />

              {/* Coins Repères QR (Top-Right) */}
              <rect x="120" y="15" width="45" height="45" rx="6" fill="#0f172a" />
              <rect x="128" y="23" width="29" height="29" rx="3" fill="#ffffff" />
              <rect x="134" y="29" width="17" height="17" rx="2" fill="#059669" />

              {/* Coins Repères QR (Bottom-Left) */}
              <rect x="15" y="120" width="45" height="45" rx="6" fill="#0f172a" />
              <rect x="23" y="128" width="29" height="29" rx="3" fill="#ffffff" />
              <rect x="29" y="134" width="17" height="17" rx="2" fill="#059669" />

              {/* Matrice de motifs représentative */}
              <rect x="70" y="20" width="10" height="10" fill="#0f172a" />
              <rect x="90" y="20" width="10" height="20" fill="#0f172a" />
              <rect x="70" y="40" width="20" height="10" fill="#059669" />
              <rect x="100" y="40" width="10" height="10" fill="#0f172a" />

              <rect x="20" y="70" width="10" height="20" fill="#0f172a" />
              <rect x="40" y="80" width="20" height="10" fill="#0f172a" />
              <rect x="70" y="70" width="15" height="15" fill="#059669" />
              <rect x="95" y="70" width="15" height="15" fill="#0f172a" />
              <rect x="120" y="70" width="10" height="20" fill="#0f172a" />
              <rect x="145" y="80" width="15" height="10" fill="#059669" />

              <rect x="70" y="100" width="25" height="10" fill="#0f172a" />
              <rect x="105" y="100" width="10" height="25" fill="#059669" />
              <rect x="130" y="110" width="20" height="10" fill="#0f172a" />

              <rect x="70" y="130" width="10" height="25" fill="#059669" />
              <rect x="90" y="140" width="25" height="10" fill="#0f172a" />
              <rect x="130" y="135" width="25" height="15" fill="#0f172a" />

              {/* Logo santé au centre */}
              <circle cx="90" cy="90" r="16" fill="#ffffff" stroke="#059669" strokeWidth="2" />
              <path d="M90 84v12M84 90h12" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="text-[11px] text-slate-500 font-medium mt-2">À scanner par le pharmacien</span>
          </div>

          {/* Code de Retrait 6 Chiffres */}
          <div className="w-full bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 mb-4 text-center">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide block mb-1">
              Code de retrait de secours (SMS)
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-extrabold tracking-widest text-emerald-950 font-mono">
                {reservation.pickupCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-2 rounded-lg bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-700 transition-all"
                title="Copier le code"
              >
                {copied ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>
            {copied && <span className="text-xs text-emerald-700 font-medium block mt-1">Code copié dans le presse-papier</span>}
          </div>

          {/* Informations Pharmacie */}
          <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-left mb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <strong className="text-sm font-bold text-slate-900 block">{reservation.pharmacy.name}</strong>
                <p className="text-xs text-slate-600 mt-0.5">{reservation.pharmacy.address}</p>
              </div>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {reservation.pharmacy.distance}
              </span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2 pt-2 border-t border-slate-200">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{reservation.pharmacy.phone}</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-medium">{reservation.pharmacy.openingHours}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all"
          >
            Fermer le pass
          </button>
        </div>
      </div>
    </div>
  );
};

export default PickupPassModal;
