import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Image as ImageIcon,
  Layers,
  Plus,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import { CATEGORIES } from '../../data/mockArtwork';
import type { Artwork } from '../../types/artwork';
import { apiRequest } from '../../services/api';

interface NewArtworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (createdArtwork: Artwork) => void;
}

interface DraftProcessStep {
  title: string;
  description: string;
  type: 'sketch' | 'wip' | 'video';
  mediaUrl: string;
  timestamp: string;
}

const AVAILABLE_CATEGORIES = CATEGORIES.filter((cat) => cat !== 'Todas');

export default function NewArtworkModal({
  isOpen,
  onClose,
  onSuccess,
}: NewArtworkModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>(
    AVAILABLE_CATEGORIES[0] || 'Pintura'
  );
  const [technique, setTechnique] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [steps, setSteps] = useState<DraftProcessStep[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddStep = () => {
    setSteps((prev) => [
      ...prev,
      {
        title: '',
        description: '',
        type: 'sketch',
        mediaUrl: '',
        timestamp: new Date().toLocaleDateString('pt-BR'),
      },
    ]);
  };

  const handleRemoveStep = (index: number) => {
    setSteps((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleStepChange = (
    index: number,
    field: keyof DraftProcessStep,
    value: string
  ) => {
    setSteps((prev) =>
      prev.map((step, idx) =>
        idx === index ? { ...step, [field]: value } : step
      )
    );
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory(AVAILABLE_CATEGORIES[0] || 'Pintura');
    setTechnique('');
    setDimensions('');
    setPrice('');
    setImageUrl('');
    setSteps([]);
    setErrorMessage(null);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setErrorMessage(null);
    onClose();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const parsedPrice = Number(price.replace(',', '.'));
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMessage('Informe um valor válido maior que zero.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        category,
        technique: technique.trim(),
        dimensions: dimensions.trim(),
        price: parsedPrice,
        imageUrl: imageUrl.trim(),
        creativeProcess: steps.map((step, idx) => ({
          title: step.title.trim(),
          description: step.description.trim(),
          type: step.type,
          mediaUrl: step.mediaUrl.trim(),
          timestamp: step.timestamp.trim() || `Etapa ${idx + 1}`,
          order: idx,
        })),
      };

      const response = await apiRequest<{
        message: string;
        artwork: Artwork;
      }>('/artworks', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      resetForm();
      onSuccess(response.artwork);
      onClose();
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Não foi possível publicar a obra. Verifique os dados.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="framer-backdrop d-flex align-items-center justify-content-center p-3"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-artwork-modal-title"
    >
      <div
        className="bg-white rounded-4 shadow-lg border border-framer-subtle w-100 overflow-hidden d-flex flex-column"
        style={{ maxWidth: '820px', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 border-bottom border-framer-subtle d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <span className="badge rounded-pill bg-framer-surface text-framer border border-framer-subtle px-3 py-2 d-inline-flex align-items-center gap-1">
              <Sparkles size={14} />
              Publicar Nova Obra
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-sm btn-light rounded-circle p-2"
            aria-label="Fechar formulário"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column overflow-hidden flex-grow-1"
        >
          <div className="p-4 overflow-auto">
            {errorMessage && (
              <div className="alert alert-danger py-2 small mb-3" role="alert">
                {errorMessage}
              </div>
            )}

            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label small fw-semibold">
                  Título da Obra *
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: Horizonte sobre o Rio Guamá"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  minLength={2}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-semibold">
                  Categoria *
                </label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  {AVAILABLE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-5">
                <label className="form-label small fw-semibold">
                  Técnica / Materiais *
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: Acrílica sobre tela"
                  value={technique}
                  onChange={(e) => setTechnique(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-semibold">
                  Dimensões *
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: 60 x 80 cm"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label small fw-semibold">
                  Valor (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  className="form-control"
                  placeholder="450.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-semibold d-flex align-items-center gap-1">
                  <ImageIcon size={14} className="text-framer" />
                  URL da Imagem Principal da Obra *
                </label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-semibold">
                  Descrição e Conceito da Obra *
                </label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Conte a história, inspirações e detalhes da execução desta peça..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  minLength={10}
                />
              </div>
            </div>

            <hr className="my-4 border-framer-subtle" />

            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
              <div>
                <h6 className="fw-bold mb-0 d-flex align-items-center gap-1">
                  <Layers size={16} className="text-framer" />
                  Documentação do Processo Criativo (Opcional)
                </h6>
                <small className="text-secondary">
                  Adicione esboços ou registros em andamento para comprovar a
                  autoria humana.
                </small>
              </div>

              <button
                type="button"
                onClick={handleAddStep}
                className="btn btn-sm btn-framer-outline rounded-pill px-3 fw-semibold d-inline-flex align-items-center gap-1"
              >
                <Plus size={15} />
                Adicionar Etapa
              </button>
            </div>

            {steps.length === 0 ? (
              <div className="p-3 rounded-3 bg-framer-surface border border-framer-subtle text-center small text-secondary">
                Nenhuma etapa adicionada ainda. Obras com processo documentado
                recebem selo de destaque na vitrine.
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-3 border border-framer-subtle bg-light bg-opacity-50"
                  >
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="badge rounded-pill bg-framer text-white">
                        Etapa {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(index)}
                        className="btn btn-sm btn-link text-danger p-0 text-decoration-none d-inline-flex align-items-center gap-1 small"
                      >
                        <Trash2 size={14} />
                        Remover
                      </button>
                    </div>

                    <div className="row g-2">
                      <div className="col-md-5">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Título (ex: Esboço inicial a lápis)"
                          value={step.title}
                          onChange={(e) =>
                            handleStepChange(index, 'title', e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <select
                          className="form-select form-select-sm"
                          value={step.type}
                          onChange={(e) =>
                            handleStepChange(
                              index,
                              'type',
                              e.target.value as DraftProcessStep['type']
                            )
                          }
                        >
                          <option value="sketch">Esboço (Sketch)</option>
                          <option value="wip">Em andamento (WIP)</option>
                          <option value="video">Vídeo / Timelapse</option>
                        </select>
                      </div>

                      <div className="col-md-3">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Data/Hora"
                          value={step.timestamp}
                          onChange={(e) =>
                            handleStepChange(index, 'timestamp', e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="col-12">
                        <input
                          type="url"
                          className="form-control form-control-sm"
                          placeholder="URL da foto ou vídeo desta etapa (https://...)"
                          value={step.mediaUrl}
                          onChange={(e) =>
                            handleStepChange(index, 'mediaUrl', e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Breve descrição do que foi feito nesta etapa..."
                          value={step.description}
                          onChange={(e) =>
                            handleStepChange(
                              index,
                              'description',
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="px-4 py-3 bg-framer-surface border-top border-framer-subtle d-flex align-items-center justify-content-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-framer-outline rounded-pill px-4 fw-semibold"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-framer rounded-pill px-4 fw-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar na Vitrine'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}