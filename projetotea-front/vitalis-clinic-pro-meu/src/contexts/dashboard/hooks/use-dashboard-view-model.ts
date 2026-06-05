import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  INITIAL_APPOINTMENTS,
  INITIAL_DENVER_ASSESSMENTS,
  INITIAL_PATIENTS,
  INITIAL_PLATFORM_USERS,
  INITIAL_SAAS_INVOICES,
} from '../../../data/mockData';
import { queryKeys } from '../../../shared/queries/queryKeys';
import { appointmentsService } from '../../../shared/services/appointmentsService';
import { denverService } from '../../../shared/services/denverService';
import { patientsService } from '../../../shared/services/patientsService';
import { paymentsService } from '../../../shared/services/paymentsService';
import { platformUsersService } from '../../../shared/services/platformUsersService';

const dashboardDate = '2026-05-21';

export function useDashboardViewModel() {
  const { data: patients = INITIAL_PATIENTS } = useQuery({
    queryKey: queryKeys.patients,
    queryFn: patientsService.getAll,
    initialData: INITIAL_PATIENTS,
  });

  const { data: appointments = INITIAL_APPOINTMENTS } = useQuery({
    queryKey: queryKeys.appointments,
    queryFn: appointmentsService.getAll,
    initialData: INITIAL_APPOINTMENTS,
  });

  const { data: platformUsers = INITIAL_PLATFORM_USERS } = useQuery({
    queryKey: queryKeys.platformUsers,
    queryFn: platformUsersService.getAll,
    initialData: INITIAL_PLATFORM_USERS,
  });

  const { data: saasInvoices = INITIAL_SAAS_INVOICES } = useQuery({
    queryKey: queryKeys.saasInvoices,
    queryFn: paymentsService.getInvoices,
    initialData: INITIAL_SAAS_INVOICES,
  });

  const { data: denverAssessments = INITIAL_DENVER_ASSESSMENTS } = useQuery({
    queryKey: queryKeys.denverAssessments,
    queryFn: denverService.getAssessments,
    initialData: INITIAL_DENVER_ASSESSMENTS,
  });

  const totalPacientes = useMemo(() => patients.length, [patients]);

  const atendimentosHoje = useMemo(() => {
    return appointments.filter((appointment) => appointment.date === dashboardDate).length;
  }, [appointments]);

  const profissionaisAtivos = useMemo(() => {
    return platformUsers.filter((user) => user.role === 'Médico' && user.status === 'Ativo').length;
  }, [platformUsers]);

  const totalMensalidadesPagas = useMemo(() => {
    return saasInvoices
      .filter((invoice) => invoice.status === 'Pago')
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [saasInvoices]);

  const developmentAlerts = useMemo(() => {
    return denverAssessments
      .filter((assessment) => assessment.status === 'Alerta' || assessment.status === 'Risco')
      .map((assessment) => {
        const patient = patients.find((item) => item.id === assessment.patientId);

        return {
          ...assessment,
          patientName: patient ? patient.name : 'Paciente Desconhecido',
          avatarColor: patient ? patient.avatarColor : 'bg-slate-500',
        };
      });
  }, [denverAssessments, patients]);

  const upcomingToday = useMemo(() => {
    return appointments
      .filter((appointment) => appointment.date === dashboardDate)
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [appointments]);

  const monthlyClinicalGrowth = useMemo(() => [
    { month: 'Jan', value: 12 },
    { month: 'Fev', value: 18 },
    { month: 'Mar', value: 32 },
    { month: 'Abr', value: 45 },
    { month: 'Mai', value: totalPacientes },
  ], [totalPacientes]);

  const maxRecords = Math.max(...monthlyClinicalGrowth.map((item) => item.value));

  const patientByGender = useMemo(() => {
    const male = patients.filter((patient) => patient.gender === 'M').length;
    const female = patients.filter((patient) => patient.gender === 'F').length;
    return { male, female };
  }, [patients]);

  return {
    atendimentosHoje,
    developmentAlerts,
    maxRecords,
    monthlyClinicalGrowth,
    patientByGender,
    profissionaisAtivos,
    totalMensalidadesPagas,
    totalPacientes,
    upcomingToday,
  };
}
