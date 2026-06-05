import { Bell, Calendar as CalendarIcon, CheckCircle, Clock, Search, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { getStoredAuthUser } from '../../shared/auth/session';

interface TopbarProps {
  currentTab: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function Topbar({ currentTab, searchTerm, setSearchTerm }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const user = getStoredAuthUser();

  const getTitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return 'Visão Geral';
      case 'users':
        return 'Gestão de Pacientes e Equipe';
      case 'appointments':
        return 'Agenda e Atendimentos';
      case 'payments':
        return 'Controle Financeiro e Faturamento';
      default:
        return 'Painel de Controle';
    }
  };

  const getSubtitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return 'Acompanhe as principais métricas de desempenho e saúde da sua clínica em tempo real.';
      case 'users':
        return 'Cadastre, edite e monitore os dados de pacientes, médicos e equipe administrativa.';
      case 'appointments':
        return 'Planeje, confirme ou cancele consultas e procedimentos médicos com facilidade.';
      case 'payments':
        return 'Gerencie fluxos de entrada, faturamento de convênios, recebimentos de Pix e controle atrasos.';
      default:
        return 'Bem-vindo ao Hospitalis.';
    }
  };

  const notifications = [
    { id: 1, title: 'Nova Consulta Agendada', msg: 'Roberto Souza Pinto agendou com Dr. Henrique.', time: '5m atrás', type: 'info' },
    { id: 2, title: 'Pagamento Recebido', msg: 'Pix de R$ 350,00 recebido do Paciente Roberto.', time: '12m atrás', type: 'success' },
    { id: 3, title: 'Faturamento de Convênio pendente', msg: 'Envio de guia do lote de guias Bradesco Saúde.', time: '2h atrás', type: 'warning' },
  ];

  return (
    <header id="main-app-header" className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white px-8 py-4 shadow-xs">
      <div id="header-brand-title-area">
        <h2 id="header-view-title" className="font-sans text-2xl font-bold tracking-tight text-slate-800">
          {getTitle()}
        </h2>
        <span id="header-view-subtitle" className="text-xs font-medium text-slate-400">
          {getSubtitle()}
        </span>
      </div>

      <div id="header-tools-area" className="flex items-center gap-6">
        {getTitle() !== 'Visão Geral' && getTitle() !== 'Controle Financeiro e Faturamento' && (
          <div id="search-input-wrapper" className="relative hidden w-72 md:block">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4.5 w-4.5 animate-pulse text-slate-400" />
            </span>
            <input
              type="text"
              id="global-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-100 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100"
              placeholder="Buscar por paciente, profissional ou status..."
            />
          </div>
        )}

        <div
          id="mock-date-pill"
          className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600"
        >
          <CalendarIcon className="h-4 w-4 text-teal-600" />
          <span>21 de Maio, 2026</span>
        </div>

        <div className="relative">
          <button
            id="notification-bell-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg border border-transparent p-2 text-slate-400 transition duration-200 hover:border-slate-100 hover:bg-slate-50 hover:text-slate-600"
          >
            <Bell className="h-5 w-5" />
            <span
              id="notification-badge"
              className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-rose-500 ring-1 ring-rose-300"
            />
          </button>

          {showNotifications && (
            <div
              id="notification-popover"
              className="absolute right-0 z-50 mt-3 w-80 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-2xl divide-y divide-slate-50"
            >
              <div className="flex items-center justify-between bg-slate-50 p-4">
                <span className="text-xs font-semibold text-slate-700">Notificações Recentes</span>
                <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-700">3 novas</span>
              </div>
              <div className="max-h-80 divide-y divide-slate-100 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex gap-3 p-4 text-left transition duration-150 hover:bg-slate-50/50">
                    <div className="mt-0.5">
                      {notif.type === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      ) : notif.type === 'warning' ? (
                        <ShieldAlert className="h-4 w-4 text-amber-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-teal-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800">{notif.title}</h4>
                      <p className="mt-0.5 text-[11px] text-slate-500">{notif.msg}</p>
                      <span className="mt-1 block text-[9px] text-slate-400">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 p-3 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-semibold text-teal-600 hover:text-teal-700"
                >
                  Marcar todas como lidas
                </button>
              </div>
            </div>
          )}
        </div>

        <div id="doctor-profile-badge" className="flex items-center gap-3 border-l border-slate-100 pl-4">
          <div className="text-right hidden lg:block">
            <h4 className="text-xs font-bold text-slate-700">{user?.displayName || 'Usuário logado'}</h4>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {user?.role || 'Acesso autenticado'}
            </span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-teal-100 bg-teal-50 text-xs font-bold text-teal-700 ring-2 ring-teal-50/50">
            {(user?.initials || 'LG').slice(0, 2)}
          </div>
        </div>
      </div>
    </header>
  );
}
