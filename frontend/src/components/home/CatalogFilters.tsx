import { SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../../data/mockArtwork';

interface CatalogFiltersProps {
  selectedCategory: string;
  maxPrice: number;
  onlyDocumentedProcess: boolean;
  onSelectCategory: (category: string) => void;
  onMaxPriceChange: (price: number) => void;
  onToggleDocumentedProcess: (checked: boolean) => void;
}

function CatalogFilters({
  selectedCategory,
  maxPrice,
  onlyDocumentedProcess,
  onSelectCategory,
  onMaxPriceChange,
  onToggleDocumentedProcess,
}: CatalogFiltersProps) {
  return (
    <section id="vitrine-filtros" className="mb-4">
      <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 pb-3 border-bottom border-framer-subtle">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <span className="d-inline-flex align-items-center gap-1 text-secondary small fw-semibold me-1">
            <SlidersHorizontal size={15} />
            Categorias:
          </span>

          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`btn btn-sm rounded-pill px-3 fw-semibold ${
                  isActive ? 'btn-framer shadow-sm' : 'btn-framer-outline'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="d-flex flex-wrap align-items-center gap-4">
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="priceRange" className="small text-secondary mb-0 text-nowrap">
              Até <strong className="text-dark">R$ {maxPrice}</strong>
            </label>
            <input
              id="priceRange"
              type="range"
              className="form-range framer-range mb-0"
              style={{ width: '120px' }}
              min={100}
              max={1500}
              step={50}
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            />
          </div>

          <div className="form-check mb-0">
            <input
              id="documentedOnly"
              type="checkbox"
              className="form-check-input framer-check"
              checked={onlyDocumentedProcess}
              onChange={(e) => onToggleDocumentedProcess(e.target.checked)}
            />
            <label
              htmlFor="documentedOnly"
              className="form-check-label small fw-semibold text-dark"
            >
              Apenas com processo documentado
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CatalogFilters;
