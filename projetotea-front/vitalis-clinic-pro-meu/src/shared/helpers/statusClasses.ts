import { AppointmentStatus } from '../interfaces';

export function getAppointmentStatusBadgeClass(status: AppointmentStatus): string {
  switch (status) {
    case 'Agendado':
      return 'bg-teal-50 text-teal-700 border-teal-100';
    case 'Em Andamento':
      return 'bg-amber-50 text-amber-700 border-amber-100 font-extrabold animate-pulse';
    case 'Finalizado':
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    case 'Cancelado':
      return 'bg-rose-50 text-rose-600 border-rose-100';
    default:
      return 'bg-slate-50 text-slate-600 border-slate-100';
  }
}
