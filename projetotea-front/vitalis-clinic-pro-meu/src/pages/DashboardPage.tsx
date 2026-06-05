import DashboardView from '../contexts/dashboard/components/dashboard-view';

interface DashboardPageProps {
  setActiveTab: (tab: string) => void;
  openScheduleModal: () => void;
}

export default function DashboardPage(props: DashboardPageProps) {
  return <DashboardView {...props} />;
}
