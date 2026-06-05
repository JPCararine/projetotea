import AppointmentsView from '../contexts/appointments/components/appointments-view';

interface AppointmentsPageProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  searchTerm: string;
}

export default function AppointmentsPage(props: AppointmentsPageProps) {
  return <AppointmentsView {...props} />;
}
