import React from 'react';
import { 
  Users, 
  CalendarCheck2, 
  Activity, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldAlert,
  Brain,
  FileText
} from 'lucide-react';
import { useDashboardViewModel } from '../hooks/use-dashboard-view-model';
import Card from "./Card"
import Graph from "./Graph"
import AlertSignal from './AlertSignal';

interface DashboardPageProps {
  setActiveTab: (tab: string) => void;
  openScheduleModal: () => void;
}

export default function DashboardPage({
  setActiveTab,
  openScheduleModal
}: DashboardPageProps) {
  const {
    atendimentosHoje,
    developmentAlerts,
    monthlyClinicalGrowth,
    profissionaisAtivos,
    totalPacientes,
    upcomingToday,
  } = useDashboardViewModel();

  return (
    <div id="dashboard-view-wrapper" className="space-y-8 animate-fade-in text-left">
      
      
      <div id="stats-grid" className="justify-between flex gap-6">
        
        <div className="flex-row flex gap-9">
        <Card title="Pacientes Cadastrados" value="5" label="em supervisão ativa" icon={Users}/>

        <Card title="Atendimentos hoje" value="4" icon={CalendarCheck2} />
        </div>

        
        <div id="stat-card-revenue" className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md hover:border-slate-200 transition-all duration-200">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Assinatura Hospitalis</span>
            <h3 className="text-lg font-bold text-slate-850 tracking-tight mt-1">Plano Premium</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-100">ATIVO</span>
              <span className="text-xs text-slate-400 font-semibold">Vence 15/06</span>
            </div>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl text-amber-600">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      
                <div
            id="dashboard-top-area"
            className="flex flex-col xl:flex-row gap-6"
          >
            <div
              id="dashboard-charts-layout"
              className="flex-1 min-w-0"
            >
              <Graph />
            </div>

            <div className="w-full xl:w-[340px]">
              <AlertSignal />
            </div>
          </div>


      

      
      <div id="dashboard-bottom-area" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        
        <div id="upcoming-appointments-queue" className="lg:col-span-2 p-6 bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-sans font-bold text-lg text-slate-800 tracking-tight">Atendimentos Agendados Hoje</h3>
                <p className="text-xs text-slate-400 mt-0.5">Agenda sob responsabilidade do profissional ativo (21/05/2026)</p>
              </div>
              <button 
                onClick={() => setActiveTab('appointments')}
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition"
              >
                Gerenciar Agenda
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {upcomingToday.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                Não há atendimentos previstos para o dia de hoje.
              </div>
            ) : (
              <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto pr-1">
                {upcomingToday.map((apt) => (
                  <div key={apt.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-lg transition duration-200">
                    <div className="flex items-center gap-4">
                      
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-extrabold text-slate-700 font-mono bg-slate-100 px-2.5 py-1 rounded-md">
                          {apt.time}
                        </span>
                      </div>

                      
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-slate-800">{apt.patientName}</h4>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-xs text-slate-500">
                          <span className="font-medium text-slate-600">{apt.doctorName}</span>
                          <span className="text-slate-300">•</span>
                          <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] text-slate-500 uppercase font-bold tracking-wider">{apt.doctorSpecialty}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-500 font-medium text-teal-600 bg-teal-50/60 px-1.5 py-0.5 rounded text-[10px]">{apt.type}</span>
                        </div>
                      </div>
                    </div>

                    
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${
                        apt.status === 'Finalizado' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : apt.status === 'Em Andamento'
                          ? 'bg-amber-50 text-amber-700 border border-amber-100 font-extrabold animate-pulse'
                          : 'bg-teal-50 text-teal-700 border border-teal-100'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        
        <div id="quick-action-panel" className="p-6 bg-slate-900 rounded-xl text-slate-100 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 text-teal-400 w-fit">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-xl text-white tracking-tight">Ferramentas Clínicas</h3>
              <p className="text-xs text-slate-405 mt-1">Acesso dinâmico aos controles integrados do software Hospitalis.</p>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <button
              onClick={openScheduleModal}
              className="w-full flex items-center justify-between p-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold text-sm transition-all duration-200 cursor-pointer shadow-lg shadow-teal-600/15"
            >
              <span>Agendar Atendimento</span>
              <Calendar className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className="w-full flex items-center justify-between p-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg font-semibold text-sm transition duration-200 cursor-pointer"
            >
              <span>Cadastrar Novo Paciente</span>
              <Users className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className="w-full flex items-center justify-between p-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg font-semibold text-sm transition duration-200 cursor-pointer"
            >
              <span>Gerenciar Assinatura SaaS</span>
              <FileText className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>Hospitalis Clínica Pro</span>
            <span className="text-teal-400 font-bold">LGPD Certificada</span>
          </div>
        </div>
      </div>
    </div>
  );
}
