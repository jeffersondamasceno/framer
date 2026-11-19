type AuthMode = "signup" | "login";

interface AuthSwitchProps {
    mode: AuthMode;
    onModeChange: (mode: AuthMode) => void;
}

function AuthSwitch({ mode, onModeChange }: AuthSwitchProps) {
    return (
        <div
            className="auth-switch"
            role="group"
            aria-label="Tipo de autenticação"
        >
            <button
                type="button"
                className={mode === "signup" ? "active" : ""}
                aria-pressed={mode === "signup"}
                onClick={() => onModeChange("signup")}
            >
                Cadastro
            </button>

            <button
                type="button"
                className={mode === "login" ? "active" : ""}
                aria-pressed={mode === "login"}
                onClick={() => onModeChange("login")}
            >
                Entrar
            </button>
        </div>
    )
}

export default AuthSwitch;
