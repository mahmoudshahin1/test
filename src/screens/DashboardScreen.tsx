import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { getStats, mockInstruments, getCalibrationStatus, mockAuditLogs } from '../data';
import { ScanLine, Search, CheckCircle, AlertTriangle, XCircle, Clock, BarChart3, QrCode } from 'lucide-react';

interface Props {
  onScan: () => void;
  onSelectInstrument: (id: string) => void;
  onNavigate: (screen: string) => void;
}

export default function DashboardScreen({ onScan, onSelectInstrument, onNavigate }: Props) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const stats = getStats();

  const filteredInstruments = mockInstruments.filter(inst =>
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentScans = mockAuditLogs
    .filter(l => l.action === 'scan')
    .slice(0, 5);

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-[#0d47a1] text-white px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-200 text-sm">Welcome back,</p>
            <h1 className="text-xl font-bold">{user?.fullName}</h1>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold">{user?.fullName.charAt(0)}</span>
          </div>
        </div>

        {/* Scan Button */}
        <button
          onClick={onScan}
          className="w-full flex items-center justify-center gap-3 py-4 bg-white text-[#0d47a1] font-bold rounded-2xl shadow-lg hover:shadow-xl transition active:scale-[0.98]"
        >
          <ScanLine className="w-6 h-6" />
          <span className="text-lg">Scan QR Code</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500 font-medium">Total</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            <p className="text-xs text-gray-400">Instruments</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-600 font-medium">Valid</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.valid}</p>
            <p className="text-xs text-gray-400">Calibrated</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-orange-600 font-medium">Expiring</span>
            </div>
            <p className="text-2xl font-bold text-orange-500">{stats.expiring}</p>
            <p className="text-xs text-gray-400">Within 30 days</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-red-100">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-xs text-red-600 font-medium">Overdue</span>
            </div>
            <p className="text-2xl font-bold text-red-500">{stats.overdue}</p>
            <p className="text-xs text-gray-400">Need calibration</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Quick Actions</h2>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('instruments')}
            className="flex-1 flex flex-col items-center gap-2 py-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#0d47a1] transition"
          >
            <QrCode className="w-6 h-6 text-[#0d47a1]" />
            <span className="text-xs font-medium text-gray-700">All Instruments</span>
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className="flex-1 flex flex-col items-center gap-2 py-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#0d47a1] transition"
          >
            <BarChart3 className="w-6 h-6 text-[#0d47a1]" />
            <span className="text-xs font-medium text-gray-700">Reports</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mt-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search instruments..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d47a1] focus:border-transparent"
          />
        </div>
      </div>

      {/* Instrument List */}
      <div className="px-4 mt-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Instruments ({filteredInstruments.length})
        </h2>
        <div className="space-y-2">
          {filteredInstruments.slice(0, 10).map(inst => {
            const { status, daysUntil } = getCalibrationStatus(inst.id);
            const statusColors = {
              valid: 'bg-green-100 text-green-700',
              expiring: 'bg-orange-100 text-orange-700',
              overdue: 'bg-red-100 text-red-700',
            };
            const statusLabels = {
              valid: 'Valid',
              expiring: 'Expiring',
              overdue: 'Overdue',
            };
            return (
              <button
                key={inst.id}
                onClick={() => onSelectInstrument(inst.id)}
                className="w-full flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#0d47a1] transition text-left"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-[#0d47a1]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{inst.name}</p>
                  <p className="text-xs text-gray-500">{inst.code} • {inst.manufacturer}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
                    {statusLabels[status]}
                  </span>
                  {status !== 'overdue' && (
                    <p className="text-xs text-gray-400 mt-1">{daysUntil}d left</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {filteredInstruments.length > 10 && (
          <button
            onClick={() => onNavigate('instruments')}
            className="w-full mt-3 py-3 text-center text-[#0d47a1] font-medium text-sm"
          >
            View All Instruments →
          </button>
        )}
      </div>

      {/* Recent Activity */}
      <div className="px-4 mt-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
          {recentScans.map(log => {
            const inst = mockInstruments.find(i => i.id === log.instrumentId);
            return (
              <div key={log.id} className="flex items-center gap-3 p-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{inst?.name || 'Unknown'}</p>
                  <p className="text-xs text-gray-400">{new Date(log.timestamp).toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
