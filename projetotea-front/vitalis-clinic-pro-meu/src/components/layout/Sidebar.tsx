import {
  Calendar,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  Stethoscope,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clearAuthSession, getStoredAuthUser } from '../../shared/auth/session';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navigate = useNavigate();
  const user = getStoredAuthUser();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', name: 'Usuários & Pacientes', icon: Users },
    { id: 'appointments', name: 'Atendimentos', icon: Calendar },
    { id: 'payments', name: 'Pagamentos & Finanças', icon: CreditCard },
  ];

  return (
    <aside
      id="sidebar-container"
      className="fixed top-0 left-0 bottom-0 z-40 flex w-64 flex-col border-r border-slate-800 bg-slate-900 text-slate-100 shadow-xl"
    >
      <div id="brand-header" className="flex items-center gap-3 border-b border-slate-800 p-6">
        <div
          id="brand-logo-wrapper"
          className="rounded-xl border border-teal-500/20 bg-teal-500/10 p-2.5 text-teal-400"
        >
          <Stethoscope id="brand-logo-icon" className="h-6 w-6" />
        </div>
        <div>
          <h1 id="brand-name" className="font-sans text-lg font-bold tracking-tight text-white">
            Hospitalis
          </h1>
          <span
            id="brand-subtitle"
            className="text-[10px] font-semibold uppercase tracking-wider text-teal-400"
          >
            Sistema Médico
          </span>
        </div>
      </div>

      <nav id="sidebar-nav" className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
        <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Menu Principal
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-teal-500 font-semibold text-white shadow-md shadow-teal-500/10'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {item.name}
            </button>
          );
        })}

        <div className="mb-2 px-3 pt-6 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Preferências
        </div>
        <button
          id="nav-item-settings"
          onClick={() =>
            alert('As configurações do sistema de alta fidelidade são pré-configuradas para o ambiente de demonstração.')
          }
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-slate-800/60 hover:text-slate-100"
        >
          <Settings className="h-5 w-5 text-slate-400" />
          Configurações
        </button>
      </nav>

      <div id="sidebar-footer" className="border-t border-slate-800 bg-slate-950/40 p-4">
        <div id="user-profile-summary" className="flex items-center gap-3">
          <div
            id="user-avatar-placeholder"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white"
          >
            {(user?.initials || 'LG').slice(0, 2)}
            <span
              id="user-online-pulse"
              className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-500"
            />
          </div>
          <div id="user-profile-meta" className="flex-1 overflow-hidden">
            <h4 id="user-display-name" className="truncate text-sm font-semibold text-white">
              {user?.displayName || 'Usuário logado'}
            </h4>
            <p id="user-display-role" className="truncate text-xs text-slate-400">
              {user?.role || 'Acesso autenticado'}
            </p>
          </div>
          <button
            id="user-logout-button"
            onClick={() => {
              clearAuthSession();
              navigate('/');
            }}
            className="rounded-md px-2 py-1 text-slate-400 transition duration-200 hover:bg-slate-800 hover:text-white"
            title="Sair"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
