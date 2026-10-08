import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { mockInstruments } from '../data';
import { ArrowLeft, Printer, QrCode } from 'lucide-react';

interface Props {
  instrumentId?: string;
  onBack: () => void;
}

export default function QRLabelScreen({ instrumentId, onBack }: Props) {
  const [selectedId, setSelectedId] = useState(instrumentId || mockInstruments[0]?.id || '');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const instrument = mockInstruments.find(i => i.id === selectedId);

  useEffect(() => {
    if (instrument) {
      QRCode.toDataURL(instrument.qrCode, {
        width: 300,
        margin: 1,
        errorCorrectionLevel: 'H',
        color: { dark: '#000000', light: '#ffffff' }
      }).then(setQrDataUrl);
    }
  }, [instrument]);

  const handlePrint = () => {
    window.print();
  };

  if (!instrument) return null;

  return (
    <div className="pb-24 fade-in">
      {/* Header */}
      <div className="bg-[#0d47a1] text-white px-4 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">QR Label Generator</h1>
        </div>
        <p className="text-blue-200 text-sm">Generate printable QR labels for instruments</p>
      </div>

      {/* Instrument Selector */}
      <div className="px-4 mt-4">
        <label className="block text-sm font-medium text-gray-500 mb-2">Select Instrument</label>
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d47a1]"
        >
          {mockInstruments.map(inst => (
            <option key={inst.id} value={inst.id}>
              {inst.code} - {inst.name}
            </option>
          ))}
        </select>
      </div>

      {/* Label Preview */}
      <div className="px-4 mt-6">
        <p className="text-sm font-medium text-gray-500 mb-3">Label Preview</p>
        <div className="flex justify-center">
          <div className="print-area bg-white border-2 border-gray-300 rounded-xl p-6 w-72 shadow-lg">
            {/* Company Header */}
            <div className="text-center mb-4 border-b border-gray-200 pb-3">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-8 h-8 bg-[#0d47a1] rounded-lg flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#0d47a1]">EPC COMPANY</p>
                  <p className="text-[10px] text-gray-500">QC Instruments</p>
                </div>
              </div>
            </div>

            {/* Instrument Info */}
            <div className="text-center mb-3">
              <p className="font-bold text-sm text-gray-800">{instrument.name}</p>
              <p className="text-xs text-gray-500 font-mono">{instrument.code}</p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-3">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="w-40 h-40" />
              ) : (
                <div className="w-40 h-40 bg-gray-100 rounded flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-gray-300" />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center border-t border-gray-200 pt-2">
              <p className="text-[10px] text-gray-500">Scan for Status & Certificates</p>
              <p className="text-[10px] text-gray-400 mt-1">Mfg: {instrument.manufacturer}</p>
              <p className="text-[10px] text-gray-400">S/N: {instrument.serialNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Label Specs */}
      <div className="px-4 mt-6">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-sm font-medium text-[#0d47a1] mb-2">Label Specifications</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Material: Durable plastic (PET)</li>
            <li>• Size: 50mm × 50mm minimum</li>
            <li>• Error Correction: Level H (High)</li>
            <li>• Resistant to chemicals, heat, moisture</li>
            <li>• Industrial-grade permanent adhesive</li>
          </ul>
        </div>
      </div>

      {/* Print Button */}
      <div className="px-4 mt-6">
        <button
          onClick={handlePrint}
          className="w-full flex items-center justify-center gap-2 py-4 bg-[#0d47a1] text-white font-bold rounded-xl shadow-lg hover:bg-[#0a3680] transition active:scale-[0.98]"
        >
          <Printer className="w-5 h-5" />
          Print Label
        </button>
      </div>

      {/* Batch Print Info */}
      <div className="px-4 mt-4">
        <p className="text-center text-xs text-gray-400">
          Batch printing available in Admin Panel
        </p>
      </div>

      {/* Hidden canvas for QR generation */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
