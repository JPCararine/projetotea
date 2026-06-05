import { useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import DashboardPage from '../pages/DashboardPage';
import UsersPage from '../pages/UsersPage';
import AppointmentsPage from '../pages/AppointmentsPage';
import PaymentsPage from '../pages/PaymentsPage';

function getActiveTab(pathname: string) {
  const segment = pathname.split('/')[1];
  return segment || 'dashboard';
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = getActiveTab(location.pathname);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false);

  const setActiveTab = (tab: string) => {
    navigate(`/${tab}`);
  };

  const openQuickScheduleFlow = () => {
    navigate('/appointments');
    setIsScheduleModalOpen(true);
  };

  return (
    <AppLayout
      activeTab={activeTab}
      searchTerm={searchTerm}
      setActiveTab={setActiveTab}
      setSearchTerm={setSearchTerm}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={(
            <DashboardPage
              setActiveTab={setActiveTab}
              openScheduleModal={openQuickScheduleFlow}
            />
          )}
        />
        <Route path="/users" element={<UsersPage searchTerm={searchTerm} />} />
        <Route
          path="/appointments"
          element={(
            <AppointmentsPage
              isAddModalOpen={isScheduleModalOpen}
              setIsAddModalOpen={setIsScheduleModalOpen}
              searchTerm={searchTerm}
            />
          )}
        />
        <Route path="/payments" element={<PaymentsPage searchTerm={searchTerm} />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  );
}
