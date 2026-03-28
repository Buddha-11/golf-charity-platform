import { useState, useContext } from "react";
import { login } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await login({ email, password });
      loginUser(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Cinzel:wght@400;500&family=Raleway:wght@300;400;500&display=swap');

        .login-root {
          min-height: 100vh;
          background-color: #0a0a0a;
          background-image:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,175,55,0.12) 0%, transparent 70%),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 60px,
              rgba(212,175,55,0.018) 60px,
              rgba(212,175,55,0.018) 61px
            );
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Raleway', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .login-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* Decorative corner ornaments */
        .corner-ornament {
          position: absolute;
          width: 120px;
          height: 120px;
          opacity: 0.15;
        }
        .corner-ornament.tl { top: 24px; left: 24px; }
        .corner-ornament.br { bottom: 24px; right: 24px; transform: rotate(180deg); }

        .login-card {
          position: relative;
          width: 420px;
          padding: 0;
          animation: cardReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Outer glow border */
        .card-border {
          position: relative;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(212,175,55,0.8) 0%,
            rgba(212,175,55,0.2) 40%,
            rgba(212,175,55,0.05) 50%,
            rgba(212,175,55,0.2) 60%,
            rgba(212,175,55,0.8) 100%
          );
          border-radius: 2px;
          box-shadow:
            0 0 60px rgba(212,175,55,0.08),
            0 0 120px rgba(212,175,55,0.04),
            inset 0 0 60px rgba(212,175,55,0.02);
        }

        .card-inner {
          background: linear-gradient(160deg, #111008 0%, #0d0d0d 50%, #0a0a08 100%);
          border-radius: 2px;
          padding: 52px 48px 48px;
        }

        /* Top decorative line */
        .card-top-accent {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 36px;
        }
        .accent-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.5));
        }
        .accent-line.right {
          background: linear-gradient(90deg, rgba(212,175,55,0.5), transparent);
        }
        .accent-diamond {
          width: 6px;
          height: 6px;
          background: #d4af37;
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        .login-brand {
          text-align: center;
          margin-bottom: 10px;
        }
        .brand-icon {
          margin: 0 auto 16px;
          width: 52px;
          height: 52px;
        }
        .login-title {
          font-family: 'Cinzel', serif;
          font-size: 22px;
          font-weight: 500;
          letter-spacing: 0.18em;
          color: #d4af37;
          text-transform: uppercase;
          margin: 0 0 6px;
        }
        .login-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 300;
          color: rgba(212,175,55,0.45);
          letter-spacing: 0.08em;
          font-style: italic;
          margin: 0 0 36px;
        }

        .field-group {
          margin-bottom: 20px;
          position: relative;
          animation: fieldReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .field-group:nth-child(1) { animation-delay: 0.15s; }
        .field-group:nth-child(2) { animation-delay: 0.25s; }

        @keyframes fieldReveal {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .field-label {
          display: block;
          font-family: 'Cinzel', serif;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.22em;
          color: rgba(212,175,55,0.5);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .field-input-wrap {
          position: relative;
        }
        .field-input-wrap svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.35;
          pointer-events: none;
          transition: opacity 0.2s;
        }

        .login-input {
          width: 100%;
          background: rgba(212,175,55,0.04);
          border: 1px solid rgba(212,175,55,0.15);
          border-radius: 1px;
          padding: 13px 14px 13px 40px;
          color: #e8d48a;
          font-family: 'Raleway', sans-serif;
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 0.05em;
          outline: none;
          transition: all 0.25s ease;
          box-sizing: border-box;
        }
        .login-input::placeholder {
          color: rgba(212,175,55,0.22);
          font-style: italic;
        }
        .login-input:focus {
          border-color: rgba(212,175,55,0.55);
          background: rgba(212,175,55,0.07);
          box-shadow: 0 0 0 1px rgba(212,175,55,0.1), 0 4px 20px rgba(212,175,55,0.06);
        }
        .login-input:focus + .field-underline {
          transform: scaleX(1);
        }
        .field-input-wrap:focus-within svg {
          opacity: 0.7;
        }

        .error-msg {
          margin: 0 0 18px;
          padding: 10px 14px;
          background: rgba(220, 60, 60, 0.08);
          border: 1px solid rgba(220, 60, 60, 0.2);
          border-radius: 1px;
          color: #e07070;
          font-size: 12px;
          letter-spacing: 0.04em;
          font-family: 'Raleway', sans-serif;
          font-weight: 300;
          text-align: center;
          animation: shake 0.4s ease;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        .login-btn {
          width: 100%;
          padding: 15px;
          margin-top: 8px;
          background: linear-gradient(135deg, #c9a227 0%, #d4af37 40%, #e8c84a 60%, #c9a227 100%);
          border: none;
          border-radius: 1px;
          color: #0a0800;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(212,175,55,0.2);
          animation: fieldReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
        }
        .login-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transition: left 0.5s ease;
        }
        .login-btn:hover::before { left: 100%; }
        .login-btn:hover {
          box-shadow: 0 6px 32px rgba(212,175,55,0.38);
          transform: translateY(-1px);
        }
        .login-btn:active { transform: translateY(0); }
        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(10,8,0,0.3);
          border-top-color: #0a0800;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .card-footer {
          margin-top: 28px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .footer-line {
          flex: 1;
          height: 1px;
          background: rgba(212,175,55,0.1);
        }
        .footer-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 12px;
          color: rgba(212,175,55,0.3);
          letter-spacing: 0.08em;
          font-style: italic;
          white-space: nowrap;
        }
      `}</style>

      <div className="login-root">
        {/* Corner ornaments */}
        <svg className="corner-ornament tl" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10 L10 60 M10 10 L60 10" stroke="#d4af37" strokeWidth="1"/>
          <path d="M10 10 L40 40" stroke="#d4af37" strokeWidth="0.5"/>
          <circle cx="10" cy="10" r="3" fill="#d4af37"/>
          <path d="M25 10 L25 15 M10 25 L15 25" stroke="#d4af37" strokeWidth="0.5"/>
        </svg>
        <svg className="corner-ornament br" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10 L10 60 M10 10 L60 10" stroke="#d4af37" strokeWidth="1"/>
          <path d="M10 10 L40 40" stroke="#d4af37" strokeWidth="0.5"/>
          <circle cx="10" cy="10" r="3" fill="#d4af37"/>
        </svg>

        <div className="login-card">
          <div className="card-border">
            <div className="card-inner">
              {/* Top accent */}
              <div className="card-top-accent">
                <div className="accent-line"></div>
                <div className="accent-diamond"></div>
                <div className="accent-line right"></div>
              </div>

              {/* Brand */}
              <div className="login-brand">
                <svg className="brand-icon" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="26,4 32,18 48,18 35,28 40,44 26,35 12,44 17,28 4,18 20,18" fill="none" stroke="#d4af37" strokeWidth="1.2"/>
                  <polygon points="26,10 30,20 41,20 33,26 36,37 26,31 16,37 19,26 11,20 22,20" fill="rgba(212,175,55,0.12)" stroke="#d4af37" strokeWidth="0.5"/>
                  <circle cx="26" cy="26" r="4" fill="#d4af37" opacity="0.6"/>
                </svg>
                <h1 className="login-title">Member Access</h1>
                <p className="login-subtitle">Gold Lucky Draw & Charity Foundation</p>
              </div>

              {/* Error */}
              {error && <div className="error-msg">{error}</div>}

              {/* Fields */}
              <div className="field-group">
                <label className="field-label">Email Address</label>
                <div className="field-input-wrap">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="#d4af37">
                    <path d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zm-1.5 1L8 7.5 3.5 3h9zM2 13V4.5l6 4.5 6-4.5V13H2z"/>
                  </svg>
                  <input
                    className="login-input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Password</label>
                <div className="field-input-wrap">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="#d4af37">
                    <path d="M8 1a4 4 0 00-4 4v1H3a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1V7a1 1 0 00-1-1h-1V5a4 4 0 00-4-4zm0 1.5A2.5 2.5 0 0110.5 5v1h-5V5A2.5 2.5 0 018 2.5zM8 9a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
                  </svg>
                  <input
                    type="password"
                    className="login-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button
                className="login-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading && <span className="btn-spinner"></span>}
                {loading ? "Verifying..." : "Enter the Draw"}
              </button>

              <div className="card-footer">
                <div className="footer-line"></div>
                <span className="footer-text">Every entry changes a life</span>
                <div className="footer-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;