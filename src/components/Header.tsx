import { useNavigate, useLocation } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50 shadow-xs">
      <div className="container-tight px-4 md:px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-1 hover:opacity-80 transition-opacity">
          <img
            src="/nuvepro_technologies_private_ltd_logo.jpg"
            alt="Nuvepro"
            className="h-10 w-auto object-contain"
          />
          <span className="font-bold text-xl text-slate-900">Atom8</span>
        </button>

        {!isHome && (
          <button
            onClick={() => navigate('/')}
            className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
          >
            ← Back to Home
          </button>
        )}
      </div>
    </header>
  );
}
