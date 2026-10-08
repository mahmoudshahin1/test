import { User, Instrument, CalibrationTransaction, AuditLog, CalibrationResult } from './types';

export const mockUsers: User[] = [
  { id: 'u1', username: 'admin', password: 'admin123', fullName: 'Ahmed Al-Rashid', role: 'admin', department: 'IT', email: 'ahmed@epc.com', isActive: true },
  { id: 'u2', username: 'qcmanager', password: 'qc123', fullName: 'Mohammed Hassan', role: 'qc_manager', department: 'Quality Control', email: 'mohammed@epc.com', isActive: true },
  { id: 'u3', username: 'engineer', password: 'eng123', fullName: 'Khalid Omar', role: 'qc_engineer', department: 'Quality Control', email: 'khalid@epc.com', isActive: true },
  { id: 'u4', username: 'operator', password: 'op123', fullName: 'Salem Al-Dosari', role: 'operator', department: 'Production', email: 'salem@epc.com', isActive: true },
  { id: 'u5', username: 'viewer', password: 'view123', fullName: 'Fatima Al-Zahra', role: 'viewer', department: 'Management', email: 'fatima@epc.com', isActive: true },
];

export const mockInstruments: Instrument[] = [
  { id: 'i1', code: 'QC-CAL-001', name: 'Digital Caliper 150mm', type: 'Caliper', manufacturer: 'Mitutoyo', model: '500-196', serialNumber: 'SN20230001', location: 'Lab A - Bench 3', department: 'QC Lab', responsiblePerson: 'Khalid Omar', calibrationFrequencyMonths: 12, qrCode: 'QC-CAL-001', createdAt: '2023-01-15' },
  { id: 'i2', code: 'QC-CAL-002', name: 'Micrometer 0-25mm', type: 'Micrometer', manufacturer: 'Mitutoyo', model: '293-340', serialNumber: 'SN20230002', location: 'Lab A - Bench 1', department: 'QC Lab', responsiblePerson: 'Khalid Omar', calibrationFrequencyMonths: 12, qrCode: 'QC-CAL-002', createdAt: '2023-01-15' },
  { id: 'i3', code: 'QC-MIC-001', name: 'Metallurgical Microscope', type: 'Microscope', manufacturer: 'Zeiss', model: 'Axio Imager 2', serialNumber: 'SN20220015', location: 'Lab B - Microscopy', department: 'QC Lab', responsiblePerson: 'Khalid Omar', calibrationFrequencyMonths: 24, qrCode: 'QC-MIC-001', createdAt: '2022-06-20' },
  { id: 'i4', code: 'QC-THM-001', name: 'Infrared Thermometer', type: 'Thermometer', manufacturer: 'Fluke', model: '62 MAX+', serialNumber: 'SN20230045', location: 'Workshop Area', department: 'Production', responsiblePerson: 'Salem Al-Dosari', calibrationFrequencyMonths: 6, qrCode: 'QC-THM-001', createdAt: '2023-03-10' },
  { id: 'i5', code: 'QC-PRS-001', name: 'Pressure Gauge 0-100 bar', type: 'Pressure Gauge', manufacturer: 'WIKA', model: '213.53', serialNumber: 'SN20230078', location: 'Hydraulic Test Bay', department: 'Testing', responsiblePerson: 'Mohammed Hassan', calibrationFrequencyMonths: 12, qrCode: 'QC-PRS-001', createdAt: '2023-02-28' },
  { id: 'i6', code: 'QC-BAL-001', name: 'Analytical Balance 0.1mg', type: 'Balance', manufacturer: 'Ohaus', model: 'Explorer EX', serialNumber: 'SN20220089', location: 'Lab A - Weighing', department: 'QC Lab', responsiblePerson: 'Khalid Omar', calibrationFrequencyMonths: 12, qrCode: 'QC-BAL-001', createdAt: '2022-11-05' },
  { id: 'i7', code: 'QC-TOR-001', name: 'Torque Wrench 50-250 Nm', type: 'Torque Wrench', manufacturer: 'Stahlwille', model: '730', serialNumber: 'SN20230102', location: 'Assembly Area', department: 'Production', responsiblePerson: 'Salem Al-Dosari', calibrationFrequencyMonths: 6, qrCode: 'QC-TOR-001', createdAt: '2023-04-01' },
  { id: 'i8', code: 'QC-MUL-001', name: 'Multimeter Digital', type: 'Multimeter', manufacturer: 'Fluke', model: '87V', serialNumber: 'SN20230134', location: 'Electrical Lab', department: 'Testing', responsiblePerson: 'Mohammed Hassan', calibrationFrequencyMonths: 12, qrCode: 'QC-MUL-001', createdAt: '2023-05-15' },
  { id: 'i9', code: 'QC-HRD-001', name: 'Rockwell Hardness Tester', type: 'Hardness Tester', manufacturer: 'Wilson', model: 'RW 430', serialNumber: 'SN20220056', location: 'Lab B - Hardness', department: 'QC Lab', responsiblePerson: 'Khalid Omar', calibrationFrequencyMonths: 12, qrCode: 'QC-HRD-001', createdAt: '2022-08-12' },
  { id: 'i10', code: 'QC-GAG-001', name: 'Gauge Block Set (87 pcs)', type: 'Gauge Blocks', manufacturer: 'Mitutoyo', model: 'B753S', serialNumber: 'SN20220023', location: 'Lab A - Standards', department: 'QC Lab', responsiblePerson: 'Khalid Omar', calibrationFrequencyMonths: 24, qrCode: 'QC-GAG-001', createdAt: '2022-03-20' },
  { id: 'i11', code: 'QC-RGH-001', name: 'Surface Roughness Tester', type: 'Roughness Tester', manufacturer: 'Mitutoyo', model: 'SJ-410', serialNumber: 'SN20230156', location: 'Lab B - Surface', department: 'QC Lab', responsiblePerson: 'Khalid Omar', calibrationFrequencyMonths: 12, qrCode: 'QC-RGH-001', createdAt: '2023-06-01' },
  { id: 'i12', code: 'QC-CMM-001', name: 'Coordinate Measuring Machine', type: 'CMM', manufacturer: 'Zeiss', model: 'CONTURA', serialNumber: 'SN20210003', location: 'Lab C - CMM Room', department: 'QC Lab', responsiblePerson: 'Mohammed Hassan', calibrationFrequencyMonths: 12, qrCode: 'QC-CMM-001', createdAt: '2021-09-15' },
  { id: 'i13', code: 'QC-UTM-001', name: 'Universal Testing Machine', type: 'UTM', manufacturer: 'Instron', model: '5969', serialNumber: 'SN20210008', location: 'Lab D - Mechanical', department: 'Testing', responsiblePerson: 'Mohammed Hassan', calibrationFrequencyMonths: 12, qrCode: 'QC-UTM-001', createdAt: '2021-11-20' },
  { id: 'i14', code: 'QC-DIA-001', name: 'Optical Comparator', type: 'Comparator', manufacturer: 'Nikon', model: 'V-12B', serialNumber: 'SN20220034', location: 'Lab B - Optical', department: 'QC Lab', responsiblePerson: 'Khalid Omar', calibrationFrequencyMonths: 12, qrCode: 'QC-DIA-001', createdAt: '2022-05-10' },
  { id: 'i15', code: 'QC-CLB-001', name: 'Calibration Bath (-40 to 200°C)', type: 'Calibration Bath', manufacturer: 'Fluke', model: '9142', serialNumber: 'SN20220067', location: 'Lab A - Calibration', department: 'QC Lab', responsiblePerson: 'Mohammed Hassan', calibrationFrequencyMonths: 24, qrCode: 'QC-CLB-001', createdAt: '2022-07-08' },
  { id: 'i16', code: 'QC-PHM-001', name: 'pH Meter', type: 'pH Meter', manufacturer: 'Hanna', model: 'HI98194', serialNumber: 'SN20230178', location: 'Chemistry Lab', department: 'QC Lab', responsiblePerson: 'Khalid Omar', calibrationFrequencyMonths: 6, qrCode: 'QC-PHM-001', createdAt: '2023-07-15' },
  { id: 'i17', code: 'QC-SND-001', name: 'Sound Level Meter', type: 'Sound Meter', manufacturer: 'Brüel & Kjær', model: '2250', serialNumber: 'SN20230190', location: 'HSE Office', department: 'HSE', responsiblePerson: 'Salem Al-Dosari', calibrationFrequencyMonths: 12, qrCode: 'QC-SND-001', createdAt: '2023-08-01' },
  { id: 'i18', code: 'QC-VIB-001', name: 'Vibration Analyzer', type: 'Vibration Analyzer', manufacturer: 'SKF', model: 'TMAS 111', serialNumber: 'SN20230201', location: 'Maintenance Workshop', department: 'Maintenance', responsiblePerson: 'Salem Al-Dosari', calibrationFrequencyMonths: 12, qrCode: 'QC-VIB-001', createdAt: '2023-09-10' },
  { id: 'i19', code: 'QC-FRC-001', name: 'Force Gauge 500N', type: 'Force Gauge', manufacturer: 'Mark-10', model: 'M5-500', serialNumber: 'SN20230215', location: 'Lab D - Mechanical', department: 'Testing', responsiblePerson: 'Mohammed Hassan', calibrationFrequencyMonths: 12, qrCode: 'QC-FRC-001', createdAt: '2023-10-05' },
  { id: 'i20', code: 'QC-DIM-001', name: 'Height Gauge 600mm', type: 'Height Gauge', manufacturer: 'Mitutoyo', model: '518-353', serialNumber: 'SN20230228', location: 'Lab A - Bench 2', department: 'QC Lab', responsiblePerson: 'Khalid Omar', calibrationFrequencyMonths: 12, qrCode: 'QC-DIM-001', createdAt: '2023-10-20' },
  { id: 'i21', code: 'QC-THC-001', name: 'Thermocouple Type K', type: 'Thermocouple', manufacturer: 'Omega', model: 'KQSS-14U', serialNumber: 'SN20230240', location: 'Furnace Area', department: 'Production', responsiblePerson: 'Salem Al-Dosari', calibrationFrequencyMonths: 6, qrCode: 'QC-THC-001', createdAt: '2023-11-01' },
  { id: 'i22', code: 'QC-LUX-001', name: 'Lux Meter', type: 'Lux Meter', manufacturer: 'Extech', model: 'LT300', serialNumber: 'SN20230255', location: 'HSE Office', department: 'HSE', responsiblePerson: 'Salem Al-Dosari', calibrationFrequencyMonths: 12, qrCode: 'QC-LUX-001', createdAt: '2023-11-15' },
];

// Generate calibration transactions with varying dates to show different statuses
function generateTransactions(): CalibrationTransaction[] {
  const transactions: CalibrationTransaction[] = [];
  const now = new Date();
  
  const configs: Record<string, { lastDate: string; results: CalibrationResult[] }> = {
    'i1': { lastDate: '2025-08-15', results: ['passed'] },
    'i2': { lastDate: '2025-06-20', results: ['passed'] },
    'i3': { lastDate: '2025-01-10', results: ['passed'] },
    'i4': { lastDate: '2026-04-01', results: ['passed', 'conditional'] },
    'i5': { lastDate: '2025-03-15', results: ['passed'] },
    'i6': { lastDate: '2025-11-20', results: ['passed'] },
    'i7': { lastDate: '2026-05-10', results: ['passed'] },
    'i8': { lastDate: '2025-09-01', results: ['passed'] },
    'i9': { lastDate: '2025-07-25', results: ['passed', 'failed', 'passed'] },
    'i10': { lastDate: '2024-12-01', results: ['passed'] },
    'i11': { lastDate: '2025-10-15', results: ['passed'] },
    'i12': { lastDate: '2026-01-20', results: ['passed'] },
    'i13': { lastDate: '2025-05-30', results: ['passed'] },
    'i14': { lastDate: '2025-08-08', results: ['passed'] },
    'i15': { lastDate: '2025-04-12', results: ['passed'] },
    'i16': { lastDate: '2026-05-20', results: ['passed', 'passed'] },
    'i17': { lastDate: '2025-12-01', results: ['passed'] },
    'i18': { lastDate: '2025-06-15', results: ['passed'] },
    'i19': { lastDate: '2026-02-28', results: ['passed'] },
    'i20': { lastDate: '2025-09-20', results: ['passed'] },
    'i21': { lastDate: '2026-06-01', results: ['passed', 'passed', 'passed'] },
    'i22': { lastDate: '2025-07-10', results: ['passed'] },
  };

  let txCounter = 1000;
  
  Object.entries(configs).forEach(([instId, config]) => {
    const instrument = mockInstruments.find(i => i.id === instId);
    if (!instrument) return;

    const results = config.results;
    let currentDate = new Date(config.lastDate);
    
    results.forEach((result, idx) => {
      const calDate = new Date(currentDate);
      calDate.setMonth(calDate.getMonth() - (results.length - 1 - idx) * instrument.calibrationFrequencyMonths);
      
      const nextDate = new Date(calDate);
      nextDate.setMonth(nextDate.getMonth() + instrument.calibrationFrequencyMonths);

      txCounter++;
      transactions.push({
        id: `tx-${instId}-${idx}`,
        instrumentId: instId,
        transactionCode: `TXN-${txCounter}`,
        calibrationDate: calDate.toISOString().split('T')[0],
        nextCalibrationDate: nextDate.toISOString().split('T')[0],
        result,
        performedBy: idx === results.length - 1 ? 'External Lab - SGS' : 'Internal QC Lab',
        certificateFileName: `Certificate_${instrument.code}_${txCounter}.pdf`,
        notes: idx === results.length - 1 ? 'Calibration completed successfully' : 'Historical calibration record',
        createdAt: calDate.toISOString(),
        createdBy: 'u2',
      });
    });
  });

  return transactions;
}

export const mockTransactions: CalibrationTransaction[] = generateTransactions();

export const mockAuditLogs: AuditLog[] = [
  { id: 'al1', userId: 'u4', action: 'scan', instrumentId: 'i1', details: 'Scanned QR for QC-CAL-001', timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: 'al2', userId: 'u2', action: 'create_transaction', instrumentId: 'i7', details: 'Created calibration TXN-1050', timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: 'al3', userId: 'u1', action: 'edit_instrument', instrumentId: 'i4', details: 'Updated location for QC-THM-001', timestamp: new Date(Date.now() - 86400000).toISOString() },
  { id: 'al4', userId: 'u3', action: 'scan', instrumentId: 'i12', details: 'Scanned QR for QC-CMM-001', timestamp: new Date(Date.now() - 172800000).toISOString() },
  { id: 'al5', userId: 'u2', action: 'upload_cert', instrumentId: 'i16', details: 'Uploaded certificate for QC-PHM-001', timestamp: new Date(Date.now() - 259200000).toISOString() },
];

// Helper functions
export function getCalibrationStatus(instrumentId: string): { status: 'valid' | 'expiring' | 'overdue'; nextDate: string; daysUntil: number } {
  const transactions = mockTransactions
    .filter(t => t.instrumentId === instrumentId)
    .sort((a, b) => new Date(b.calibrationDate).getTime() - new Date(a.calibrationDate).getTime());
  
  if (transactions.length === 0) {
    return { status: 'overdue', nextDate: 'N/A', daysUntil: -999 };
  }

  const latest = transactions[0];
  const nextDate = new Date(latest.nextCalibrationDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = nextDate.getTime() - today.getTime();
  const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (daysUntil < 0) return { status: 'overdue', nextDate: latest.nextCalibrationDate, daysUntil };
  if (daysUntil <= 30) return { status: 'expiring', nextDate: latest.nextCalibrationDate, daysUntil };
  return { status: 'valid', nextDate: latest.nextCalibrationDate, daysUntil };
}

export function getInstrumentTransactions(instrumentId: string): CalibrationTransaction[] {
  return mockTransactions
    .filter(t => t.instrumentId === instrumentId)
    .sort((a, b) => new Date(b.calibrationDate).getTime() - new Date(a.calibrationDate).getTime());
}

export function getStats() {
  const stats = { total: mockInstruments.length, valid: 0, expiring: 0, overdue: 0 };
  mockInstruments.forEach(inst => {
    const { status } = getCalibrationStatus(inst.id);
    if (status === 'valid') stats.valid++;
    else if (status === 'expiring') stats.expiring++;
    else stats.overdue++;
  });
  return stats;
}
