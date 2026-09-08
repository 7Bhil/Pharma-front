import { useState } from 'react';
import { mockPharmacies } from '../data/mockData';
import { generatePickupCode } from '../utils/codeGenerator';

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckoutSuccess }) => {
  const [selectedPharmacyId, setSelectedPharmacyId] = useState(mockPharmacies[0]?.id || 1);
  const [patientNote, setPatientNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const selectedPharmacy = mockPharmacies.find((p) => p.id === Number(selectedPharmacyId)) || mockPharmacies[0];

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // Générer un code de retrait formaté
    const formattedCode = generatePickupCode();
    setReservationCode(formattedCode);
    setIsSubmitted(true);

    if (onCheckoutSuccess) {
      onCheckoutSuccess({
        pharmacy: selectedPharmacy,
        items: cartItems,
        totalAmount,
        code: formattedCode,
        note: patientNote,
      });
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={handleReset}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold font-heading">Panier de Réservation</h2>
                <span className="text-xs text-slate-300">Retrait express en pharmacie</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Modal / Confirmation screen when submitted */}
          {isSubmitted ? (
            <div className="p-8 flex-grow flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">Réservation Validée</span>
                <h3 className="text-2xl font-extrabold text-slate-900 font-heading">Commande Envoyée !</h3>
                <p className="text-sm text-slate-600 mt-2">
                  L'équipe de <strong>{selectedPharmacy.name}</strong> prépare votre sachet nominatif.
                </p>
              </div>

              <div className="w-full bg-slate-50 border-2 border-dashed border-emerald-400/80 p-5 rounded-2xl">
                <span className="text-xs uppercase text-slate-500 font-semibold block mb-1">Votre Code Coupe-File</span>
                <div className="text-3xl font-extrabold font-heading text-emerald-700 tracking-wider">
                  {reservationCode}
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Présentez ce code au comptoir prioritaire pour retirer votre commande sans faire la queue.
                </p>
              </div>

              <div className="w-full text-xs text-left bg-slate-100/70 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Pharmacie de retrait :</span>
                  <span className="font-bold text-slate-800">{selectedPharmacy.name}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Adresse :</span>
                  <span className="font-bold text-slate-800">{selectedPharmacy.address}</span>
                </div>
                <div className="flex justify-between py-1 border-t border-slate-200 mt-2 pt-2">
                  <span className="text-slate-500 font-semibold">Total à régler au comptoir :</span>
                  <span className="font-extrabold text-emerald-700">{totalAmount.toLocaleString('fr-FR')} F CFA</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md transition-all"
              >
                Retourner à la boutique
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-grow p-6 overflow-y-auto space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 text-slate-400 space-y-3">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-slate-300">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <p className="text-sm font-medium">Votre panier de réservation est vide.</p>
                    <p className="text-xs text-slate-400">Ajoutez des médicaments depuis le catalogue.</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                            <span className="text-[11px] text-slate-500 block">{item.scientificName}</span>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                            title="Supprimer"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100 font-bold"
                            >
                              -
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-semibold text-slate-800 border-x border-slate-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100 font-bold"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-sm font-bold text-emerald-700 font-heading">
                            {(item.price * item.quantity).toLocaleString('fr-FR')} F CFA
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {cartItems.length > 0 && (
                  <div className="pt-4 border-t border-slate-200 space-y-4">
                    {/* Choix de l'officine */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Officine de retrait
                      </label>
                      <select
                        value={selectedPharmacyId}
                        onChange={(e) => setSelectedPharmacyId(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:border-emerald-600"
                      >
                        {mockPharmacies.map((pharm) => (
                          <option key={pharm.id} value={pharm.id}>
                            {pharm.name} ({pharm.distance}) • {pharm.statusText}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Note optionnelle au pharmacien */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Note pour le préparateur (Optionnel)
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Passage vers 18h30, besoin de facture..."
                        value={patientNote}
                        onChange={(e) => setPatientNote(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 font-medium">Total estimé TTC</span>
                    <span className="text-xl font-extrabold font-heading text-slate-900">
                      {totalAmount.toLocaleString('fr-FR')} F CFA
                    </span>
                  </div>

                  <button
                    onClick={handleConfirmReservation}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <span>Valider ma réservation sans avance</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    Paiement sécurisé directement au comptoir lors du retrait.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
