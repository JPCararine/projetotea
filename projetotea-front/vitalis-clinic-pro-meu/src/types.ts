export type UserRole = 'Administrador' | 'Médico' | 'Recepcionista';
export type UserStatus = 'Ativo' | 'Inativo';
export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  createdAt: string;
  avatarColor: string;
  specialty?: string;
  crm?: string;
}
export interface Patient {
  id: string;
  name: string;
  birthDate: string;
  ageText: string;
  parentsName: string;
  phone: string;
  status: 'Ativo' | 'Inativo';
  createdAt: string;
  gender: 'M' | 'F';
  avatarColor: string;
}

export type AppointmentStatus = 'Agendado' | 'Em Andamento' | 'Finalizado' | 'Cancelado';
export type AppointmentType = 'Triagem' | 'Avaliação Denver' | 'Sessão Regular' | 'Feedback Pais';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  type: AppointmentType;
  notes?: string;
  evolutionRegistered?: string;
}
export interface SaaSInvoice {
  id: string;
  planName: string;
  amount: number;
  paymentMethod: string;
  dueDate: string;
  paymentDate?: string;
  status: 'Pago' | 'Pendente' | 'Atrasado';
}
export interface SaaSPlan {
  name: string;
  price: number;
  patientLimit: number;
  features: string[];
  isCurrent: boolean;
}
export interface DenverMilestone {
  id: string;
  domain: 'personal-social' | 'fine-motor' | 'language' | 'gross-motor';
  description: string;
  rangeAgeMonths: string;
  status: 'concluido' | 'não-concluido' | 'atrasado';
}
export interface DenverAssessment {
  id: string;
  patientId: string;
  date: string;
  assessorName: string;
  status: 'Normal' | 'Alerta' | 'Risco';
  scorePersonalSocial: number;
  scoreFineMotor: number;
  scoreLanguage: number;
  scoreGrossMotor: number;
  observations: string;
}

export type PatientSheetTab = 'overview' | 'lastAssessment' | 'avatar' | 'evaluations';

export type EvaluationOption = 'not_demonstrated' | 'partial' | 'acquired' | 'not_observed';

export interface EvaluationItem {
  numero: number;
  competencia: string;
  descricao: string;
}

export interface EvaluationCategory {
  nome: string;
  itens: EvaluationItem[];
}

export interface EvaluationLevel {
  nivel: number;
  categorias: EvaluationCategory[];
}

export interface EvaluationModel {
  titulo: string;
  schema_version: string;
  campos: string[];
  niveis: EvaluationLevel[];
}
