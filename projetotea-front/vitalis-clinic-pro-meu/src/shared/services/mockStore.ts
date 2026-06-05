import {
  DENVER_DEFAULT_MILESTONES,
  INITIAL_APPOINTMENTS,
  INITIAL_DENVER_ASSESSMENTS,
  INITIAL_PATIENTS,
  INITIAL_PLATFORM_USERS,
  INITIAL_SAAS_INVOICES,
  SAAS_PLANS,
} from '../../data/mockData';
import {
  Appointment,
  DenverAssessment,
  DenverMilestone,
  Patient,
  PlatformUser,
  SaaSInvoice,
  SaaSPlan,
} from '../interfaces';

export const mockStore: {
  platformUsers: PlatformUser[];
  patients: Patient[];
  appointments: Appointment[];
  saasInvoices: SaaSInvoice[];
  saasPlans: SaaSPlan[];
  denverMilestones: DenverMilestone[];
  denverAssessments: DenverAssessment[];
} = {
  platformUsers: [...INITIAL_PLATFORM_USERS],
  patients: [...INITIAL_PATIENTS],
  appointments: [...INITIAL_APPOINTMENTS],
  saasInvoices: [...INITIAL_SAAS_INVOICES],
  saasPlans: [...SAAS_PLANS],
  denverMilestones: [...DENVER_DEFAULT_MILESTONES],
  denverAssessments: [...INITIAL_DENVER_ASSESSMENTS],
};
