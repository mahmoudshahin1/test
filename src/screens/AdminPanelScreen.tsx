import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { mockInstruments, getCalibrationStatus, mockUsers, mockAuditLogs } from '../data';
import { ArrowLeft, Users, QrCode, FileText, Settings, Search, Shield, Activity } from 'lucide-react';

interface Props {
  onBack: () => void;
  onSelectInstrument: (id: string) => void;
}

export default function AdminPanelScreen({ onBack, onSelectInstrument }: Props) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'instruments' | 'users' | 'audit'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  if (user?.role !== 'admin') {
    return (
      <div className="p-8 text-center">
        <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-700">Access Denied</h2>
        <p className="text-gray-500 mt-2">Admin privileges required</p>
        <button onClick={onBack} className="mt-4 text-[#0d47a1] font-medium">Go Back</button>
      </div>
    );
  }

  const filteredInstruments = mockInstruments.filter(inst =>
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-24 fade-in">
      {/* Header */}
      <div className="bg-[#0d47a1] text-white px-4 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>
        <p className="text-blue-200 text-sm">System management & configuration</p>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-4">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {[
            { key: 'overview', label: 'Overview', icon: Activity },
            { key: 'instruments', label: 'Instruments', icon: QrCode },
            { key: 'users', label: 'Users', icon: Users },
            { key: 'audit', label: 'Audit Log', icon: FileText },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 flex items-center justify-center gap-1 py-2.5 rounded-lg text-xs font-medium transition ${
                activeTab === tab.key ? 'bg-white text-[#0d47a1] shadow-sm' : 'text-gray-500'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-4">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'instruments' && (
          <InstrumentsTab instruments={filteredInstruments} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSelect={onSelectInstrument} />
        )}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'audit' && <AuditTab />}
      </div>
    </div>
  );
}

function OverviewTab() {
  const total = mockInstruments.length;
  const valid = mockInstruments.filter(i => getCalibrationStatus(i.id).status === 'valid').length;
  const expiring = mockInstruments.filter(i => getCalibrationStatus(i.id).status === 'expiring').length;
  const overdue = mockInstruments.filter(i => getCalibrationStatus(i.id).status === 'overdue').length;
  const users = mockUsers.length;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-3">System Overview</h3>
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Total Instruments" value={total} color="blue" />
          <StatCard label="Active Users" value={users} color="purple" />
          <StatCard label="Valid Calibrations" value={valid} color="green" />
          <StatCard label="Expiring Soon" value={expiring} color="orange" />
          <StatCard label="Overdue" value={overdue} color="red" />
          <StatCard label="Compliance Rate" value={`${Math.round((valid / total) * 100)}%`} color="blue" />
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-3">Department Distribution</h3>
        <div className="space-y-2">
          {['QC Lab', 'Production', 'Testing', 'HSE', 'Maintenance'].map(dept => {
            const count = mockInstruments.filter(i => i.department === dept).length;
            const pct = (count / mockInstruments.length) * 100;
            return (
              <div key={dept} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-24">{dept}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-[#0d47a1] h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                </div>
                <span className="text-sm font-medium text-gray-700 w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function InstrumentsTab({ instruments, searchQuery, setSearchQuery, onSelect }: any) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e: any) => setSearchQuery(e.target.value)}
          placeholder="Search instruments..."
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d47a1]"
        />
      </div>

      <div className="space-y-2">
        {instruments.map((inst: any) => {
          const { status, daysUntil } = getCalibrationStatus(inst.id);
          return (
            <button
              key={inst.id}
              onClick={() => onSelect(inst.id)}
              className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-[#0d47a1] transition text-left"
            >
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <QrCode className="w-4 h-4 text-[#0d47a1]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{inst.name}</p>
                <p className="text-xs text-gray-500">{inst.code}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                status === 'valid' ? 'bg-green-100 text-green-700' :
                status === 'expiring' ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
              }`}>
                {status === 'valid' ? `${daysUntil}d` : status === 'expiring' ? `${daysUntil}d` : 'Overdue'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function UsersTab() {
  return (
    <div className="space-y-2">
      {mockUsers.map(u => (
        <div key={u.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-[#0d47a1]">{u.fullName.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{u.fullName}</p>
            <p className="text-xs text-gray-500">{u.department} • @{u.username}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
            u.role === 'qc_manager' ? 'bg-blue-100 text-blue-700' :
            u.role === 'qc_engineer' ? 'bg-cyan-100 text-cyan-700' :
            u.role === 'operator' ? 'bg-gray-100 text-gray-700' :
            'bg-gray-50 text-gray-500'
          }`}>
            {u.role.replace('_', ' ')}
          </span>
        </div>
      ))}
    </div>
  );
}

function AuditTab() {
  return (
    <div className="space-y-2">
      {mockAuditLogs.map(log => {
        const user = mockUsers.find(u => u.id === log.userId);
        const inst = mockInstruments.find(i => i.id === log.instrumentId);
        return (
          <div key={log.id} className="p-3 bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-800">{user?.fullName}</span>
              <span className="text-xs text-gray-400">{new Date(log.timestamp).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-gray-600">{log.details}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">{log.action}</span>
              {inst && <span className="text-xs text-gray-400">{inst.code}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: any; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    orange: 'bg-orange-50 text-orange-700',
    red: 'bg-red-50 text-red-700',
    purple: 'bg-purple-50 text-purple-700',
  };
  return (
    <div className={`rounded-lg p-3 ${colors[color]}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs opacity-70">{label}</p>
    </div>
  );
}
