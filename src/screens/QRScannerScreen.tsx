import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Flashlight, FlashlightOff, Keyboard, Camera } from 'lucide-react';
import { mockInstruments } from '../data';

interface Props {
  onClose: () => void;
  onScanSuccess: (instrumentId: string) => void;
}

export default function QRScannerScreen({ onClose, onScanSuccess }: Props) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [manualMode, setManualMode] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [torchOn, setTorchOn] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!manualMode) {
      startScanner();
    }
    return () => {
      stopScanner();
    };
  }, [manualMode]);

  const startScanner = async () => {
    try {
      setError('');
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;
      
      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          handleScanResult(decodedText);
        },
        () => {}
      );
      setScanning(true);
    } catch (err) {
      setError('Camera access denied or not available. Use manual entry.');
      setManualMode(true);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (e) {
        // ignore
      }
      scannerRef.current = null;
    }
    setScanning(false);
  };

  const handleScanResult = (code: string) => {
    const instrument = mockInstruments.find(
      i => i.qrCode === code || i.code === code || i.id === code
    );
    if (instrument) {
      stopScanner();
      onScanSuccess(instrument.id);
    } else {
      setError(`No instrument found for code: ${code}`);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleScanResult(manualCode.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm">
        <button onClick={onClose} className="p-2 text-white">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-white font-semibold">Scan QR Code</h2>
        <button
          onClick={() => setManualMode(!manualMode)}
          className="p-2 text-white"
        >
          <Keyboard className="w-6 h-6" />
        </button>
      </div>

      {/* Scanner Area */}
      {!manualMode ? (
        <div className="flex-1 relative flex items-center justify-center">
          <div id="qr-reader" className="w-full max-w-sm" ref={containerRef}></div>
          
          {/* Scan overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 border-2 border-white/30 rounded-3xl relative">
              {/* Corner markers */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl"></div>
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl"></div>
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl"></div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl"></div>
              
              {/* Scan line */}
              {scanning && (
                <div className="absolute left-2 right-2 h-0.5 bg-[#0d47a1] scan-line shadow-lg shadow-blue-500/50"></div>
              )}
            </div>
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
            <button
              onClick={() => setTorchOn(!torchOn)}
              className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20"
            >
              {torchOn ? <FlashlightOff className="w-6 h-6" /> : <Flashlight className="w-6 h-6" />}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-6">
          <form onSubmit={handleManualSubmit} className="w-full max-w-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Camera className="w-12 h-12 text-white/50 mx-auto mb-4" />
              <h3 className="text-white text-center font-medium mb-4">Enter Instrument Code</h3>
              <input
                type="text"
                value={manualCode}
                onChange={e => setManualCode(e.target.value)}
                placeholder="e.g., QC-CAL-001"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 mb-4"
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-3 bg-white text-[#0d47a1] font-semibold rounded-xl"
              >
                Search
              </button>
              
              {/* Quick select */}
              <div className="mt-4 max-h-48 overflow-y-auto">
                <p className="text-white/50 text-xs mb-2">Quick Select:</p>
                {mockInstruments.slice(0, 8).map(inst => (
                  <button
                    key={inst.id}
                    type="button"
                    onClick={() => handleScanResult(inst.code)}
                    className="w-full text-left px-3 py-2 text-white/80 text-sm hover:bg-white/10 rounded-lg transition"
                  >
                    {inst.code} - {inst.name}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute bottom-24 left-4 right-4 bg-red-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-xl text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
}
