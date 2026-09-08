
const MedicineCard = ({ medicine }) => {
  const isLowStock = medicine.stock < 30;

  return (
    <div className="medicine-card">
      <div className="card-image-wrapper">
        <img src={medicine.imageUrl} alt={medicine.name} loading="lazy" />
        <span className="category-pill">{medicine.category}</span>
        {isLowStock ? (
          <span className="stock-pill stock-low">Stock limité ({medicine.stock})</span>
        ) : (
          <span className="stock-pill stock-ok">En stock ({medicine.stock})</span>
        )}
      </div>

      <div className="card-body">
        <div className="card-header-info">
          <span className="scientific-badge">{medicine.scientificName}</span>
          <h3 className="med-title">{medicine.name}</h3>
        </div>

        <p className="med-desc">{medicine.description}</p>

        <div className="card-footer">
          <div className="price-tag">
            <span className="price-val">{medicine.price.toLocaleString('fr-FR')} F CFA</span>
            <span className="price-sub">Prix indicatif TTC</span>
          </div>
          
          <button className="btn btn-reserve" title="Réserver en pharmacie">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span>Réserver</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .medicine-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .medicine-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: #cbd5e1;
        }

        .card-image-wrapper {
          position: relative;
          height: 180px;
          background: var(--bg-subtle);
          overflow: hidden;
        }

        .card-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .medicine-card:hover .card-image-wrapper img {
          transform: scale(1.04);
        }

        .category-pill {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: white;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          letter-spacing: 0.02em;
        }

        .stock-pill {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .stock-ok {
          background: rgba(236, 253, 245, 0.95);
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .stock-low {
          background: rgba(254, 243, 199, 0.95);
          color: #92400e;
          border: 1px solid #fde68a;
        }

        .card-body {
          padding: 1.25rem 1.4rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-header-info {
          margin-bottom: 0.5rem;
        }

        .scientific-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.25rem;
        }

        .med-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.25rem;
        }

        .med-desc {
          font-size: 0.86rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
        }

        .price-tag {
          display: flex;
          flex-direction: column;
        }

        .price-val {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-main);
          font-family: var(--font-heading);
          letter-spacing: -0.02em;
        }

        .price-sub {
          font-size: 0.68rem;
          color: var(--text-subtle);
        }

        .btn-reserve {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          border-radius: var(--radius-md);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
      `}</style>
    </div>
  );
};

export default MedicineCard;
