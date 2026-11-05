import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';

export default function Auth() {
  const [tab, setTab] = useState('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAutofillGov = () => {
    setEmail('admin@pravasa.ai');
    setPassword('admin');
    setErrorMsg('');
  };

  const handleAutofillCustomer = () => {
    setEmail('ananya@example.com');
    setPassword('password123');
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (tab === 'Sign In') {
        const data = await loginUser(email, password);
        if (data.token) {
          localStorage.setItem('pravasa_token', data.token);
          localStorage.setItem('pravasa_user', JSON.stringify(data.user));
          setSuccessMsg(`Welcome back, ${data.user.name || 'Traveller'}! Redirecting...`);
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      } else if (tab === 'Create Account') {
        const data = await registerUser(name || email.split('@')[0], email, password);
        if (data.token) {
          localStorage.setItem('pravasa_token', data.token);
          localStorage.setItem('pravasa_user', JSON.stringify(data.user));
          setSuccessMsg('Account created successfully! Redirecting...');
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      } else {
        // Reset password demo
        setSuccessMsg('Password reset instructions sent to your email.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#edece6] flex flex-col items-center justify-center p-4">
      {/* Return home link */}
      <Link to="/" className="mb-4 text-xs font-semibold text-[#1a3d2e] hover:underline flex items-center gap-1">
        <span>←</span>
        <span>Back to Pravasa AI</span>
      </Link>

      {/* Main Auth Card */}
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        {/* Brand Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-11 h-11 bg-[#1a3d2e] rounded-xl flex items-center justify-center text-white font-bold text-xl mb-3 shadow-md">
            P
          </div>
          <h2 className="text-xl font-bold text-gray-900 text-center">Sign In to Pravasa</h2>
          <p className="text-xs text-gray-500 text-center mt-1">
            Access verified trips, saved places, or gov admin portal
          </p>
        </div>

        {/* 3-way Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {['Sign In', 'Create Account', 'Reset Password'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTab(t);
                setSuccessMsg('');
                setErrorMsg('');
              }}
              className={`flex-1 pb-2.5 text-xs font-medium transition-all ${
                tab === t
                  ? 'text-[#1a3d2e] border-b-2 border-[#1a3d2e] font-semibold'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {errorMsg && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg text-center animate-in fade-in">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-xs p-3 rounded-lg text-center animate-in fade-in">
            {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'Create Account' && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ananya Sharma"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1a3d2e] focus:ring-1 focus:ring-[#1a3d2e]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1a3d2e] focus:ring-1 focus:ring-[#1a3d2e]"
            />
          </div>

          {tab !== 'Reset Password' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Password</label>
                {tab === 'Sign In' && (
                  <button
                    type="button"
                    onClick={() => {
                      setTab('Reset Password');
                      setErrorMsg('');
                    }}
                    className="text-[11px] text-gray-400 hover:text-[#1a3d2e] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 placeholder-gray-400 pr-9 focus:outline-none focus:border-[#1a3d2e] focus:ring-1 focus:ring-[#1a3d2e]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  {showPassword ? '👁️' : '👁'}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a3d2e] hover:bg-[#145236] disabled:opacity-60 text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span>{loading ? '⏳' : '→]'}</span>
            <span>
              {loading
                ? 'Processing...'
                : tab === 'Sign In'
                ? 'Sign In'
                : tab === 'Create Account'
                ? 'Create Account'
                : 'Send Reset Link'}
            </span>
          </button>
        </form>

        {/* Real-Time Database Authentication Box */}
        <div className="mt-6 pt-5 border-t border-gray-100 text-xs text-gray-600 space-y-1.5">
          <div className="flex items-center gap-1.5 text-gray-500 font-medium text-[11px]">
            <span>⊙</span>
            <span>Real-Time Database Authentication</span>
          </div>
          <div className="text-[11px] text-gray-500 pl-4 space-y-0.5">
            <p>
              Official Gov Admin: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">admin@pravasa.ai / admin</code>
            </p>
            <p>
              Customer Demo: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">ananya@example.com / password123</code>
            </p>
          </div>
          <div className="pt-1 pl-4 flex gap-3 text-[11px]">
            <button
              type="button"
              onClick={handleAutofillGov}
              className="text-[#1a3d2e] hover:underline font-semibold"
            >
              Auto-fill Gov Admin credentials
            </button>
            <span className="text-gray-300">•</span>
            <button
              type="button"
              onClick={handleAutofillCustomer}
              className="text-gray-500 hover:text-gray-700 hover:underline"
            >
              Customer Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
