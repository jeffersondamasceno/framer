import { useState } from "react";

import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";

import "../styles/auth.css"
import Banner from "../components/Banner/Banner";

type AuthMode = "signup" | "login";

function AuthPage() {
    const [authMode, setAuthMode] = useState<AuthMode>("signup");

    const isSignUp = authMode === "signup";

    return (
        <main className="auth-page container-fluid">
            <Banner />
            
            <section className="auth-container">
                <header className="auth-header">
                    <h1>Bem-vindo ao Framer!</h1>
                </header>

                <div
                    className="auth-switch"
                    role="group"
                    aria-label="Tipo de autenticação" >
                        <button
                            type="button"
                            className={isSignUp ? "active" : ""}
                            aria-pressed={isSignUp}
                            onClick={() => setAuthMode("signup")}
                        >
                            Cadastro
                        </button>

                        <button
                            type="button"
                            className={!isSignUp ? "active" : ""}
                            aria-pressed={!isSignUp}
                            onClick={() => setAuthMode("login")}
                        >
                            Entrar
                        </button>
                </div>

                {isSignUp ? <SignUpForm /> : <LoginForm />}
            </section>
        </main>
    )
}

export default AuthPage;
