import type { FormEvent } from 'react';
import { X } from 'lucide-react';
import type { Artwork } from '../../types/artwork';

interface ArtistChatModalProps {
  artwork: Artwork | null;
  messages: { sender: 'user' | 'artist'; text: string }[];
  draftMessage: string;
  onDraftChange: (value: string) => void;
  onSendMessage: (e: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

function ArtistChatModal({
  artwork,
  messages,
  draftMessage,
  onDraftChange,
  onSendMessage,
  onClose,
}: ArtistChatModalProps) {
  if (!artwork) return null;

  return (
    <div
      className="framer-backdrop d-flex align-items-center justify-content-center p-3"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-4 shadow-lg border border-framer-subtle w-100 overflow-hidden"
        style={{ maxWidth: '460px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 border-bottom border-framer-subtle d-flex align-items-center justify-content-between bg-framer-surface">
          <div className="d-flex align-items-center gap-2">
            <img
              src={artwork.artistAvatar}
              alt={artwork.artistName}
              className="rounded-circle object-fit-cover"
              style={{ width: '38px', height: '38px' }}
            />
            <div>
              <h6 className="fw-bold mb-0">{artwork.artistName}</h6>
              <small className="text-secondary">Sobre: {artwork.title}</small>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-light rounded-circle p-2"
            aria-label="Fechar conversa"
          >
            <X size={16} />
          </button>
        </div>

        <div
          className="p-3 d-flex flex-column gap-2 overflow-auto"
          style={{ height: '250px', backgroundColor: '#faf8f5' }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2.5 px-3 rounded-3 small ${
                msg.sender === 'user'
                  ? 'bg-framer text-white align-self-end'
                  : 'bg-white border border-framer-subtle text-dark align-self-start'
              }`}
              style={{ maxWidth: '82%' }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <form
          onSubmit={onSendMessage}
          className="p-3 border-top border-framer-subtle d-flex gap-2 bg-white"
        >
          <input
            type="text"
            className="form-control rounded-pill shadow-none"
            placeholder="Escreva sua mensagem..."
            value={draftMessage}
            onChange={(e) => onDraftChange(e.target.value)}
          />
          <button type="submit" className="btn btn-framer rounded-pill px-4 fw-semibold">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ArtistChatModal;
