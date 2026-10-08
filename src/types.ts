export type UserRole = 'admin' | 'qc_manager' | 'qc_engineer' | 'operator' | 'viewer';
export type CalibrationResult = 'passed' | 'conditional' | 'failed';
export type CalibrationStatus = 'valid' | 'expiring' | 'overdue';

export interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  role: UserRole;
  department: string;
  email: string;
  isActive: boolean;
}

export interface Instrument {
  id: string;
  code: string;
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  location: string;
  department: string;
  responsiblePerson: string;
  calibrationFrequencyMonths: number;
  qrCode: string;
  createdAt: string;
}

export interface CalibrationTransaction {
  id: string;
  instrumentId: string;
  transactionCode: string;
  calibrationDate: string;
  nextCalibrationDate: string;
  result: CalibrationResult;
  performedBy: string;
  certificateFileName: string;
  notes: string;
  createdAt: string;
  createdBy: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  instrumentId?: string;
  details: string;
  timestamp: string;
}

export interface RolePermissions {
  scanQR: boolean;
  viewStatus: boolean;
  viewMasterData: boolean;
  viewHistory: boolean;
  viewCertificates: boolean;
  createTransaction: boolean;
  uploadCertificate: boolean;
  editMasterData: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  admin: {
    scanQR: true, viewStatus: true, viewMasterData: true, viewHistory: true,
    viewCertificates: true, createTransaction: true, uploadCertificate: true, editMasterData: true
  },
  qc_manager: {
    scanQR: true, viewStatus: true, viewMasterData: true, viewHistory: true,
    viewCertificates: true, createTransaction: true, uploadCertificate: true, editMasterData: false
  },
  qc_engineer: {
    scanQR: true, viewStatus: true, viewMasterData: true, viewHistory: true,
    viewCertificates: true, createTransaction: false, uploadCertificate: false, editMasterData: false
  },
  operator: {
    scanQR: true, viewStatus: true, viewMasterData: false, viewHistory: false,
    viewCertificates: false, createTransaction: false, uploadCertificate: false, editMasterData: false
  },
  viewer: {
    scanQR: true, viewStatus: true, viewMasterData: false, viewHistory: false,
    viewCertificates: false, createTransaction: false, uploadCertificate: false, editMasterData: false
  }
};
