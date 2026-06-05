import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Calendar as CalendarIcon, 
  ChevronDown, 
  CheckCircle, 
  Clock, 
  ShieldAlert
} from 'lucide-react';

interface TopbarProps {
  currentTab: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function Topbar({ currentTab, searchTerm, setSearchTerm }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);

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
    <header id="main-app-header" className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100 shadow-xs">
      <div id="header-brand-title-area">
        <h2 id="header-view-title" className="font-sans font-bold text-2xl text-slate-800 tracking-tight">
          {getTitle()}
        </h2>
        <span id="header-view-subtitle" className="text-xs text-slate-400 font-medium">
          {getSubtitle()}
        </span>
      </div>

      <div id="header-tools-area" className="flex items-center gap-6">
        {getTitle() !== "Visão Geral" && getTitle() !== "Controle Financeiro e Faturamento" &&(
          <div id="search-input-wrapper" className="relative hidden md:block w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4.5 h-4.5 text-slate-400 animate-pulse" />
          </span>
          <input
            type="text"
            id="global-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 text-slate-700 placeholder-slate-400 border border-slate-100 rounded-lg hover:border-slate-300 focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all duration-200"
            placeholder="Buscar por paciente, profissional ou status..."
          />
        
        </div>)}

        
        <div id="mock-date-pill" className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-600 font-medium text-xs">
          <CalendarIcon className="w-4 h-4 text-teal-600" />
          <span>21 de Maio, 2026</span>
        </div>

        
        <div className="relative">
          <button
            id="notification-bell-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 transition duration-200"
          >
            <Bell className="w-5 h-5" />
            <span id="notification-badge" className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white ring-1 ring-rose-300"></span>
          </button>

          {showNotifications && (
            <div id="notification-popover" className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 shadow-2xl rounded-xl z-50 overflow-hidden divide-y divide-slate-50">
              <div className="p-4 bg-slate-50 flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-700">Notificações Recentes</span>
                <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-bold">3 novas</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-4 hover:bg-slate-50/50 transition duration-150 flex gap-3 text-left">
                    <div className="mt-0.5">
                      {notif.type === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : notif.type === 'warning' ? (
                        <ShieldAlert className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-teal-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800">{notif.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{notif.msg}</p>
                      <span className="text-[9px] text-slate-400 mt-1 block">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-50 text-center">
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-teal-600 hover:text-teal-700 font-semibold"
                >
                  Marcar todas como lidas
                </button>
              </div>
            </div>
          )}
        </div>

        
        <div id="doctor-profile-badge" className="flex items-center gap-3 pl-4 border-l border-slate-100">
          <div className="text-right hidden lg:block">
            <h4 className="text-xs font-bold text-slate-700">Dr. Ricardo Oliveira</h4>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Cardiologia</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center border border-teal-100 text-teal-700 font-bold text-xs ring-2 ring-teal-50/50">
            RO
          </div>
        </div>
      </div>
    </header>
  );
}
