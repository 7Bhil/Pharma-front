import MedicineCard from './MedicineCard';

const MedicineList = ({ medicines }) => {
  if (medicines.length === 0) {
    return (
      <div className="no-results">
        <p>Aucun médicament trouvé pour votre recherche.</p>
        <style jsx>{`
          .no-results {
            text-align: center;
            padding: 3rem;
            color: var(--text-muted);
            grid-column: 1 / -1;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="medicine-grid">
      {medicines.map((medicine) => (
        <MedicineCard key={medicine.id} medicine={medicine} />
      ))}
    </div>
  );
};

export default MedicineList;
