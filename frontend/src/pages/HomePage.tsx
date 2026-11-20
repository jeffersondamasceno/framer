import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';

import { MOCK_ARTWORKS } from '../data/mockArtwork';
import type { Artwork, CartItem } from '../types/artwork';
import HomeNavbar from '../components/home/HomeNavbar';
import HeroBanner from '../components/home/HeroBanner';
import CatalogFilters from '../components/home/CatalogFilters';
import ArtworkCard from '../components/home/ArtworkCard';
import CreativeProcessModal from '../components/home/CreativeProcessModal';
import CartDrawer from '../components/home/CartDrawer';
import ArtistChatModal from '../components/home/ArtistChatModal';
import HomeFooter from '../components/home/HomeFooter';
import '../styles/home.css';

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<'comprador' | 'artista'>('comprador');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [onlyDocumentedProcess, setOnlyDocumentedProcess] = useState<boolean>(false);

  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [cart, setCart] = useState<CartItem[]>([
    { artwork: MOCK_ARTWORKS[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [chatTarget, setChatTarget] = useState<Artwork | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { sender: 'user' | 'artist'; text: string }[]
  >([
    {
      sender: 'artist',
      text: 'Olá! Fico feliz pelo interesse na minha obra. Posso enviar mais detalhes sobre o processo ou envio!',
    },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const filteredArtworks = useMemo(() => {
    return MOCK_ARTWORKS.filter((art) => {
      const matchesSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.technique.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'Todas' || art.category === selectedCategory;
      const matchesPrice = art.price <= maxPrice;
      const matchesProcess = !onlyDocumentedProcess || art.hasDocumentedProcess;

      return matchesSearch && matchesCategory && matchesPrice && matchesProcess;
    });
  }, [searchQuery, selectedCategory, maxPrice, onlyDocumentedProcess]);

  const handleAddToCart = (artwork: Artwork) => {
    if (!isAuthenticated) {
      showToast('Faça login ou cadastre-se para adicionar obras ao carrinho.');
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.artwork.id === artwork.id);
      if (existing) {
        return prev.map((item) =>
          item.artwork.id === artwork.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { artwork, quantity: 1 }];
    });
    showToast(`"${artwork.title}" adicionada ao carrinho.`);
  };

  const handleRemoveFromCart = (artworkId: string) => {
    setCart((prev) => prev.filter((item) => item.artwork.id !== artworkId));
  };

  const handleOpenChat = (artwork: Artwork) => {
    if (!isAuthenticated) {
      showToast('Entre na sua conta para conversar diretamente com o artista.');
      return;
    }
    setChatTarget(artwork);
  };

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatHistory((prev) => [...prev, { sender: 'user', text: chatMessage }]);
    setChatMessage('');
  };

  const scrollToCatalog = () => {
    document
      .getElementById('vitrine-filtros')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.artwork.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div id="top" className="framer-page d-flex flex-column">
      {toastMessage && (
        <div
          className="position-fixed bottom-0 end-0 m-4 px-4 py-3 rounded-3 shadow-lg bg-dark text-white d-flex align-items-center gap-2"
          style={{ zIndex: 1080 }}
        >
          <CheckCircle2 size={18} className="text-success" />
          <span className="small fw-medium">{toastMessage}</span>
        </div>
      )}

      <HomeNavbar
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        searchQuery={searchQuery}
        cartCount={cartCount}
        onSearchChange={setSearchQuery}
        onLogin={() => {
          setIsAuthenticated(true);
          showToast('Sessão iniciada com sucesso!');
        }}
        onLogout={() => {
          setIsAuthenticated(false);
          showToast('Você saiu da sua conta.');
        }}
        onRoleChange={setUserRole}
        onNewArtworkClick={() =>
          showToast('Abrindo formulário de cadastro de nova obra (RF03)...')
        }
        onOpenCart={() => setIsCartOpen(true)}
      />

      <HeroBanner
        isAuthenticated={isAuthenticated}
        onExploreClick={scrollToCatalog}
        onStartSellingClick={() => {
          setIsAuthenticated(true);
          setUserRole('artista');
          showToast('Modo Artista ativado! Você já pode publicar suas obras.');
        }}
      />

      <main className="container py-5 flex-grow-1">
        <CatalogFilters
          selectedCategory={selectedCategory}
          maxPrice={maxPrice}
          onlyDocumentedProcess={onlyDocumentedProcess}
          onSelectCategory={setSelectedCategory}
          onMaxPriceChange={setMaxPrice}
          onToggleDocumentedProcess={setOnlyDocumentedProcess}
        />

        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="h4 framer-serif fw-bold mb-0">Vitrine de Obras</h2>
          <span className="small text-secondary">
            {filteredArtworks.length}{' '}
            {filteredArtworks.length === 1
              ? 'obra encontrada'
              : 'obras encontradas'}
          </span>
        </div>

        {filteredArtworks.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 border border-framer-subtle">
            <p className="fw-semibold mb-1">
              Nenhuma obra corresponde aos filtros selecionados.
            </p>
            <small className="text-secondary d-block mb-3">
              Tente ajustar a categoria ou ampliar a faixa de preço.
            </small>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todas');
                setMaxPrice(1500);
                setOnlyDocumentedProcess(false);
              }}
              className="btn btn-sm btn-framer rounded-pill px-4"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {filteredArtworks.map((artwork) => (
              <div key={artwork.id} className="col-12 col-sm-6 col-lg-3">
                <ArtworkCard
                  artwork={artwork}
                  onOpenProcess={setSelectedArtwork}
                  onOpenChat={handleOpenChat}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <CreativeProcessModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onOpenChat={handleOpenChat}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        total={cartTotal}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setCart([]);
          showToast('Pedido registrado com sucesso! Redirecionando para pagamento (RF06)...');
        }}
      />

      <ArtistChatModal
        artwork={chatTarget}
        messages={chatHistory}
        draftMessage={chatMessage}
        onDraftChange={setChatMessage}
        onSendMessage={handleSendMessage}
        onClose={() => setChatTarget(null)}
      />

      <HomeFooter />
    </div>
  );
}

export default HomePage;
