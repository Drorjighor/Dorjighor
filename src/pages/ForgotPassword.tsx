import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { MailCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
  const { requestPasswordReset } = useAuth();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    await requestPasswordReset(email.trim().toLowerCase());
    setIsLoading(false);
    setSent(true);
  };

  return (
    <div className="page-shell min-h-screen bg-fab-gray-light">
      <div className="max-w-md mx-auto bg-white border border-fab-gray-medium rounded-2xl shadow-sm p-8 sm:p-10">
        <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Forgot <span className="text-fab-yellow">Password</span></h1>
        <p className="text-sm text-fab-text-muted mb-8">Enter your email and we will send password reset instructions.</p>

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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-lg bg-fab-black text-white text-xs uppercase font-black tracking-widest hover:bg-fab-yellow hover:text-fab-black transition-all disabled:opacity-60 flex items-center justify-center space-x-2"
          >
            <MailCheck size={14} />
            <span>{isLoading ? 'Sending...' : 'Send Reset Link'}</span>
          </button>
        </form>

        {sent && (
          <p className="mt-5 text-xs font-bold text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
            If an account exists for this email, reset instructions have been sent.
          </p>
        )}

        <p className="text-xs text-fab-text-muted text-center pt-5">
          Back to{' '}
          <Link to="/login" className="font-black text-fab-black hover:text-fab-yellow transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
