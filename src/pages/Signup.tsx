import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/account" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    const result = await register(name.trim(), email.trim().toLowerCase(), password);
    setIsLoading(false);

    if (!result.success) {
      setError(result.message || 'Could not create account.');
      return;
    }

    navigate('/account', { replace: true });
  };

  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-md mx-auto bg-white border border-fab-gray-medium rounded-2xl shadow-sm p-8 sm:p-10">
        <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Create <span className="text-fab-yellow">Account</span></h1>
        <p className="text-sm text-fab-text-muted mb-8">Open a new user account to track your profile and orders.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full h-12 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow"
              required
            />
          </div>

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
              placeholder="Minimum 6 characters"
              className="w-full h-12 rounded-lg border border-fab-gray-medium px-4 text-sm outline-none focus:border-fab-yellow"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-black tracking-widest mb-2 text-fab-text-muted">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
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
            <UserPlus size={14} />
            <span>{isLoading ? 'Creating...' : 'Create Account'}</span>
          </button>

          <p className="text-xs text-fab-text-muted text-center pt-1">
            Already have an account?{' '}
            <Link to="/login" className="font-black text-fab-black hover:text-fab-yellow transition-colors">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
