import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Home } from 'lucide-react';

// Simple Router
enum Route {
  HOME = 'HOME',
  ADMIN = 'ADMIN',
  LOGIN = 'LOGIN'
}

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>(Route.HOME);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('portal') === 'admin') {
      setCurrentRoute(Route.LOGIN);
    }
  }, []);

  const navigate = (route: Route) => {
    setCurrentRoute(route);
    // Optional: Scroll to top on route change
    window.scrollTo(0, 0);
  };

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAdminAuthenticated(true);
      navigate(Route.ADMIN);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 font-sans selection:bg-gold-500 selection:text-black">
       {/* Floating Nav for Demo purposes */}
      <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="pointer-events-auto">
               <button 
                 onClick={() => navigate(Route.HOME)} 
                 className="font-serif font-bold text-xl tracking-tighter text-white hover:text-gold-400 transition-colors focus:outline-none"
               >
                  TradSolution<span className="text-gold-500">.</span>
               </button>
            </div>
            <div className="pointer-events-auto flex gap-4">
                {currentRoute === Route.ADMIN && (
                     <button 
                        onClick={() => navigate(Route.HOME)} 
                        className="text-sm font-medium text-gray-400 hover:text-white flex items-center gap-2 transition-colors focus:outline-none"
                     >
                        <Home className="w-4 h-4" /> Exit Admin
                    </button>
                )}
            </div>
        </div>
      </nav>

      <main>
        {currentRoute === Route.HOME && <LandingPage />}
        {currentRoute === Route.LOGIN && <AdminLogin onLogin={handleLogin} />}
        {currentRoute === Route.ADMIN && isAdminAuthenticated && <AdminDashboard />}
        {currentRoute === Route.ADMIN && !isAdminAuthenticated && <AdminLogin onLogin={handleLogin} />}
      </main>
    </div>
  );
};

// Admin Login Component
const AdminLogin: React.FC<{ onLogin: (success: boolean) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulation
    setTimeout(() => {
      if (email === 'admin@tradsolution.com' && password === 'krikucis') {
        onLogin(true);
      } else {
        alert('Invalid credentials.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 relative overflow-hidden">
       {/* Ambient Background */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-600/10 rounded-full blur-[120px]" />

      <div className="glass p-10 rounded-3xl w-full max-w-md relative z-10 border border-white/5 shadow-2xl">
        <div className="mb-8 text-center">
             <h2 className="font-serif text-3xl font-medium text-white mb-2">Admin Portal</h2>
             <p className="text-gray-400 text-sm">Authorized personnel only.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50 transition-colors"
              placeholder="admin@tradsolution.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50 transition-colors"
              placeholder="•••••"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold rounded-xl py-3 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;