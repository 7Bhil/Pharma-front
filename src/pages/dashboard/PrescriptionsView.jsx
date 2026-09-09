import { useState } from 'react';

const PrescriptionsView = ({ prescriptions }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setSelectedFile(null);
    }, 4000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold font-heading text-slate-900">Mes Ordonnances Médicales</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Télétransmettez vos ordonnances de façon chiffrée pour une préparation en avance par votre officine.
        </p>
      </div>

      {/* Zone de Dépôt Sécurisée */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <span>Déposer une nouvelle ordonnance</span>
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Formats acceptés : PDF, JPG, PNG (Max 10 Mo). Document chiffré avant transmission.
        </p>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center bg-slate-50/50 transition-colors">
            <input
              type="file"
              id="prescription-upload-file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            <label htmlFor="prescription-upload-file" className="cursor-pointer flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <strong className="text-sm text-slate-800 block">
                {selectedFile ? selectedFile.name : 'Cliquez pour sélectionner votre fichier'}
              </strong>
              <span className="text-xs text-slate-400 mt-1">
                {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} Mo` : 'ou glissez-déposez le document ici'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Pharmacie destinataire</label>
              <select className="w-full text-sm rounded-xl border-slate-200 p-2.5 bg-white border">
                <option>Pharmacie Centrale du Plateau</option>
                <option>Pharmacie de la Haie Vive</option>
                <option>Pharmacie des 4 Théâtres</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Notes ou précisions (optionnel)</label>
              <input
                type="text"
                placeholder="Ex: Traitement pour 1 mois, renouvellement..."
                className="w-full text-sm rounded-xl border-slate-200 p-2.5 bg-white border"
              />
            </div>
          </div>

          {uploadSuccess ? (
            <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Ordonnance transmise avec succès ! Votre pharmacien l'examine dès maintenant.</span>
            </div>
          ) : (
            <button
              type="submit"
              disabled={!selectedFile}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all"
            >
              Transmettre à la pharmacie
            </button>
          )}
        </form>
      </div>

      {/* Historique des Ordonnances */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-4 font-heading">Historique de mes ordonnances</h3>

        <div className="divide-y divide-slate-100">
          {prescriptions.map((ord) => (
            <div key={ord.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <strong className="text-sm font-bold text-slate-800">{ord.documentName}</strong>
                    <span className="text-xs text-slate-400">({ord.fileSize})</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {ord.pharmacyName} • {ord.doctor}
                  </p>
                  <span className="text-[11px] text-slate-400">Transmise le {ord.uploadedAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    ord.status === 'VALIDATED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : ord.status === 'COMPLETED'
                      ? 'bg-slate-100 text-slate-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {ord.status === 'VALIDATED'
                    ? 'Validée par pharmacien'
                    : ord.status === 'COMPLETED'
                    ? 'Délivrée'
                    : 'En attente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsView;
