import { useState } from 'react';
import { mockInstruments } from '../data';
import { ArrowLeft, Upload, CheckCircle, Calendar, FileText } from 'lucide-react';

interface Props {
  instrumentId: string;
  onBack: () => void;
  onSuccess: () => void;
}

export default function RecordCalibrationScreen({ instrumentId, onBack, onSuccess }: Props) {
  const instrument = mockInstruments.find(i => i.id === instrumentId);
  const [calDate, setCalDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<'passed' | 'conditional' | 'failed'>('passed');
  const [performedBy, setPerformedBy] = useState('');
  const [notes, setNotes] = useState('');
  const [certFile, setCertFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!instrument) return null;

  // Auto-calculate next calibration date
  const nextDate = new Date(calDate);
  nextDate.setMonth(nextDate.getMonth() + instrument.calibrationFrequencyMonths);
  const nextDateStr = nextDate.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Calibration Recorded!</h2>
          <p className="text-gray-500">The calibration record has been saved successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 fade-in">
      {/* Header */}
      <div className="bg-[#0d47a1] text-white px-4 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Record Calibration</h1>
        </div>
        <p className="text-blue-200 text-sm">{instrument.name} ({instrument.code})</p>
      </div>

      <form onSubmit={handleSubmit} className="px-4 mt-4 space-y-4">
        {/* Instrument (read-only) */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <label className="block text-sm font-medium text-gray-500 mb-1">Instrument</label>
          <p className="font-medium text-gray-800">{instrument.name}</p>
          <p className="text-sm text-gray-500">{instrument.code} • {instrument.manufacturer}</p>
        </div>

        {/* Calibration Date */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <label className="block text-sm font-medium text-gray-500 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Calibration Date
          </label>
          <input
            type="date"
            value={calDate}
            onChange={e => setCalDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d47a1]"
            required
          />
        </div>

        {/* Next Calibration Date (auto-calculated) */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Next Calibration Date
          </label>
          <p className="font-medium text-[#0d47a1]">{nextDateStr}</p>
          <p className="text-xs text-gray-400 mt-1">Auto-calculated (every {instrument.calibrationFrequencyMonths} months)</p>
        </div>

        {/* Result */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <label className="block text-sm font-medium text-gray-500 mb-3">Calibration Result</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'passed', label: 'Passed', color: 'green' },
              { value: 'conditional', label: 'Conditional', color: 'orange' },
              { value: 'failed', label: 'Failed', color: 'red' },
            ].map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setResult(opt.value as any)}
                className={`py-3 rounded-xl text-sm font-medium border-2 transition ${
                  result === opt.value
                    ? opt.color === 'green' ? 'border-green-500 bg-green-50 text-green-700' :
                      opt.color === 'orange' ? 'border-orange-500 bg-orange-50 text-orange-700' :
                      'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 text-gray-500'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Performed By */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <label className="block text-sm font-medium text-gray-500 mb-2">Performed By</label>
          <select
            value={performedBy}
            onChange={e => setPerformedBy(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d47a1] bg-white"
            required
          >
            <option value="">Select...</option>
            <option value="Internal QC Lab">Internal QC Lab</option>
            <option value="External Lab - SGS">External Lab - SGS</option>
            <option value="External Lab - Bureau Veritas">External Lab - Bureau Veritas</option>
            <option value="External Lab - TÜV">External Lab - TÜV</option>
            <option value="External Lab - Intertek">External Lab - Intertek</option>
            <option value="Manufacturer Service">Manufacturer Service</option>
          </select>
        </div>

        {/* Certificate Upload */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <label className="block text-sm font-medium text-gray-500 mb-2">
            <FileText className="w-4 h-4 inline mr-1" />
            Certificate (PDF)
          </label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#0d47a1] transition cursor-pointer">
            <input
              type="file"
              accept=".pdf"
              onChange={e => setCertFile(e.target.files?.[0] || null)}
              className="hidden"
              id="cert-upload"
            />
            <label htmlFor="cert-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                {certFile ? certFile.name : 'Click to upload certificate'}
              </p>
              <p className="text-xs text-gray-400 mt-1">PDF files only</p>
            </label>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <label className="block text-sm font-medium text-gray-500 mb-2">Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d47a1] resize-none"
            placeholder="Additional notes about the calibration..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 bg-[#0d47a1] text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 hover:bg-[#0a3680] transition active:scale-[0.98]"
        >
          Save Calibration Record
        </button>
      </form>
    </div>
  );
}
