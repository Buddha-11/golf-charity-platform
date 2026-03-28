import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Raleway:wght@300;400;500&family=Cormorant+Garamond:ital,wght@1,300&display=swap');

        .navbar-root {
          position: sticky;
          top: 0;
          z-index: 100;
          font-family: 'Raleway', sans-serif;
          transition: all 0.4s ease;
        }

        /* Scrolled state: more opaque, shadow */
        .navbar-root.scrolled .navbar-inner {
          background: rgba(8, 7, 3, 0.97);
          box-shadow: 0 4px 40px rgba(0,0,0,0.6), 0 1px 0 rgba(212,175,55,0.15);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 68px;
          background: rgba(8, 7, 3, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212,175,55,0.12);
          transition: all 0.4s ease;
          position: relative;
        }

        /* Subtle top gold line */
        .navbar-inner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.6) 30%, rgba(212,175,55,0.6) 70%, transparent 100%);
        }

        /* Brand / Logo */
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .brand-emblem {
          width: 34px;
          height: 34px;
          flex-shrink: 0;
        }
        .brand-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .brand-name {
          font-family: 'Cinzel', serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: #d4af37;
          line-height: 1;
          text-transform: uppercase;
        }
        .brand-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 10px;
          font-weight: 300;
          font-style: italic;
          color: rgba(212,175,55,0.42);
          letter-spacing: 0.12em;
          line-height: 1;
        }

        /* Center divider ornament */
        .navbar-divider {
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0.25;
        }
        .divider-line {
          width: 50px;
          height: 1px;
          background: #d4af37;
        }
        .divider-diamond {
          width: 5px;
          height: 5px;
          background: #d4af37;
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        /* Nav links */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-link {
          position: relative;
          text-decoration: none;
          color: rgba(212,175,55,0.55);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 8px 14px;
          transition: color 0.25s ease;
          white-space: nowrap;
          font-family: 'Cinzel', serif;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 14px;
          right: 14px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #d4af37;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
        }
        .nav-link.active {
          color: #e8c84a;
        }

        /* Separator dots between links */
        .nav-sep {
          width: 3px;
          height: 3px;
          background: rgba(212,175,55,0.2);
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        /* Logout button */
        .logout-btn {
          position: relative;
          background: transparent;
          border: 1px solid rgba(212,175,55,0.2);
          color: rgba(212,175,55,0.5);
          font-family: 'Cinzel', serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 7px 16px;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
          overflow: hidden;
        }
        .logout-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(212,175,55,0.05);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        .logout-btn:hover {
          border-color: rgba(180,50,50,0.5);
          color: #e07070;
        }
        .logout-btn:hover::before {
          background: rgba(180,50,50,0.06);
          transform: scaleX(1);
        }

        /* User greeting */
        .user-greeting {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 8px;
        }
        .user-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(212,175,55,0.3);
          background: rgba(212,175,55,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          color: #d4af37;
          flex-shrink: 0;
        }

        /* Mobile hamburger */
        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          flex-direction: column;
          gap: 5px;
        }
        .hamburger-btn span {
          display: block;
          width: 22px;
          height: 1px;
          background: #d4af37;
          transition: all 0.3s ease;
        }
        .hamburger-btn.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .hamburger-btn.open span:nth-child(2) { opacity: 0; }
        .hamburger-btn.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        /* Mobile menu */
        .mobile-menu {
          display: none;
          flex-direction: column;
          padding: 16px 24px 24px;
          background: rgba(8,7,3,0.98);
          border-top: 1px solid rgba(212,175,55,0.08);
          border-bottom: 1px solid rgba(212,175,55,0.08);
          gap: 4px;
        }
        .mobile-menu.open { display: flex; }

        .mobile-nav-link {
          text-decoration: none;
          color: rgba(212,175,55,0.5);
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 12px 0;
          border-bottom: 1px solid rgba(212,175,55,0.06);
          transition: color 0.2s;
        }
        .mobile-nav-link:last-child { border-bottom: none; }
        .mobile-nav-link:hover, .mobile-nav-link.active { color: #d4af37; }

        .mobile-logout {
          background: none;
          border: none;
          color: rgba(200,80,80,0.6);
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 12px 0;
          cursor: pointer;
          text-align: left;
          transition: color 0.2s;
        }
        .mobile-logout:hover { color: #e07070; }

        @media (max-width: 768px) {
          .navbar-inner { padding: 0 20px; }
          .navbar-links, .navbar-divider { display: none; }
          .hamburger-btn { display: flex; }
          .brand-tagline { display: none; }
        }
      `}</style>

      <nav className={`navbar-root${scrolled ? " scrolled" : ""}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <svg className="brand-emblem" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon
                points="17,2 21,12 32,12 23,19 26,30 17,24 8,30 11,19 2,12 13,12"
                fill="rgba(212,175,55,0.1)"
                stroke="#d4af37"
                strokeWidth="1"
              />
              <polygon
                points="17,7 19.5,14 27,14 21,18 23,25 17,21.5 11,25 13,18 7,14 14.5,14"
                fill="rgba(212,175,55,0.06)"
                stroke="#d4af37"
                strokeWidth="0.4"
                strokeDasharray="1 1"
              />
              <circle cx="17" cy="17" r="2.5" fill="#d4af37" opacity="0.7" />
            </svg>
            <div className="brand-text">
              <span className="brand-name">Gold Draw</span>
              <span className="brand-tagline">Charity Foundation</span>
            </div>
          </Link>

          {/* Center ornament */}
          <div className="navbar-divider">
            <div className="divider-line"></div>
            <div className="divider-diamond"></div>
            <div className="divider-line"></div>
          </div>

          {/* Desktop Nav Links */}
          <div className="navbar-links">
            <Link to="/" className={`nav-link${isActive("/") ? " active" : ""}`}>Home</Link>
            <div className="nav-sep"></div>
            <Link to="/charities" className={`nav-link${isActive("/charities") ? " active" : ""}`}>Charities</Link>

            {user && (
              <>
                <div className="nav-sep"></div>
                <Link to="/dashboard" className={`nav-link${isActive("/dashboard") ? " active" : ""}`}>Dashboard</Link>
                <div className="nav-sep"></div>
                <Link to="/results" className={`nav-link${isActive("/results") ? " active" : ""}`}>Results</Link>
              </>
            )}

            <div className="nav-sep"></div>

            {!user ? (
              <Link to="/login" className={`nav-link${isActive("/login") ? " active" : ""}`}>Sign In</Link>
            ) : (
              <div className="user-greeting">
                <div className="user-avatar">
                  {user.name ? user.name[0].toUpperCase() : "M"}
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                  Leave
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={`hamburger-btn${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          <Link to="/" className={`mobile-nav-link${isActive("/") ? " active" : ""}`}>Home</Link>
          <Link to="/charities" className={`mobile-nav-link${isActive("/charities") ? " active" : ""}`}>Charities</Link>
          {user && <Link to="/dashboard" className={`mobile-nav-link${isActive("/dashboard") ? " active" : ""}`}>Dashboard</Link>}
          {user && <Link to="/results" className={`mobile-nav-link${isActive("/results") ? " active" : ""}`}>Results</Link>}
          {!user
            ? <Link to="/login" className={`mobile-nav-link${isActive("/login") ? " active" : ""}`}>Sign In</Link>
            : <button className="mobile-logout" onClick={handleLogout}>Leave / Sign Out</button>
          }
        </div>
      </nav>
    </>
  );
}

export default Navbar;