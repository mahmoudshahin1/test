import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Shield, Eye, EyeOff } from 'lucide-react';

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!login(username, password)) {
      setError('Invalid username or password');
    }
  };

  const demoCredentials = [
    { role: 'Admin', user: 'admin', pass: 'admin123' },
    { role: 'QC Manager', user: 'qcmanager', pass: 'qc123' },
    { role: 'QC Engineer', user: 'engineer', pass: 'eng123' },
    { role: 'Operator', user: 'operator', pass: 'op123' },
    { role: 'Viewer', user: 'viewer', pass: 'view123' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d47a1] to-[#1565c0] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">QC Instruments</h1>
          <p className="text-blue-200 text-sm mt-1">Calibration Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d47a1] focus:border-transparent transition"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d47a1] focus:border-transparent transition pr-12"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#0d47a1] focus:ring-[#0d47a1]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#0d47a1] hover:bg-[#0a3680] text-white font-semibold rounded-xl transition shadow-lg shadow-blue-900/20"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <p className="text-blue-200 text-xs font-medium mb-3 uppercase tracking-wide">Demo Credentials</p>
          <div className="space-y-2">
            {demoCredentials.map(cred => (
              <button
                key={cred.user}
                onClick={() => { setUsername(cred.user); setPassword(cred.pass); }}
                className="w-full flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition text-left"
              >
                <span className="text-white/80 text-sm">{cred.role}</span>
                <span className="text-blue-200 text-xs font-mono">{cred.user} / {cred.pass}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
