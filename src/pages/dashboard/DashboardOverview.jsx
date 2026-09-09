const DashboardOverview = ({ user, reservations, prescriptions, onOpenPass, onNavigateTab }) => {
  const activeReservation = reservations.find((r) => r.status === 'READY_FOR_PICKUP');

  return (
    <div className="space-y-8">
      {/* Bannière de Bienvenue */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-semibold mb-4 backdrop-blur-sm border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            Espace Patient Certifié
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading mb-2">
            Bonjour, {user.firstname} {user.lastname}
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Bienvenue sur votre tableau de bord PharmaConnect. Suivez la préparation de vos traitements,
            générez vos pass de retrait ou transmettez une nouvelle ordonnance.
          </p>
        </div>

        {/* Décoration géométrique sobre */}
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Alerte Commande Prête pour Retrait (S'il y en a une) */}
      {activeReservation && (
        <div className="bg-emerald-50 border-2 border-emerald-500/80 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Commande prête pour retrait
                </span>
                <span className="text-xs text-emerald-700 font-medium">{activeReservation.estimatedReadyTime}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {activeReservation.pharmacy.name} (#{activeReservation.id})
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {activeReservation.items.length} articles • Total : {activeReservation.totalAmount.toLocaleString()} F CFA
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenPass(activeReservation)}
            className="w-full md:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="3" width="18" height="18" rx="2"></rect>
              <rect x="7" y="7" width="3" height="3"></rect>
              <rect x="14" y="7" width="3" height="3"></rect>
              <rect x="7" y="14" width="3" height="3"></rect>
            </svg>
            <span>Afficher mon Pass Retrait</span>
          </button>
        </div>
      )}

      {/* Cartes Métriques & Raccourcis Rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div
          onClick={() => onNavigateTab('reservations')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <span className="text-2xl font-black text-slate-900 block font-heading">{reservations.length}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Réservations effectuées</span>
        </div>

        <div
          onClick={() => onNavigateTab('prescriptions')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
          </div>
          <span className="text-2xl font-black text-slate-900 block font-heading">{prescriptions.length}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Ordonnances enregistrées</span>
        </div>

        <div
          onClick={() => onNavigateTab('profile')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <span className="text-sm font-bold text-slate-900 block truncate">{user.phone}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Mobile d'alerte SMS</span>
        </div>
      </div>

      {/* Dernières Réservations */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900 font-heading">Historique récent</h2>
          <button
            onClick={() => onNavigateTab('reservations')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            Voir tout
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {reservations.map((res) => (
            <div key={res.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900 font-mono">#{res.id}</span>
                  <span className="text-xs text-slate-400">• {res.createdAt}</span>
                </div>
                <strong className="text-sm text-slate-800 block">{res.pharmacy.name}</strong>
                <span className="text-xs text-slate-500">
                  {res.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    res.status === 'READY_FOR_PICKUP'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {res.status === 'READY_FOR_PICKUP' ? 'Prêt pour retrait' : 'Retiré'}
                </span>
                <button
                  onClick={() => onOpenPass(res)}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-all"
                >
                  Pass
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
