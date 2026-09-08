import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  mockCurrentUser,
  mockReservations,
  mockUserPrescriptions,
  mockFavoritePharmacies,
  mockTreatments,
} from '../../data/dashboardMockData';
import DashboardOverview from './DashboardOverview';
import OrdersView from './OrdersView';
import PrescriptionsView from './PrescriptionsView';
import TreatmentsView from './TreatmentsView';
import ProfileSettingsView from './ProfileSettingsView';
import PickupPassModal from './PickupPassModal';

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'reservations' | 'prescriptions' | 'profile'
  const [selectedPassReservation, setSelectedPassReservation] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const user = mockCurrentUser;
  const reservations = mockReservations;
  const prescriptions = mockUserPrescriptions;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar Dashboard */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>

            <Link to="/" className="flex items-center gap-2.5 text-decoration-none">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <span className="font-heading font-extrabold text-slate-900 text-base">
                Pharma<span className="text-emerald-600">Connect</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/#search-section"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Rechercher médicament</span>
            </Link>

            {/* Profil Utilisateur Mini */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                {user.firstname[0]}{user.lastname[0]}
              </div>
              <span className="hidden md:block text-xs font-bold text-slate-800">{user.firstname}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Container Principal en 2 Colonnes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex gap-8">
        {/* Sidebar Desktop */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between transform transition-transform lg:translate-x-0 lg:static lg:w-64 lg:rounded-3xl lg:border lg:h-fit shadow-sm ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between lg:hidden mb-4">
              <span className="font-bold text-sm text-slate-800">Menu Espace Patient</span>
              <button onClick={() => setMobileSidebarOpen(false)} className="text-slate-500">
                ✕
              </button>
            </div>

            <div className="px-3 py-2 bg-emerald-50/70 border border-emerald-200/60 rounded-2xl">
              <span className="text-[11px] font-bold text-emerald-900 block">Mon Officine Habituelle</span>
              <strong className="text-xs text-slate-800 block truncate mt-0.5">
                {mockFavoritePharmacies[0].name}
              </strong>
              <span className="text-[10px] text-emerald-700 font-medium">À 450m • De garde 24h/24</span>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => { setActiveTab('overview'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'overview'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>Vue d'ensemble</span>
              </button>

              <button
                onClick={() => { setActiveTab('reservations'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'reservations'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <span>Mes Réservations</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === 'reservations' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  1 prête
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('prescriptions'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'prescriptions'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <span>Mes Ordonnances</span>
              </button>

              <button
                onClick={() => { setActiveTab('treatments'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'treatments'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>Carnet de Traitements</span>
              </button>

              <button
                onClick={() => { setActiveTab('profile'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'profile'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Profil & Données santé</span>
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <Link
              to="/"
              className="w-full flex items-center gap-2.5 text-xs text-slate-500 hover:text-slate-800 font-semibold py-2 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Retour à l'accueil</span>
            </Link>
          </div>
        </aside>

        {/* Contenu Principal Onglet */}
        <main className="flex-1 w-full overflow-hidden">
          {activeTab === 'overview' && (
            <DashboardOverview
              user={user}
              reservations={reservations}
              prescriptions={prescriptions}
              onOpenPass={(res) => setSelectedPassReservation(res)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'reservations' && (
            <OrdersView
              reservations={reservations}
              onOpenPass={(res) => setSelectedPassReservation(res)}
            />
          )}

          {activeTab === 'prescriptions' && (
            <PrescriptionsView prescriptions={prescriptions} />
          )}

          {activeTab === 'treatments' && (
            <TreatmentsView treatments={mockTreatments} />
          )}

          {activeTab === 'profile' && (
            <ProfileSettingsView user={user} />
          )}
        </main>
      </div>

      {/* Modale Pass Retrait */}
      <PickupPassModal
        reservation={selectedPassReservation}
        onClose={() => setSelectedPassReservation(null)}
      />
    </div>
  );
};

export default DashboardLayout;
