import {
  FileText,
  Film,
  Image as ImageIcon,
  Layers,
  MessageCircle,
  ShoppingBag,
  X,
} from 'lucide-react';
import type { Artwork } from '../../types/artwork';

interface CreativeProcessModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onOpenChat: (artwork: Artwork) => void;
  onAddToCart: (artwork: Artwork) => void;
}

function CreativeProcessModal({
  artwork,
  onClose,
  onOpenChat,
  onAddToCart,
}: CreativeProcessModalProps) {
  if (!artwork) return null;

  return (
    <div
      className="framer-backdrop d-flex align-items-center justify-content-center p-3"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-artwork-title"
    >
      <div
        className="bg-white rounded-4 shadow-lg border border-framer-subtle w-100 overflow-hidden d-flex flex-column"
        style={{ maxWidth: '900px', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 border-bottom border-framer-subtle d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <span className="badge rounded-pill bg-framer-surface text-framer border border-framer-subtle px-3 py-2 d-inline-flex align-items-center gap-1">
              <Layers size={14} />
              Documentação do Processo Criativo
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-light rounded-circle p-2"
            aria-label="Fechar janela"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 overflow-auto">
          <div className="row g-4">
            <div className="col-md-5">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-100 rounded-3 object-fit-cover border border-framer-subtle mb-3"
                style={{ maxHeight: '280px' }}
              />
              <h4 id="modal-artwork-title" className="framer-serif fw-bold mb-1">
                {artwork.title}
              </h4>
              <p className="small text-secondary mb-2">
                por <strong className="text-dark">{artwork.artistName}</strong> (
                {artwork.artistHandle})
              </p>
              <p className="small text-secondary mb-3">{artwork.description}</p>

              <div className="bg-framer-surface rounded-3 p-3 small">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-secondary">Técnica:</span>
                  <span className="fw-semibold text-end">{artwork.technique}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Dimensões:</span>
                  <span className="fw-semibold">{artwork.dimensions}</span>
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <h5 className="fw-bold mb-1">Linha do Tempo de Criação</h5>
              <p className="small text-secondary mb-3">
                Registros anexados pelo artista comprovando a execução manual da obra.
              </p>

              <div className="d-flex flex-column gap-3">
                {artwork.creativeProcess.map((step, index) => (
                  <div
                    key={step.id}
                    className="p-3 rounded-3 border border-framer-subtle bg-light bg-opacity-50"
                  >
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="badge rounded-pill bg-framer text-white">
                        Etapa {index + 1}
                      </span>
                      <span className="small text-secondary d-inline-flex align-items-center gap-1">
                        {step.type === 'sketch' && <FileText size={14} />}
                        {step.type === 'wip' && <ImageIcon size={14} />}
                        {step.type === 'video' && <Film size={14} />}
                        {step.timestamp}
                      </span>
                    </div>

                    <h6 className="fw-bold mb-1">{step.title}</h6>
                    <p className="small text-secondary mb-2">{step.description}</p>
                    <img
                      src={step.mediaUrl}
                      alt={step.title}
                      className="w-100 rounded-2 object-fit-cover"
                      style={{ height: '150px' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 bg-framer-surface border-top border-framer-subtle d-flex flex-wrap align-items-center justify-content-between gap-2">
          <div>
            <small className="text-secondary d-block">Investimento</small>
            <span className="fs-4 fw-bold">
              R$ {artwork.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenChat(artwork);
              }}
              className="btn btn-framer-outline rounded-pill px-3 fw-semibold d-inline-flex align-items-center gap-2"
            >
              <MessageCircle size={16} />
              Perguntar ao Artista
            </button>
            <button
              type="button"
              onClick={() => {
                onAddToCart(artwork);
                onClose();
              }}
              className="btn btn-framer rounded-pill px-4 fw-semibold d-inline-flex align-items-center gap-2"
            >
              <ShoppingBag size={16} />
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreativeProcessModal;
