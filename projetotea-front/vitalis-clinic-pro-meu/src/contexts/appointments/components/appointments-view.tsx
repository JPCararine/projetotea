import React from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  FileText, 
  ExternalLink, 
  Trash2, 
  CheckCircle, 
  X, 
  AlertCircle,
  TrendingUp,
  Activity,
  Plus,
  PlusCircle,
  FileSpreadsheet,
  HeartHandshake
} from 'lucide-react';
import { AppointmentType } from '../../../shared/interfaces';
import { useAppointmentsViewModel } from '../hooks/use-appointments-view-model';

interface AppointmentsPageProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  searchTerm: string;
}

export default function AppointmentsPage({
  isAddModalOpen,
  setIsAddModalOpen,
  searchTerm
}: AppointmentsPageProps) {
  const {
    doctors,
    doctorFilter,
    editingEvolution,
    editingNotes,
    filteredAppointments,
    getStatusBadgeClass,
    handleAddAppointment,
    handleSaveEvolution,
    isEvolutionEditing,
    newDate,
    newDoctorId,
    newNotes,
    newPatientId,
    newTime,
    newType,
    onDeleteAppointment,
    onUpdateStatus,
    patients,
    selectedAppointment,
    setDoctorFilter,
    setEditingEvolution,
    setEditingNotes,
    setIsEvolutionEditing,
    setNewDate,
    setNewDoctorId,
    setNewNotes,
    setNewPatientId,
    setNewTime,
    setNewType,
    setSelectedAppointment,
    setStatusFilter,
    statusFilter,
  } = useAppointmentsViewModel({ searchTerm, setIsAddModalOpen });

  return (
    <div id="appointments-view-wrapper" className="space-y-6 animate-fade-in text-left">
      
      
      <div id="appointments-filter-strip" className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 text-slate-400" />
            <select
              id="apt-status-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none text-slate-700 font-bold focus:outline-none cursor-pointer"
            >
              <option value="all">Todos os Status</option>
              <option value="Agendado">Agendados</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Finalizado">Finalizados</option>
              <option value="Cancelado">Cancelados</option>
            </select>
          </div>

          
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-xs font-semibold">
            <Stethoscope className="w-3.5 h-3.5 text-slate-400" />
            <select
              id="apt-doctor-select"
              value={doctorFilter}
              onChange={(e) => setDoctorFilter(e.target.value)}
              className="bg-transparent border-none text-slate-700 font-bold focus:outline-none cursor-pointer"
            >
              <option value="all">Qualquer Profissional</option>
              {doctors.map(doc => (
                <option key={doc.id} value={doc.name}>{doc.name}</option>
              ))}
            </select>
          </div>

          <span className="text-xs text-slate-400 font-semibold md:ml-3">
            {filteredAppointments.length} atendimentos previstos
          </span>
        </div>

        
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-lg transition duration-200 cursor-pointer shadow-md shadow-teal-600/10"
        >
          <Calendar className="w-4 h-4" />
          <span>Agendar Atendimento</span>
        </button>
      </div>

      
      <div id="appointments-layout-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        
        <div id="appointments-table-card" className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4 px-6 text-slate-600">Paciente Clínico</th>
                  <th className="py-4 px-6 text-slate-600">Especialista / Médico</th>
                  <th className="py-4 px-6 text-slate-600">Data &amp; Horário</th>
                  <th className="py-4 px-6 text-slate-600">Tipo</th>
                  <th className="py-4 px-6 text-slate-600">Status</th>
                  <th className="py-4 px-6 text-slate-600 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      Não há consultas ou exames para os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((apt) => (
                    <tr 
                      key={apt.id} 
                      onClick={() => {
                        setSelectedAppointment(apt);
                        setEditingNotes(apt.notes || '');
                        setEditingEvolution(apt.evolutionRegistered || '');
                        setIsEvolutionEditing(false);
                      }}
                      className={`hover:bg-slate-50/30 transition duration-150 cursor-pointer ${
                        selectedAppointment?.id === apt.id ? 'bg-teal-50/20 font-semibold' : ''
                      }`}
                    >
                      
                      <td className="py-4 px-6">
                        <div>
                          <h4 className="font-bold text-slate-800 tracking-tight">{apt.patientName}</h4>
                          <span className="text-[10px] text-slate-400 font-semibold">Registro {apt.id}</span>
                        </div>
                      </td>

                      
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 bg-teal-500 rounded-full"></div>
                          <div>
                            <p className="font-bold text-slate-700 text-xs">{apt.doctorName}</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{apt.doctorSpecialty}</p>
                          </div>
                        </div>
                      </td>

                      
                      <td className="py-4 px-6 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{new Date(apt.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-700">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{apt.time} hs</span>
                        </div>
                      </td>

                      
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 bg-slate-50 text-slate-600 border border-slate-100 rounded text-[11px] font-bold">
                          {apt.type}
                        </span>
                      </td>

                      
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeClass(apt.status)}`}>
                          {apt.status}
                        </span>
                      </td>

                      
                      <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1.5">
                          {apt.status === 'Agendado' && (
                            <>
                              <button 
                                onClick={() => onUpdateStatus(apt.id, 'Em Andamento')}
                                className="px-2 py-1 text-[10px] font-bold bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white rounded-md border border-teal-100 transition cursor-pointer"
                              >
                                Iniciar
                              </button>
                              <button 
                                onClick={() => onUpdateStatus(apt.id, 'Cancelado')}
                                className="px-2 py-1 text-[10px] font-bold bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-md border border-rose-100 transition cursor-pointer"
                              >
                                Cancelar
                              </button>
                            </>
                          )}
                          {apt.status === 'Em Andamento' && (
                            <button 
                              onClick={() => {
                                onUpdateStatus(apt.id, 'Finalizado');
                                setSelectedAppointment(prev => prev?.id === apt.id ? { ...prev, status: 'Finalizado' } : null);
                              }}
                              className="px-2.5 py-1 text-[10px] font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition shadow-sm cursor-pointer"
                            >
                              Finalizar
                            </button>
                          )}
                          <button 
                            onClick={() => {
                              if (confirm(`Remover esse agendamento do histórico?`)) {
                                onDeleteAppointment(apt.id);
                                if (selectedAppointment?.id === apt.id) setSelectedAppointment(null);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-slate-50 transition cursor-pointer"
                            title="Remover Registro"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        
        <div id="appointment-consultation-details-panel" className="bg-white rounded-xl border border-slate-100 shadow-xs p-6 flex flex-col justify-between h-fit text-left">
          {selectedAppointment ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Prontuário de Atendimento</span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold text-white bg-slate-800`}>
                  {selectedAppointment.status}
                </span>
              </div>

              <div id="details-patient-block" className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                    <User className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{selectedAppointment.patientName}</h4>
                    <span className="text-[11px] text-slate-400">Paciente ID: {selectedAppointment.patientId}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-150 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Stethoscope className="w-4 h-4 text-teal-650" />
                    <span><strong>Profissional:</strong> {selectedAppointment.doctorName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Calendar className="w-4 h-4 text-teal-650" />
                    <span><strong>Data/Hora:</strong> {new Date(selectedAppointment.date).toLocaleDateString('pt-BR')} às {selectedAppointment.time} hs</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <FileSpreadsheet className="w-4 h-4 text-teal-650" />
                    <span><strong>Protocolo/Tipo:</strong> {selectedAppointment.type}</span>
                  </div>
                </div>

                {isEvolutionEditing ? (
                  /* Editing mode of Case logs */
                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <label className="block text-[10px] text-slate-400 uppercase font-bold">Anotações / Queixas Iniciais</label>
                      <textarea
                        value={editingNotes}
                        onChange={(e) => setEditingNotes(e.target.value)}
                        className="w-full text-xs p-2 bg-slate-50 border rounded-lg resize-none outline-none focus:ring-1"
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-[10px] text-teal-700 uppercase font-bold">Evolução do Paciente na Sessão *</label>
                      <textarea
                        value={editingEvolution}
                        onChange={(e) => setEditingEvolution(e.target.value)}
                        placeholder="Quais foram os avanços, atrasos ou comportamentos observados nesta aplicação/terapia?"
                        className="w-full text-xs p-2 bg-teal-50/20 border border-teal-200 rounded-lg resize-none outline-none text-teal-950"
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-2 justify-end text-xs pt-1">
                      <button 
                        type="button" 
                        onClick={() => setIsEvolutionEditing(false)} 
                        className="px-2.5 py-1.5 border rounded"
                      >
                        Cancelar
                      </button>
                      <button 
                        type="button" 
                        onClick={handleSaveEvolution} 
                        className="px-2.5 py-1.5 bg-teal-600 text-white font-bold rounded"
                      >
                        Salvar Evolução
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Visual status of logs */
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase">
                        <FileText className="w-3.5 h-3.5" />
                        Indicações Clínicas e Sintomas
                      </span>
                      <div className="p-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-650 leading-relaxed border border-slate-100">
                        {selectedAppointment.notes || 'Nenhuma queixa inicial anotada para este atendimento.'}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase">
                        <HeartHandshake className="w-3.5 h-3.5 text-teal-600" />
                        Evolução Clínica do Caso
                      </span>
                      <div className="p-3 bg-teal-50/30 rounded-lg text-xs text-teal-950 font-medium leading-relaxed border border-teal-100/30">
                        {selectedAppointment.evolutionRegistered || (
                          <span className="text-slate-400 italic">Nenhum diário de evolução cadastrado para esta sessão. Clique abaixo para registrar os avanços do Denver.</span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setEditingNotes(selectedAppointment.notes || '');
                          setEditingEvolution(selectedAppointment.evolutionRegistered || '');
                          setIsEvolutionEditing(true);
                        }}
                        className="w-full py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold rounded-lg border border-teal-100/50 flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        Cadastrar/Editar Evolução do Caso
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center text-slate-400 space-y-3">
              <div className="p-4 bg-slate-50 rounded-full text-slate-350">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-600">Nenhum atendimento selecionado</p>
                <p className="text-xs text-slate-400 mt-1 max-w-[200px] mx-auto">Escolha um item da listagem à esquerda para visualizar o histórico de notas e diário de evolução.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      
      {isAddModalOpen && (
        <div id="add-appointment-modal-overlay" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div id="add-appointment-modal" className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 animate-slide-up">
            
            
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-400" />
                <div>
                  <h3 className="font-sans font-bold text-lg text-white">Agendar Novo Atendimento</h3>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wide">Módulo de Agendamento Ambulatorial</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            
            <form onSubmit={handleAddAppointment} className="p-6 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1 text-left">
                  <label className="block text-xs font-bold text-slate-400 uppercase">Paciente Marcado *</label>
                  <select
                    required
                    value={newPatientId}
                    onChange={(e) => setNewPatientId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100"
                  >
                    <option value="">-- Escolha o Paciente --</option>
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.ageText})</option>
                    ))}
                  </select>
                </div>

                
                <div className="space-y-1 text-left">
                  <label className="block text-xs font-bold text-slate-400 uppercase">Médico/Terapeuta Requisitado *</label>
                  <select
                    required
                    value={newDoctorId}
                    onChange={(e) => setNewDoctorId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100"
                  >
                    <option value="">-- Escolha o Profissional --</option>
                    {doctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="space-y-1 text-left">
                  <label className="block text-xs font-bold text-slate-400 uppercase">Data *</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                
                <div className="space-y-1 text-left">
                  <label className="block text-xs font-bold text-slate-400 uppercase">Horário *</label>
                  <input
                    type="time"
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                
                <div className="space-y-1 text-left">
                  <label className="block text-xs font-bold text-slate-400 uppercase">Tipo/Modalidade *</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as AppointmentType)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100"
                  >
                    <option value="Triagem">Sessão de Triagem</option>
                    <option value="Avaliação Denver">Avaliação Denver II</option>
                    <option value="Sessão Regular">Sessão de Terapia Regular</option>
                    <option value="Feedback Pais">Reunião de Feedback (Pais)</option>
                  </select>
                </div>
              </div>

              
              <div className="space-y-1 text-left">
                <label className="block text-xs font-bold text-slate-400 uppercase">Queixas/Sintomas ou Escopo do Atendimento</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Ex: Criança em acompanhamento para suspeita de transtorno de fala..."
                  rows={3}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100 resize-none"
                />
              </div>

              
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg font-semibold transition"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold transition shadow-lg shadow-teal-600/10 cursor-pointer"
                >
                  Agendar Atendimento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
