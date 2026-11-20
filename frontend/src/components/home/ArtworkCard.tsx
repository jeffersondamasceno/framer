import { Layers, MessageCircle, ShoppingBag } from 'lucide-react';
import type { Artwork } from '../../types/artwork';

interface ArtworkCardProps {
  artwork: Artwork;
  onOpenProcess: (artwork: Artwork) => void;
  onOpenChat: (artwork: Artwork) => void;
  onAddToCart: (artwork: Artwork) => void;
}

function ArtworkCard({
  artwork,
  onOpenProcess,
  onOpenChat,
  onAddToCart,
}: ArtworkCardProps) {
  return (
    <article className="framer-card h-100 d-flex flex-column">
      <div className="ratio ratio-4x3 position-relative overflow-hidden bg-framer-surface">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="framer-card-img w-100 h-100"
        />

        {artwork.hasDocumentedProcess && (
          <button
            type="button"
            onClick={() => onOpenProcess(artwork)}
            className="framer-card-badge-top btn btn-sm bg-white bg-opacity-95 border border-framer-subtle rounded-pill px-2.5 py-1 shadow-sm d-inline-flex align-items-center gap-1 fw-semibold text-dark"
            style={{ fontSize: '0.75rem' }}
          >
            <Layers size={13} className="text-framer" />
            <span>{artwork.creativeProcess.length} etapas registradas</span>
          </button>
        )}

        <span
          className="framer-card-badge-bottom badge rounded-pill bg-dark bg-opacity-75 text-white fw-medium px-2.5 py-1"
          style={{ fontSize: '0.72rem' }}
        >
          {artwork.category}
        </span>
      </div>

      <div className="p-3 p-md-4 d-flex flex-column flex-grow-1">
        <div className="d-flex align-items-center gap-2 mb-2">
          <img
            src={artwork.artistAvatar}
            alt={artwork.artistName}
            className="rounded-circle object-fit-cover border border-framer-subtle"
            style={{ width: '26px', height: '26px' }}
          />
          <span className="small text-secondary fw-medium text-truncate">
            {artwork.artistName}
          </span>
        </div>

        <h3 className="h5 framer-serif fw-bold mb-1">{artwork.title}</h3>
        <p className="small text-secondary mb-3 flex-grow-1">
          {artwork.technique} &bull; {artwork.dimensions}
        </p>

        <div className="pt-3 border-top border-framer-subtle d-flex align-items-center justify-content-between gap-2">
          <div>
            <small className="d-block text-secondary" style={{ fontSize: '0.7rem' }}>
              Valor da obra
            </small>
            <span className="fw-bold fs-5 text-dark">
              R$ {artwork.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <div className="d-flex align-items-center gap-1">
            <button
              type="button"
              onClick={() => onOpenProcess(artwork)}
              className="btn btn-sm btn-framer-outline rounded-pill px-2.5 fw-semibold"
              title="Ver processo criativo"
            >
              Processo
            </button>

            <button
              type="button"
              onClick={() => onOpenChat(artwork)}
              className="btn btn-sm btn-framer-outline rounded-circle p-2 d-inline-flex align-items-center justify-content-center"
              title="Enviar mensagem ao artista"
              aria-label={`Enviar mensagem para ${artwork.artistName}`}
            >
              <MessageCircle size={15} />
            </button>

            <button
              type="button"
              onClick={() => onAddToCart(artwork)}
              className="btn btn-sm btn-framer rounded-circle p-2 d-inline-flex align-items-center justify-content-center"
              title="Adicionar ao carrinho"
              aria-label={`Adicionar ${artwork.title} ao carrinho`}
            >
              <ShoppingBag size={15} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ArtworkCard;
