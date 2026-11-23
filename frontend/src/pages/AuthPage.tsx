import { useState } from "react";

import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";
import AuthSwitch from "../components/auth/AuthSwitch";
import Banner from "../components/Banner/Banner";
import type { AuthResponse } from "../services/api";

import "../styles/auth.css";

type AuthMode = "signup" | "login";

interface AuthPageProps {
  initialMode?: AuthMode;
  onAuthSuccess?: (data: AuthResponse) => void;
}

function AuthPage({ initialMode = "signup", onAuthSuccess }: AuthPageProps) {
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);

  const isSignUp = authMode === "signup";

  return (
    <main className="auth-page container-fluid">
      <Banner />

      <section className="auth-container">
        <header className="auth-header">
          <h1>Bem-vindo ao Framer!</h1>
        </header>

        <AuthSwitch mode={authMode} onModeChange={setAuthMode} />

        {isSignUp ? (
          <SignUpForm onSuccess={onAuthSuccess} />
        ) : (
          <LoginForm onSuccess={onAuthSuccess} />
        )}
      </section>
    </main>
  );
}

export default AuthPage;