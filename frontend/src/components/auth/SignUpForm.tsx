import { useState } from 'react';
import { apiRequest, TOKEN_KEY, type AuthResponse } from '../../services/api';

interface SignUpFormProps {
  onSuccess?: (data: AuthResponse) => void;
}

function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const data = await apiRequest<AuthResponse>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });

      localStorage.setItem(TOKEN_KEY, data.token);

      if (onSuccess) {
        onSuccess(data);
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Criar conta</h2>

      {error && (
        <div className="alert alert-danger py-2 small" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="signup-name" className="form-label">Nome completo</label>
        <input
          id="signup-name"
          name="name"
          type="text"
          className="form-control"
          placeholder="Digite seu nome"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="signup-email" className="form-label">E-mail</label>
        <input
          id="signup-email"
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

      <div className="mb-3">
        <label htmlFor="signup-password" className="form-label">Senha</label>
        <input
          id="signup-password"
          name="password"
          type="password"
          className="form-control"
          placeholder="Digite sua senha"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
}

export default SignUpForm;