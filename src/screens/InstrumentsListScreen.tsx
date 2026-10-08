import { useState } from 'react';
import { mockInstruments, getCalibrationStatus } from '../data';
import { ArrowLeft, Search, QrCode, Filter } from 'lucide-react';

interface Props {
  onBack: () => void;
  onSelectInstrument: (id: string) => void;
}

export default function InstrumentsListScreen({ onBack, onSelectInstrument }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'valid' | 'expiring' | 'overdue'>('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const types = [...new Set(mockInstruments.map(i => i.type))];

  const filtered = mockInstruments.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const { status } = getCalibrationStatus(inst.id);
    const matchesStatus = statusFilter === 'all' || status === statusFilter;
    const matchesType = typeFilter === 'all' || inst.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="pb-24 fade-in">
      {/* Header */}
      <div className="bg-[#0d47a1] text-white px-4 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">All Instruments</h1>
        </div>
        <p className="text-blue-200 text-sm">{mockInstruments.length} instruments registered</p>
      </div>

      {/* Search & Filters */}
      <div className="px-4 mt-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, code, or manufacturer..."
            className="w-full pl-9 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d47a1]"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            {(['all', 'valid', 'expiring', 'overdue'] as const).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition ${
                  statusFilter === s ? 'bg-white text-[#0d47a1] shadow-sm' : 'text-gray-500'
                }`}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d47a1]"
        >
          <option value="all">All Types</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Results Count */}
      <div className="px-4 mt-4">
        <p className="text-sm text-gray-500">{filtered.length} instruments found</p>
      </div>

      {/* Instrument List */}
      <div className="px-4 mt-2 space-y-2">
        {filtered.map(inst => {
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
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <QrCode className="w-5 h-5 text-[#0d47a1]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate text-sm">{inst.name}</p>
                <p className="text-xs text-gray-500">{inst.code} • {inst.manufacturer} {inst.model}</p>
                <p className="text-xs text-gray-400">{inst.location}</p>
              </div>
              <div className="text-right flex-shrink-0">
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
    </div>
  );
}
