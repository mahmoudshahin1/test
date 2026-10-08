import { useState } from 'react';
import { mockInstruments, getInstrumentTransactions } from '../data';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, FileText, Calendar, User, Download } from 'lucide-react';

interface Props {
  instrumentId: string;
  onBack: () => void;
}

export default function CalibrationHistoryScreen({ instrumentId, onBack }: Props) {
  const instrument = mockInstruments.find(i => i.id === instrumentId);
  const transactions = getInstrumentTransactions(instrumentId);
  const [filter, setFilter] = useState<'all' | 'passed' | 'conditional' | 'failed'>('all');

  if (!instrument) return null;

  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.result === filter);

  const resultIcon = (result: string) => {
    switch (result) {
      case 'passed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'conditional': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const resultColor = (result: string) => {
    switch (result) {
      case 'passed': return 'border-green-200 bg-green-50';
      case 'conditional': return 'border-orange-200 bg-orange-50';
      case 'failed': return 'border-red-200 bg-red-50';
      default: return '';
    }
  };

  return (
    <div className="pb-24 fade-in">
      {/* Header */}
      <div className="bg-[#0d47a1] text-white px-4 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Calibration History</h1>
        </div>
        <p className="text-blue-200 text-sm">{instrument.name} ({instrument.code})</p>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['all', 'passed', 'conditional', 'failed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                filter === f
                  ? 'bg-[#0d47a1] text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              <span className="ml-1 opacity-70">
                ({f === 'all' ? transactions.length : transactions.filter(t => t.result === f).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="px-4 mt-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No calibration records found</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gray-200"></div>

            <div className="space-y-4">
              {filtered.map((tx, idx) => (
                <div key={tx.id} className="relative flex gap-4">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center ${resultColor(tx.result)}`}>
                      {resultIcon(tx.result)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">{tx.transactionCode}</p>
                        <p className="text-sm text-gray-500">{tx.calibrationDate}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tx.result === 'passed' ? 'bg-green-100 text-green-700' :
                        tx.result === 'conditional' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {tx.result.charAt(0).toUpperCase() + tx.result.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-1 mt-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-gray-500">Next due:</span>
                        <span className="text-gray-700 font-medium">{tx.nextCalibrationDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-gray-500">Performed by:</span>
                        <span className="text-gray-700">{tx.performedBy}</span>
                      </div>
                      {tx.notes && (
                        <p className="text-sm text-gray-500 mt-2 italic">"{tx.notes}"</p>
                      )}
                    </div>

                    {tx.certificateFileName && (
                      <button className="mt-3 flex items-center gap-2 px-3 py-2 bg-blue-50 text-[#0d47a1] rounded-lg text-sm font-medium hover:bg-blue-100 transition">
                        <FileText className="w-4 h-4" />
                        <span>{tx.certificateFileName}</span>
                        <Download className="w-3.5 h-3.5 ml-auto" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Export Button */}
      {filtered.length > 0 && (
        <div className="px-4 mt-6">
          <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Export History to PDF
          </button>
        </div>
      )}
    </div>
  );
}
