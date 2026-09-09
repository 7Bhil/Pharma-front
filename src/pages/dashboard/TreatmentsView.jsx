import { Link } from 'react-router-dom';

const TreatmentsView = ({ treatments }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-slate-900">Mon Carnet de Traitements</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Suivi des prises quotidiennes, posologies et anticipation des renouvellements en pharmacie.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {treatments.map((treat) => {
          const progressPercent = Math.round((treat.remainingDoses / treat.totalDoses) * 100);

          return (
            <div
              key={treat.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {treat.category}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      treat.isLowStock
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {treat.statusLabel}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-heading">{treat.name}</h3>
                <p className="text-xs text-slate-600 mt-1">{treat.dosage}</p>
                <span className="text-[11px] text-slate-400 block mt-1">Prescrit par {treat.doctor}</span>

                {/* Barre de progression des prises */}
                <div className="mt-5 space-y-2">
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        treat.isLowStock ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>{treat.remainingDoses} prises restantes sur {treat.totalDoses}</span>
                    <span>{progressPercent}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                {treat.isLowStock ? (
                  <Link
                    to="/#search-section"
                    className="w-full py-2.5 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    Renouveler en pharmacie
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="w-full py-2.5 text-center border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all"
                  >
                    Marquer une prise effectuée
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TreatmentsView;
