import { LogOut, Plus, Search, ShoppingBag, User } from 'lucide-react';

interface HomeNavbarProps {
  isAuthenticated: boolean;
  userRole: 'comprador' | 'artista';
  searchQuery: string;
  cartCount: number;
  onSearchChange: (value: string) => void;
  onLogin: () => void;
  onLogout: () => void;
  onRoleChange: (role: 'comprador' | 'artista') => void;
  onNewArtworkClick: () => void;
  onOpenCart: () => void;
}

function HomeNavbar({
  isAuthenticated,
  userRole,
  searchQuery,
  cartCount,
  onSearchChange,
  onLogin,
  onLogout,
  onRoleChange,
  onNewArtworkClick,
  onOpenCart,
}: HomeNavbarProps) {
  return (
    <header className="sticky-top framer-navbar">
      <div className="container py-2 py-md-3">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <a href="#top" className="text-decoration-none d-flex flex-column lh-1">
            <span className="framer-script text-framer fs-2">Framer</span>
            <small
              className="text-uppercase text-secondary mt-1"
              style={{ fontSize: '0.65rem', letterSpacing: '0.16em' }}
            >
              Arte &amp; Artesanato
            </small>
          </a>

          <div className="d-none d-md-block flex-grow-1 mx-lg-4" style={{ maxWidth: '460px' }}>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-secondary rounded-start-pill ps-3">
                <Search size={16} />
              </span>
              <input
                type="search"
                className="form-control border-start-0 rounded-end-pill shadow-none"
                placeholder="Buscar obras, artistas ou técnicas..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Buscar obras, artistas ou técnicas"
              />
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            {!isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={onLogin}
                  className="btn btn-sm btn-framer-outline rounded-pill px-3 fw-semibold"
                >
                  Entrar
                </button>
                <button
                  type="button"
                  onClick={onLogin}
                  className="btn btn-sm btn-framer rounded-pill px-3 fw-semibold"
                >
                  Cadastrar
                </button>
              </>
            ) : (
              <>
                <div
                  className="btn-group btn-group-sm d-none d-sm-inline-flex bg-framer-surface p-1 rounded-pill border border-framer-subtle"
                  role="group"
                  aria-label="Alternar perfil de visualização"
                >
                  <button
                    type="button"
                    onClick={() => onRoleChange('comprador')}
                    className={`btn btn-sm rounded-pill px-3 fw-semibold border-0 ${
                      userRole === 'comprador' ? 'bg-white text-dark shadow-sm' : 'text-secondary'
                    }`}
                  >
                    Comprador
                  </button>
                  <button
                    type="button"
                    onClick={() => onRoleChange('artista')}
                    className={`btn btn-sm rounded-pill px-3 fw-semibold border-0 ${
                      userRole === 'artista' ? 'btn-framer shadow-sm' : 'text-secondary'
                    }`}
                  >
                    Artista
                  </button>
                </div>

                {userRole === 'artista' && (
                  <button
                    type="button"
                    onClick={onNewArtworkClick}
                    className="btn btn-sm btn-framer rounded-pill px-3 fw-semibold d-inline-flex align-items-center gap-1"
                  >
                    <Plus size={16} />
                    <span className="d-none d-lg-inline">Publicar Obra</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onOpenCart}
                  className="btn btn-sm btn-framer-outline rounded-pill position-relative p-2 d-inline-flex align-items-center justify-content-center"
                  aria-label="Abrir carrinho de compras"
                >
                  <ShoppingBag size={18} />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-framer">
                      {cartCount}
                    </span>
                  )}
                </button>

                <div className="d-flex align-items-center gap-1 ps-2 border-start border-framer-subtle">
                  <span
                    className="rounded-circle bg-framer-surface border border-framer-subtle d-inline-flex align-items-center justify-content-center"
                    style={{ width: '34px', height: '34px' }}
                    title="Perfil do usuário"
                  >
                    <User size={16} />
                  </span>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="btn btn-sm btn-link text-secondary p-1"
                    title="Sair da conta"
                    aria-label="Sair da conta"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="d-md-none mt-2">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-white border-end-0 text-secondary rounded-start-pill ps-3">
              <Search size={14} />
            </span>
            <input
              type="search"
              className="form-control border-start-0 rounded-end-pill shadow-none"
              placeholder="Buscar obras, artistas ou técnicas..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HomeNavbar;
