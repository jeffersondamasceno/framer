function LoginForm() {
    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
    }
    
    return (
    <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Entrar</h2>

        <div className="mb-3">
            <label htmlFor="login-email" className="form-label">E-mail</label>
            <input
                id="login-email"
                name="email"
                type="email"
                className="form-control"
                placeholder="Digite seu e-mail"
                autoComplete="email"
                required />
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
                required />
        </div>

        <a href="#" className="forgot-password">Esqueceu sua senha?</a>
    
        <button type="submit" className="btn btn-primary">Entrar</button>
    </form>
    );
}

export default LoginForm;
