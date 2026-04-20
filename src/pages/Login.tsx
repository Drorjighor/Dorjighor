import { FormEvent, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/account';

  if (isAuthenticated) {
    return <Navigate to="/account" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    const success = await login(email.trim(), password);
    setIsLoading(false);

    if (!success) {
      setError('Login failed. Please try again.');
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-md mx-auto bg-white border border-fab-gray-medium rounded-2xl shadow-sm p-8 sm:p-10">
        <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">User <span className="text-fab-yellow">Login</span></h1>
        <p className="text-sm text-fab-text-muted mb-8">Sign in to view your account details and order history.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-12 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full h-12 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow"
              required
            />
          </div>

          {error && <p className="text-xs text-red-600 font-bold">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest hover:bg-fab-yellow hover:text-fab-black transition-all disabled:opacity-60 flex items-center justify-center space-x-2"
          >
            <LogIn size={14} />
            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
          </button>

          <div className="flex items-center justify-between pt-1">
            <Link to="/forgot-password" className="text-xs font-bold text-fab-text-muted hover:text-fab-yellow transition-colors">
              Forgot password?
            </Link>
            <Link to="/signup" className="text-xs font-black text-fab-black hover:text-fab-yellow transition-colors uppercase tracking-wider">
              Open New Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
