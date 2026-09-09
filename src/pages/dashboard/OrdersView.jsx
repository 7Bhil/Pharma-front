const OrdersView = ({ reservations, onOpenPass }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-slate-900">Mes Réservations & Retraits</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Suivez la préparation de vos médicaments en pharmacie et accédez à vos pass de retrait.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {reservations.map((res) => {
          const isReady = res.status === 'READY_FOR_PICKUP';

          return (
            <div
              key={res.id}
              className={`bg-white rounded-2xl border p-6 shadow-sm transition-all ${
                isReady ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-bold text-slate-900">Commande #{res.id}</span>
                    <span className="text-xs text-slate-400">• Passée le {res.createdAt}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800">{res.pharmacy.name}</h3>
                  <p className="text-xs text-slate-500">{res.pharmacy.address}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Montant total</span>
                    <span className="text-base font-extrabold text-slate-900 font-heading">
                      {res.totalAmount.toLocaleString()} F CFA
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenPass(res)}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                      <rect x="7" y="7" width="3" height="3"></rect>
                      <rect x="14" y="7" width="3" height="3"></rect>
                      <rect x="7" y="14" width="3" height="3"></rect>
                    </svg>
                    <span>Ouvrir Pass Retrait</span>
                  </button>
                </div>
              </div>

              {/* Suivi des étapes (Stepper State Machine) */}
              <div className="pt-4">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="font-semibold text-slate-800">Confirmée</span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${
                        isReady || res.status === 'COMPLETED'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="font-semibold text-slate-800">En préparation</span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${
                        res.status === 'COMPLETED'
                          ? 'bg-slate-300 text-slate-600'
                          : isReady
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 animate-pulse'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {res.status === 'COMPLETED' ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        '3'
                      )}
                    </div>
                    <span className={`font-semibold ${isReady ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                      {res.status === 'COMPLETED' ? 'Retirée au comptoir' : 'Prête pour retrait'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Détails des Articles */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <div>
                  <strong>Médicaments : </strong>
                  {res.items.map((it) => `${it.name} (x${it.quantity})`).join(' • ')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">
                    Code : {res.pickupCode}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersView;
