import { ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  isAuthenticated: boolean;
  onExploreClick: () => void;
  onStartSellingClick: () => void;
}

function HeroBanner({
  isAuthenticated,
  onExploreClick,
  onStartSellingClick,
}: HeroBannerProps) {
  return (
    <section className="framer-hero py-5">
      <div className="container py-md-3">
        <div className="row align-items-center">
          <div className="col-lg-9 col-xl-8">
            <h1 className="display-5 fw-bold mb-3" style={{ lineHeight: 1.15 }}>
              <span className="framer-script text-framer d-block display-3 mb-1">
                Framer
              </span>
              <span className="framer-serif">
                Arte original com história, autoria e processo visível.
              </span>
            </h1>

            <p className="lead text-secondary mb-4" style={{ maxWidth: '640px' }}>
              Explore obras únicas e peças artesanais diretamente de artistas independentes.
              Acompanhe esboços, registros e etapas de criação antes de comprar.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onExploreClick}
                className="btn btn-framer btn-lg rounded-pill px-4 fs-6 fw-semibold d-inline-flex align-items-center gap-2"
              >
                Explorar Vitrine
                <ArrowRight size={18} />
              </button>

              {!isAuthenticated && (
                <button
                  type="button"
                  onClick={onStartSellingClick}
                  className="btn btn-framer-outline btn-lg rounded-pill px-4 fs-6 fw-semibold"
                >
                  Começar a Vender
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
