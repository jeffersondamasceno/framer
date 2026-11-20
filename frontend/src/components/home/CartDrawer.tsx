import { ShoppingBag, X } from 'lucide-react';
import type { CartItem } from '../../types/artwork';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onRemoveItem: (artworkId: string) => void;
  onCheckout: () => void;
}

function CartDrawer({
  isOpen,
  items,
  total,
  onClose,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="framer-backdrop" onClick={onClose} />
      <aside
        className="framer-drawer shadow-lg"
        aria-label="Carrinho de Compras"
      >
        <div className="p-4 border-bottom border-framer-subtle d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <ShoppingBag size={20} className="text-framer" />
            <h5 className="framer-serif fw-bold mb-0">Carrinho de Compras</h5>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-light rounded-circle p-2"
            aria-label="Fechar carrinho"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 flex-grow-1 overflow-auto">
          {items.length === 0 ? (
            <div className="text-center py-5 text-secondary">
              <p className="mb-1 fw-semibold">Seu carrinho está vazio.</p>
              <small>Explore a vitrine para adicionar obras originais.</small>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {items.map((item) => (
                <div
                  key={item.artwork.id}
                  className="p-3 bg-white rounded-3 border border-framer-subtle d-flex gap-3 align-items-center"
                >
                  <img
                    src={item.artwork.imageUrl}
                    alt={item.artwork.title}
                    className="rounded-2 object-fit-cover"
                    style={{ width: '64px', height: '64px' }}
                  />
                  <div className="flex-grow-1 min-w-0">
                    <h6 className="fw-bold mb-0 text-truncate">{item.artwork.title}</h6>
                    <small className="text-secondary d-block">
                      {item.artwork.artistName}
                    </small>
                    <span className="small fw-bold text-framer">
                      {item.quantity}x R$ {item.artwork.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.artwork.id)}
                    className="btn btn-sm btn-link text-danger text-decoration-none p-1"
                    aria-label={`Remover ${item.artwork.title}`}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-top border-framer-subtle">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-secondary">Subtotal</span>
            <span className="fs-4 fw-bold">
              R$ {total.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            onClick={onCheckout}
            className="btn btn-framer w-100 rounded-pill py-2 fw-semibold"
          >
            Finalizar Compra
          </button>
        </div>
      </aside>
    </>
  );
}

export default CartDrawer;
