import { useState } from 'react';

const ProfileSettingsView = ({ user }) => {
  const [profile, setProfile] = useState(user);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-heading text-slate-900">Mon Profil & Données de Santé</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Gérez vos coordonnées pour les alertes SMS et le retrait en pharmacie.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Prénom</label>
              <input
                type="text"
                value={profile.firstname}
                onChange={(e) => setProfile({ ...profile, firstname: e.target.value })}
                className="w-full text-sm rounded-xl border border-slate-200 p-3 bg-white"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Nom</label>
              <input
                type="text"
                value={profile.lastname}
                onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
                className="w-full text-sm rounded-xl border border-slate-200 p-3 bg-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Numéro de téléphone
                <span className="text-slate-400 font-normal ml-1">(Reçoit le code SMS de retrait)</span>
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full text-sm rounded-xl border border-slate-200 p-3 bg-white font-mono"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full text-sm rounded-xl border border-slate-200 p-3 bg-white"
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Informations de santé partagées en pharmacie</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Groupe Sanguin</label>
                <input
                  type="text"
                  value={profile.bloodGroup || ''}
                  onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
                  className="w-full text-sm rounded-xl border border-slate-200 p-3 bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Allergies médicamenteuses connues</label>
                <input
                  type="text"
                  value={(profile.allergies || []).join(', ')}
                  onChange={(e) => setProfile({ ...profile, allergies: e.target.value.split(',').map((s) => s.trim()) })}
                  placeholder="Ex: Pénicilline, Aspirine..."
                  className="w-full text-sm rounded-xl border border-slate-200 p-3 bg-white"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all"
            >
              Enregistrer les modifications
            </button>
            {saved && <span className="text-xs font-bold text-emerald-700">Profil mis à jour !</span>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettingsView;
