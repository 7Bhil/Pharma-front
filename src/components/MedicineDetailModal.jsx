const MedicineDetailModal = ({ medicine, onClose, onAddToCart }) => {
  if (!medicine) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-8 animate-in fade-in zoom-in duration-200">
        {/* Header Médical */}
        <div className="relative bg-slate-900 text-white p-6 sm:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 opacity-90"></div>
          
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-9 h-9 flex items-center justify-center transition-all z-10"
            aria-label="Fermer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white/10 border border-white/20 shrink-0 shadow-lg">
              <img src={medicine.imageUrl} alt={medicine.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 uppercase tracking-wider">
                  {medicine.category}
                </span>
                {medicine.requiresPrescription ? (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Ordonnance requise
                  </span>
                ) : (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
                    Vente libre
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mb-1">
                {medicine.name}
              </h2>
              <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
                DCI : {medicine.scientificName} • Forme : {medicine.form}
              </p>
              
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-400">
                {medicine.price.toLocaleString('fr-FR')} F CFA
                <span className="text-xs font-normal text-slate-300 ml-2">Prix unitaire conseillé</span>
              </div>
            </div>
          </div>
        </div>

        {/* Corps de la Modale */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Description & Indications */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description & Indication thérapeutique</h3>
            <p className="text-slate-700 text-sm leading-relaxed">{medicine.description}</p>
          </div>

          {/* Posologie */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Posologie & Mode d'administration</span>
            </div>
            <p className="text-emerald-950 text-xs sm:text-sm leading-relaxed">{medicine.posology}</p>
          </div>

          {/* Contre-indications */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span>Contre-indications & Précautions</span>
            </div>
            <p className="text-amber-950 text-xs sm:text-sm leading-relaxed">{medicine.contraindications}</p>
          </div>

          {/* Disponibilité par Officine */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Disponibilité par officine (Temps Réel)</h3>
            <div className="space-y-2">
              {medicine.pharmacyAvailability?.map((pharm, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${pharm.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                    <div>
                      <strong className="text-slate-900 block font-semibold">{pharm.pharmacyName}</strong>
                      {pharm.isDuty && (
                        <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">Pharmacie de garde</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {pharm.stock > 0 ? (
                      <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-xs">
                        {pharm.stock} boîtes en stock
                      </span>
                    ) : (
                      <span className="font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full text-xs">
                        Rupture momentanée
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Équivalents génériques */}
          {medicine.genericAlternatives?.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Équivalents génériques certifiés</h3>
              <div className="flex flex-wrap gap-2">
                {medicine.genericAlternatives.map((alt, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200">
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-all"
          >
            Fermer la fiche
          </button>

          <button
            onClick={() => {
              onAddToCart(medicine);
              onClose();
            }}
            disabled={medicine.stock === 0}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span>Ajouter au panier de réservation ({medicine.price.toLocaleString('fr-FR')} F CFA)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailModal;
