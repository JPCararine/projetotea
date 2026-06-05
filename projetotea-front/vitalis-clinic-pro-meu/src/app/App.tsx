import { useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import HomePage from '../pages/HomePage';
import AuthorizedPage from '../pages/AuthorizedPage';
import DashboardPage from '../pages/DashboardPage';
import UsersPage from '../pages/UsersPage';
import AppointmentsPage from '../pages/AppointmentsPage';
import PaymentsPage from '../pages/PaymentsPage';
import { hasAuthSession } from '../shared/auth/session';

function getActiveTab(pathname: string) {
  const segment = pathname.split('/')[1];
  return segment || 'dashboard';
}

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = getActiveTab(location.pathname);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false);
  const isAuthenticated = hasAuthSession();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

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

export default function App() {
  const isAuthenticated = hasAuthSession();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <HomePage />} />
      <Route path="/authorized" element={<AuthorizedPage />} />
      <Route path="/*" element={<AppShell />} />
    </Routes>
  );
}
