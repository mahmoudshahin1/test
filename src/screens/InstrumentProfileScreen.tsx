import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { mockInstruments, getCalibrationStatus, getInstrumentTransactions } from '../data';
import { 
  ArrowLeft, CheckCircle, AlertTriangle, XCircle, Calendar, MapPin, User, 
  Factory, Hash, Clock, FileText, History, QrCode, Edit, Plus, Download
} from 'lucide-react';

interface Props {
  instrumentId: string;
  onBack: () => void;
  onViewHistory: () => void;
  onRecordCalibration: () => void;
  onGenerateQR: () => void;
}

export default function InstrumentProfileScreen({ instrumentId, onBack, onViewHistory, onRecordCalibration, onGenerateQR }: Props) {
  const { user, hasPermission } = useAuth();
  const instrument = mockInstruments.find(i => i.id === instrumentId);
  const [showDetails, setShowDetails] = useState(false);

  if (!instrument) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">Instrument not found</p>
        <button onClick={onBack} className="mt-4 text-[#0d47a1] font-medium">Go Back</button>
      </div>
    );
  }

  const { status, nextDate, daysUntil } = getCalibrationStatus(instrument.id);
  const transactions = getInstrumentTransactions(instrument.id);
  const latestTx = transactions[0];

  const statusConfig = {
    valid: { color: 'bg-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-200', textColor: 'text-green-700', icon: CheckCircle, label: 'Valid' },
    expiring: { color: 'bg-orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200', textColor: 'text-orange-700', icon: AlertTriangle, label: 'Expiring Soon' },
    overdue: { color: 'bg-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-700', icon: XCircle, label: 'Overdue' },
  };

  const cfg = statusConfig[status];
  const StatusIcon = cfg.icon;

  return (
    <div className="pb-24 fade-in">
      {/* Header */}
      <div className="bg-[#0d47a1] text-white px-4 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold flex-1">Instrument Profile</h1>
          {hasPermission('editMasterData') && (
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <Edit className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Status Badge */}
        <div className={`${cfg.bgColor} rounded-2xl p-4 border ${cfg.borderColor}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${cfg.color} flex items-center justify-center`}>
                <StatusIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`font-bold text-lg ${cfg.textColor}`}>{cfg.label}</p>
                <p className="text-sm text-gray-500">
                  {status === 'overdue'
                    ? `${Math.abs(daysUntil)} days overdue`
                    : `${daysUntil} days remaining`}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Next Calibration</p>
              <p className="text-sm font-semibold text-gray-700">{nextDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instrument Info */}
      <div className="px-4 -mt-2">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <QrCode className="w-6 h-6 text-[#0d47a1]" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg text-gray-800">{instrument.name}</h2>
              <p className="text-sm text-gray-500">{instrument.code}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Master Data */}
      {hasPermission('viewMasterData') && (
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between p-4"
            >
              <span className="font-semibold text-gray-700">Master Data</span>
              <span className="text-gray-400 text-sm">{showDetails ? 'Hide' : 'Show'}</span>
            </button>
            
            {showDetails && (
              <div className="px-4 pb-4 space-y-3 border-t border-gray-50 pt-3">
                <DataRow icon={Factory} label="Type" value={instrument.type} />
                <DataRow icon={Factory} label="Manufacturer" value={instrument.manufacturer} />
                <DataRow icon={Hash} label="Model" value={instrument.model} />
                <DataRow icon={Hash} label="Serial Number" value={instrument.serialNumber} />
                <DataRow icon={MapPin} label="Location" value={instrument.location} />
                <DataRow icon={MapPin} label="Department" value={instrument.department} />
                <DataRow icon={User} label="Responsible" value={instrument.responsiblePerson} />
                <DataRow icon={Clock} label="Calibration Frequency" value={`Every ${instrument.calibrationFrequencyMonths} months`} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Calibration Info */}
      {latestTx && (
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-700 mb-3">Current Calibration</h3>
            <div className="space-y-3">
              <DataRow icon={Calendar} label="Last Calibrated" value={latestTx.calibrationDate} />
              <DataRow icon={Calendar} label="Next Due" value={latestTx.nextCalibrationDate} />
              <DataRow
                icon={latestTx.result === 'passed' ? CheckCircle : latestTx.result === 'conditional' ? AlertTriangle : XCircle}
                label="Result"
                value={latestTx.result.charAt(0).toUpperCase() + latestTx.result.slice(1)}
                valueColor={latestTx.result === 'passed' ? 'text-green-600' : latestTx.result === 'conditional' ? 'text-orange-600' : 'text-red-600'}
              />
              <DataRow icon={User} label="Performed By" value={latestTx.performedBy} />
              {latestTx.certificateFileName && (
                <div className="flex items-center gap-3 py-1">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Certificate:</span>
                  <span className="text-sm text-[#0d47a1] font-medium">{latestTx.certificateFileName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-4 mt-6 space-y-3">
        {hasPermission('viewHistory') && (
          <button
            onClick={onViewHistory}
            className="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#0d47a1] transition"
          >
            <History className="w-5 h-5 text-[#0d47a1]" />
            <span className="font-medium text-gray-700">View Calibration History</span>
            <span className="ml-auto text-sm text-gray-400">{transactions.length} records</span>
          </button>
        )}

        {hasPermission('viewCertificates') && latestTx?.certificateFileName && (
          <button className="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#0d47a1] transition">
            <Download className="w-5 h-5 text-[#0d47a1]" />
            <span className="font-medium text-gray-700">Download Certificate</span>
          </button>
        )}

        {hasPermission('createTransaction') && (
          <button
            onClick={onRecordCalibration}
            className="w-full flex items-center gap-3 p-4 bg-[#0d47a1] text-white rounded-xl shadow-sm hover:bg-[#0a3680] transition"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Record New Calibration</span>
          </button>
        )}

        {hasPermission('editMasterData') && (
          <button
            onClick={onGenerateQR}
            className="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#0d47a1] transition"
          >
            <QrCode className="w-5 h-5 text-[#0d47a1]" />
            <span className="font-medium text-gray-700">Generate QR Label</span>
          </button>
        )}
      </div>
    </div>
  );
}

function DataRow({ icon: Icon, label, value, valueColor = 'text-gray-700' }: { icon: any; label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
      <span className="text-sm text-gray-500 w-28 flex-shrink-0">{label}</span>
      <span className={`text-sm font-medium ${valueColor}`}>{value}</span>
    </div>
  );
}
