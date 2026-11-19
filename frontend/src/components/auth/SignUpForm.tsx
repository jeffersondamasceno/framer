
function SignUpForm() {
  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Criar conta</h2>

      <div className="mb-3">
        <label htmlFor="signup-name" className="form-label">Nome completo</label>
        <input
          id="signup-name"
          name="name"
          type="text"
          className="form-control"
          placeholder="Digite seu nome"
          autoComplete="name"
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
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Cadastrar
      </button>
    </form>
  );
}

export default SignUpForm;
