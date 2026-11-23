import { useState } from 'react';
import { apiRequest, TOKEN_KEY, type AuthResponse } from '../../services/api';

interface LoginFormProps {
  onSuccess?: (data: AuthResponse) => void;
}

function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setInfoMessage(null);
    setIsLoading(true);

    try {
      const data = await apiRequest<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem(TOKEN_KEY, data.token);

      if (onSuccess) {
        onSuccess(data);
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao entrar.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleForgotPassword(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setError(null);
    setInfoMessage(null);

    if (!email.trim()) {
      setError('Digite seu e-mail acima antes de clicar em "Esqueceu sua senha?".');
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiRequest<{ message: string }>('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      setInfoMessage(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao solicitar recuperação.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Entrar</h2>

      {error && (
        <div className="alert alert-danger py-2 small" role="alert">
          {error}
        </div>
      )}

      {infoMessage && (
        <div className="alert alert-info py-2 small" role="alert">
          {infoMessage}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="login-email" className="form-label">E-mail</label>
        <input
          id="login-email"
          name="email"
          type="email"
          className="form-control"
          placeholder="Digite seu e-mail"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="login-password" className="form-label">Senha</label>
        <input
          id="login-password"
          name="password"
          type="password"
          className="form-control"
          placeholder="Digite sua senha"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <a href="#" className="forgot-password" onClick={handleForgotPassword}>
        Esqueceu sua senha?
      </a>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}

export default LoginForm;