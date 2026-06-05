import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CreditCard, 
  Heart, 
  Settings, 
  LogOut,
  Stethoscope
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', name: 'Usuários & Pacientes', icon: Users },
    { id: 'appointments', name: 'Atendimentos', icon: Calendar },
    { id: 'payments', name: 'Pagamentos & Finanças', icon: CreditCard },
  ];

  return (
    <aside id="sidebar-container" className="fixed top-0 left-0 bottom-0 z-40 w-64 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 shadow-xl">
      
      <div id="brand-header" className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div id="brand-logo-wrapper" className="p-2.5 bg-teal-500/10 rounded-xl border border-teal-500/20 text-teal-400">
          <Stethoscope id="brand-logo-icon" className="w-6 h-6" />
        </div>
        <div>
          <h1 id="brand-name" className="font-sans font-bold text-lg tracking-tight text-white">Hospitalis</h1>
          <span id="brand-subtitle" className="text-[10px] uppercase tracking-wider text-teal-400 font-semibold">Sistema Médico</span>
        </div>
      </div>

      
      <nav id="sidebar-nav" className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
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
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                isActive
                  ? 'bg-teal-500 text-white shadow-md shadow-teal-500/10 font-semibold'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {item.name}
            </button>
          );
        })}

        <div className="pt-6 px-3 mb-2 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
          Preferências
        </div>
        <button
          id="nav-item-settings"
          onClick={() => alert('As configurações do sistema de alta fidelidade são pré-configuradas para o ambiente de demonstração.')}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800/60 hover:text-slate-100 transition-all duration-200 text-left"
        >
          <Settings className="w-5 h-5 text-slate-400" />
          Configurações
        </button>
      </nav>

      
      <div id="sidebar-footer" className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div id="user-profile-summary" className="flex items-center gap-3">
          <div id="user-avatar-placeholder" className="relative w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
            DR
            <span id="user-online-pulse" className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
          </div>
          <div id="user-profile-meta" className="flex-1 overflow-hidden">
            <h4 id="user-display-name" className="text-sm font-semibold text-white truncate">Dr. Ricardo Oliveira</h4>
            <p id="user-display-role" className="text-xs text-slate-400 truncate">Diretor Clínico</p>
          </div>
          <button 
            id="user-logout-button"
            onClick={() => alert('Sessão ativa protegida pelo demonstrador.')}
            className="p-1 px-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition duration-200"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
