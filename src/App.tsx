import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import QRScannerScreen from './screens/QRScannerScreen';
import InstrumentProfileScreen from './screens/InstrumentProfileScreen';
import CalibrationHistoryScreen from './screens/CalibrationHistoryScreen';
import RecordCalibrationScreen from './screens/RecordCalibrationScreen';
import QRLabelScreen from './screens/QRLabelScreen';
import AdminPanelScreen from './screens/AdminPanelScreen';
import InstrumentsListScreen from './screens/InstrumentsListScreen';
import { Home, ScanLine, Settings, LogOut, QrCode, User } from 'lucide-react';

type Screen = 'dashboard' | 'scanner' | 'instrument' | 'history' | 'record' | 'qr-label' | 'admin' | 'instruments';
const SCANNER: Screen = 'scanner';

function AppContent() {
  const { user, logout, hasPermission } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [selectedInstrumentId, setSelectedInstrumentId] = useState<string>('');
  const [previousScreen, setPreviousScreen] = useState<Screen>('dashboard');

  if (!user) {
    return <LoginScreen />;
  }

  const navigateTo = (screen: Screen, instrumentId?: string) => {
    setPreviousScreen(currentScreen);
    if (instrumentId) setSelectedInstrumentId(instrumentId);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    setCurrentScreen(previousScreen);
  };

  const handleScanSuccess = (instrumentId: string) => {
    setSelectedInstrumentId(instrumentId);
    setCurrentScreen('instrument');
  };

  const handleLogout = () => {
    logout();
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return (
          <DashboardScreen
            onScan={() => navigateTo('scanner')}
            onSelectInstrument={(id) => navigateTo('instrument', id)}
            onNavigate={(screen) => navigateTo(screen as Screen)}
          />
        );
      case 'scanner':
        return (
          <QRScannerScreen
            onClose={goBack}
            onScanSuccess={handleScanSuccess}
          />
        );
      case 'instrument':
        return (
          <InstrumentProfileScreen
            instrumentId={selectedInstrumentId}
            onBack={goBack}
            onViewHistory={() => navigateTo('history')}
            onRecordCalibration={() => navigateTo('record')}
            onGenerateQR={() => navigateTo('qr-label')}
          />
        );
      case 'history':
        return (
          <CalibrationHistoryScreen
            instrumentId={selectedInstrumentId}
            onBack={goBack}
          />
        );
      case 'record':
        return (
          <RecordCalibrationScreen
            instrumentId={selectedInstrumentId}
            onBack={goBack}
            onSuccess={() => navigateTo('instrument')}
          />
        );
      case 'qr-label':
        return (
          <QRLabelScreen
            instrumentId={selectedInstrumentId}
            onBack={goBack}
          />
        );
      case 'admin':
        return (
          <AdminPanelScreen
            onBack={goBack}
            onSelectInstrument={(id) => navigateTo('instrument', id)}
          />
        );
      case 'instruments':
        return (
          <InstrumentsListScreen
            onBack={goBack}
            onSelectInstrument={(id) => navigateTo('instrument', id)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] max-w-lg mx-auto relative">
      {/* Main Content */}
      <main className="min-h-screen">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      {currentScreen !== SCANNER && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-gray-200 px-2 py-2 z-40">
          <div className="flex items-center justify-around">
            <NavButton
              icon={Home}
              label="Home"
              active={currentScreen === 'dashboard'}
              onClick={() => navigateTo('dashboard')}
            />
            <NavButton
              icon={ScanLine}
              label="Scan"
              active={currentScreen === 'scanner'}
              onClick={() => navigateTo('scanner')}
              primary
            />
            <NavButton
              icon={QrCode}
              label="Instruments"
              active={currentScreen === 'instruments'}
              onClick={() => navigateTo('instruments')}
            />
            {hasPermission('editMasterData') && (
              <NavButton
                icon={Settings}
                label="Admin"
                active={currentScreen === 'admin'}
                onClick={() => navigateTo('admin')}
              />
            )}
            <NavButton
              icon={LogOut}
              label="Logout"
              active={false}
              onClick={handleLogout}
            />
          </div>
        </nav>
      )}
    </div>
  );
}

function NavButton({ icon: Icon, label, active, onClick, primary }: {
  icon: any; label: string; active: boolean; onClick: () => void; primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition ${
        primary
          ? 'bg-[#0d47a1] text-white -mt-4 shadow-lg shadow-blue-900/20'
          : active
            ? 'text-[#0d47a1]'
            : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
