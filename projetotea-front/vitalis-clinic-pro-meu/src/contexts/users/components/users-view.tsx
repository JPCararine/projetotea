import React from 'react';
import { 
  Plus, 
  Filter, 
  Trash2, 
  UserPlus, 
  X, 
  Mail, 
  Phone,
  Power,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Calendar,
  Baby,
  Brain,
  FileText,
  ArrowRight,
  ClipboardCheck,
  Info,
  ListChecks,
  UserCircle,
  Save,
  BarChart3
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { EvaluationModel, EvaluationOption, UserRole } from '../../../shared/interfaces';
import { useUsersViewModel } from '../hooks/use-users-view-model';
import evaluationModelData from '../../../data/evaluationModel.json';

interface UsersPageProps {
  searchTerm: string;
}

const evaluationModel = evaluationModelData as EvaluationModel;

const evaluationOptions: Array<{ value: EvaluationOption; label: string }> = [
  { value: 'not_demonstrated', label: 'Não demonstra' },
  { value: 'partial', label: 'Parcial' },
  { value: 'acquired', label: 'Adquirido' },
  { value: 'not_observed', label: 'Não observado' },
];

const evaluationOptionScores: Record<EvaluationOption, number | null> = {
  not_demonstrated: 0,
  partial: 50,
  acquired: 100,
  not_observed: null,
};

const categoryAbbreviations: Record<string, string> = {
  'Comunicação Receptiva': 'CRE',
  'Comunicação Expressiva': 'CEX',
  'Comportamentos de Atenção Conjunta': 'CAC',
  'Competências Sociais': 'CSO',
  'Competênciais Sociais: Adultos ou Pares': 'CSA',
  'Competências Sociais com Pares': 'CSP',
  'Competências Sociais: Adultos e Pares': 'CAP',
  'Imitação': 'IMI',
  'Cognição': 'COG',
  'Jogo': 'JOG',
  'Jogo de Representação': 'JOR',
  'Jogo: Jogo Independente': 'JOI',
  'Motricidade Fina': 'MFI',
  'Motricidade Grossa': 'MGR',
  'Comportamento': 'COM',
  'Independência Pessoal': 'IPE',
  'Independência Pessoal: Alimentação': 'IPA',
  'Independência Pessoal: Vestir': 'IPV',
  'Independência Pessoal: Higiene': 'IPH',
  'Independência Pessoal: Tarefas': 'IPT',
};

const categoryDisplayOrder = [
  'CRE',
  'CEX',
  'CAC',
  'CSO',
  'CSA',
  'CSP',
  'CAP',
  'IMI',
  'COG',
  'JOG',
  'JOR',
  'JOI',
  'MFI',
  'MGR',
  'COM',
  'IPE',
  'IPA',
  'IPV',
  'IPH',
  'IPT',
];

interface EvaluationCategoryScore {
  category: string;
  code: string;
  score: number;
  maxScore: number;
  answeredItems: number;
  totalItems: number;
}

export default function UsersPage({ searchTerm }: UsersPageProps) {
  const [isEvaluationFormOpen, setIsEvaluationFormOpen] = React.useState(false);
  const [evaluationAreaTab, setEvaluationAreaTab] = React.useState<'models' | 'reports'>('models');
  const [evaluationReportLevel, setEvaluationReportLevel] = React.useState<'consolidated' | number>('consolidated');
  const [evaluationAnswers, setEvaluationAnswers] = React.useState<Record<string, EvaluationOption>>({});
  const [savedEvaluationScores, setSavedEvaluationScores] = React.useState<EvaluationCategoryScore[]>([]);
  const [savedEvaluationScoresByLevel, setSavedEvaluationScoresByLevel] = React.useState<Record<number, EvaluationCategoryScore[]>>({});
  const {
    appointments,
    currentPage,
    domainDevelopmentPercentages,
    domainMilestones,
    filteredPatients,
    filteredTeam,
    genderFilter,
    handleCreatePatient,
    handleCreateStaff,
    isPatientModalOpen,
    isStaffModalOpen,
    newPatAgeText,
    newPatBirthDate,
    newPatGender,
    newPatName,
    newPatParentsName,
    newPatPhone,
    newStaffCRM,
    newStaffEmail,
    newStaffName,
    newStaffPhone,
    newStaffRole,
    newStaffSpecialty,
    onDeletePatient,
    onDeletePlatformUser,
    onTogglePlatformUser,
    onUpdateDenverMilestone,
    paginatedPatients,
    paginatedTeam,
    patientSheetTab,
    patients,
    platformUsers,
    roleFilter,
    selectedPatient,
    selectedPatientAppointments,
    selectedPatientDenverAssessments,
    setCurrentPage,
    setGenderFilter,
    setIsPatientModalOpen,
    setIsStaffModalOpen,
    setNewPatAgeText,
    setNewPatBirthDate,
    setNewPatGender,
    setNewPatName,
    setNewPatParentsName,
    setNewPatPhone,
    setNewStaffCRM,
    setNewStaffEmail,
    setNewStaffName,
    setNewStaffPhone,
    setNewStaffRole,
    setNewStaffSpecialty,
    setPatientSheetTab,
    setRoleFilter,
    setSelectedPatient,
    setSubTab,
    subTab,
    totalPages,
  } = useUsersViewModel({ searchTerm });

  const calculateEvaluationCategoryScores = React.useCallback((levelFilter?: number) => {
    const categoryScoreMap = new Map<string, { scores: number[]; totalItems: number }>();

    evaluationModel.niveis
      .filter((level) => !levelFilter || level.nivel === levelFilter)
      .forEach((level) => {
      level.categorias.forEach((category) => {
        const current = categoryScoreMap.get(category.nome) || { scores: [], totalItems: 0 };
        current.totalItems += category.itens.length;

        category.itens.forEach((item) => {
          const answerKey = `${level.nivel}-${category.nome}-${item.numero}`;
          const answer = evaluationAnswers[answerKey];
          const score = answer ? evaluationOptionScores[answer] : undefined;

          if (typeof score === 'number') {
            current.scores.push(score);
          }
        });

        categoryScoreMap.set(category.nome, current);
      });
    });

    return Array.from(categoryScoreMap.entries())
      .map(([category, data]) => ({
        category,
        code: categoryAbbreviations[category] || category.slice(0, 3).toUpperCase(),
        score: data.scores.length
          ? Math.round(data.scores.reduce((sum, current) => sum + current, 0) / data.scores.length)
          : 0,
        maxScore: 100,
        answeredItems: data.scores.length,
        totalItems: data.totalItems,
      }))
      .sort((a, b) => {
        const orderA = categoryDisplayOrder.indexOf(a.code);
        const orderB = categoryDisplayOrder.indexOf(b.code);
        return (orderA === -1 ? Number.MAX_SAFE_INTEGER : orderA) -
          (orderB === -1 ? Number.MAX_SAFE_INTEGER : orderB);
      });
  }, [evaluationAnswers]);

  const handleSaveEvaluationScores = () => {
    const scores = calculateEvaluationCategoryScores();
    const scoresByLevel = evaluationModel.niveis.reduce<Record<number, EvaluationCategoryScore[]>>((acc, level) => {
      acc[level.nivel] = calculateEvaluationCategoryScores(level.nivel);
      return acc;
    }, {});

    setSavedEvaluationScores(scores);
    setSavedEvaluationScoresByLevel(scoresByLevel);
    setEvaluationReportLevel('consolidated');
    setEvaluationAreaTab('reports');
    setIsEvaluationFormOpen(false);
  };

  const visibleEvaluationScores = evaluationReportLevel === 'consolidated'
    ? savedEvaluationScores
    : savedEvaluationScoresByLevel[evaluationReportLevel] || [];

  return (
    <div id="users-view-wrapper" className="space-y-6 animate-fade-in text-left">
      
      
      <div className="border-b border-slate-200">
        <nav className="flex gap-6 -mb-px">
          <button
            onClick={() => { setSubTab('patients'); setCurrentPage(1); }}
            className={`pb-4 px-2 text-sm font-bold border-b-2 transition duration-150 flex items-center gap-2 cursor-pointer ${
              subTab === 'patients'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Baby className="w-4.5 h-4.5" />
            Pacientes Cadastrados
            <span className={`text-[10px] py-0.5 px-1.5 rounded-full font-extrabold ${subTab === 'patients' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-500'}`}>
              {patients.length}
            </span>
          </button>
          <button
            onClick={() => { setSubTab('team'); setCurrentPage(1); }}
            className={`pb-4 px-2 text-sm font-bold border-b-2 transition duration-150 flex items-center gap-2 cursor-pointer ${
              subTab === 'team'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4.5 h-4.5" />
            Profissionais &amp; Equipe
            <span className={`text-[10px] py-0.5 px-1.5 rounded-full font-extrabold ${subTab === 'team' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-500'}`}>
              {platformUsers.length}
            </span>
          </button>
        </nav>
      </div>

      {subTab === 'patients' ? (
        selectedPatient ? null : (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select 
                  value={genderFilter} 
                  onChange={(e) => { setGenderFilter(e.target.value); setCurrentPage(1); }}
                  className="bg-transparent border-none text-slate-700 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="all">Todos os Gêneros</option>
                  <option value="M">Masculino (Meninos)</option>
                  <option value="F">Feminino (Meninas)</option>
                </select>
              </div>
              <span className="text-xs text-slate-400 font-semibold">
                Mostrando {filteredPatients.length} pacientes ativos
              </span>
            </div>

            <button
              onClick={() => setIsPatientModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-lg transition duration-200 cursor-pointer shadow-md shadow-teal-600/10"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Novo Paciente</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPatients.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-xl border border-slate-100">
                Nenhum paciente localizado de acordo com os critérios informados.
              </div>
            ) : (
              paginatedPatients.map((p) => {
                const patAptsCount = appointments.filter(a => a.patientId === p.id).length;
                return (
                  <div 
                    key={p.id}
                    onClick={() => { setSelectedPatient(p); setPatientSheetTab('overview'); setIsEvaluationFormOpen(false); setEvaluationAreaTab('models'); }}
                    className="bg-white rounded-xl border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition duration-200 cursor-pointer relative"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl ${p.avatarColor} text-white flex items-center justify-center font-bold text-base shadow-sm`}>
                          {p.name.charAt(0)}{p.name.split(' ').length > 1 ? p.name.split(' ')[1].charAt(0) : ''}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-base tracking-tight hover:text-teal-600 transition">{p.name}</h4>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{p.id}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-2 border-t border-slate-50 text-xs text-slate-600">
                        <div>
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase">Responsável</span>
                          <span className="font-bold text-slate-700 truncate block">{p.parentsName}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase">Nascimento</span>
                          <span className="font-medium">{new Date(p.birthDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase">Idade Estimada</span>
                          <span className="font-semibold text-slate-800">{p.ageText}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase">Sexo</span>
                          <span className="font-medium">{p.gender === 'M' ? 'Masculino' : 'Feminino'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {patAptsCount} Atendimentos
                      </span>
                      <span className="text-teal-600 font-bold hover:underline flex items-center gap-1">
                        Ver Ficha Clínica
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Tem certeza de que deseja remover o paciente ${p.name}?`)) {
                          onDeletePatient(p.id);
                        }
                      }}
                      className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-slate-50 transition"
                      title="Excluir ficha"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
        )
      ) : (
        /* ==================== TEAM VIEW ==================== */
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select 
                  value={roleFilter} 
                  onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
                  className="bg-transparent border-none text-slate-700 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="all">Todas as Funções</option>
                  <option value="Médico">Médicos Requisitados</option>
                  <option value="Recepcionista">Secretaria &amp; Recepção</option>
                </select>
              </div>
              <span className="text-xs text-slate-400 font-semibold_ ml-2">
                Mostrando {filteredTeam.length} funcionários
              </span>
            </div>

            <button
              onClick={() => setIsStaffModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-lg transition duration-200 cursor-pointer shadow-md shadow-teal-600/10"
            >
              <UserPlus className="w-4 h-4" />
              <span>Cadastrar Membro na Equipe</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4 px-6 text-slate-600">ID / Nome</th>
                  <th className="py-4 px-6 text-slate-600">Função</th>
                  <th className="py-4 px-6 text-slate-600">Contato Direto</th>
                  <th className="py-4 px-6 text-slate-600">Atributos / CRM</th>
                  <th className="py-4 px-6 text-slate-600">Status</th>
                  <th className="py-4 px-6 text-slate-600 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {paginatedTeam.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      Nenhum profissional localizado com os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  paginatedTeam.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50/20 transition">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg ${member.avatarColor} text-white flex items-center justify-center font-bold text-xs shadow-xs`}>
                            {member.name.charAt(0)}{member.name.split(' ').length > 1 ? member.name.split(' ')[1].charAt(0) : ''}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">{member.name}</h4>
                            <span className="text-[10px] text-slate-400 font-bold">{member.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                          member.role === 'Médico'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
                            : 'bg-indigo-50 text-indigo-800 border-indigo-100'
                        }`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="py-4 px-6 space-y-1">
                        <div className="text-xs text-slate-700 flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{member.email}</span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{member.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {member.role === 'Médico' ? (
                          <div className="text-xs text-slate-600">
                            <span className="font-bold block text-emerald-700 text-[11px] uppercase">{member.specialty}</span>
                            <span className="text-[10px] text-slate-400">{member.crm}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 pl-1.5 pr-2 py-0.5 rounded-full text-xs font-semibold ${
                          member.status === 'Ativo' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Ativo' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                          {member.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onTogglePlatformUser(member.id)}
                            className={`p-1.5 rounded-lg border transition duration-150 ${
                              member.status === 'Ativo'
                                ? 'bg-stone-50 border-stone-100 text-stone-500 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-100'
                                : 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white'
                            }`}
                            title={member.status === 'Ativo' ? 'Suspender' : 'Reativar'}
                          >
                            <Power className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Excluir ${member.name} do diretório de funcionários?`)) {
                                onDeletePlatformUser(member.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white transition duration-150"
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
      )}


      
      {totalPages > 1 && !selectedPatient && (
        <div id="users-pagination-footer" className="p-4 bg-white rounded-xl border border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-semibold">
            Página <strong className="text-slate-800">{currentPage}</strong> de <strong className="text-slate-800">{totalPages}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}


      
      {selectedPatient && subTab === 'patients' && (
        <div className="animate-fade-in">
          <div className="bg-white w-full rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            
            
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${selectedPatient.avatarColor} text-white flex items-center justify-center font-bold`}>
                  {selectedPatient.name.charAt(0)}{selectedPatient.name.split(' ').length > 1 ? selectedPatient.name.split(' ')[1].charAt(0) : ''}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-white tracking-tight">{selectedPatient.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                    <span>Nascimento: {new Date(selectedPatient.birthDate).toLocaleDateString('pt-BR')} ({selectedPatient.ageText})</span>
                    <span>•</span>
                    <span className="text-teal-400 font-bold uppercase tracking-wider">{selectedPatient.id}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPatient(null)}
                className="flex items-center gap-2 text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition cursor-pointer text-xs font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                Listagem de pacientes
              </button>
            </div>

            
            <div className="bg-slate-100 border-b border-slate-200 px-6 py-2 flex gap-4">
              <button
                onClick={() => { setPatientSheetTab('overview'); setIsEvaluationFormOpen(false); }}
                className={`flex items-center gap-1.5 py-2 px-3 text-xs font-bold rounded-lg transition ${
                  patientSheetTab === 'overview' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                Visão Geral
              </button>

              <button
                onClick={() => { setPatientSheetTab('lastAssessment'); setIsEvaluationFormOpen(false); }}
                className={`flex items-center gap-1.5 py-2 px-3 text-xs font-bold rounded-lg transition ${
                  patientSheetTab === 'lastAssessment' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <ClipboardCheck className="w-4 h-4" />
                Última Avaliação
              </button>

              <button
                onClick={() => { setPatientSheetTab('avatar'); setIsEvaluationFormOpen(false); }}
                className={`flex items-center gap-1.5 py-2 px-3 text-xs font-bold rounded-lg transition ${
                  patientSheetTab === 'avatar' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <UserCircle className="w-4 h-4" />
                Avatar
              </button>

              <button
                onClick={() => setPatientSheetTab('evaluations')}
                className={`flex items-center gap-1.5 py-2 px-3 text-xs font-bold rounded-lg transition ${
                  patientSheetTab === 'evaluations' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <ListChecks className="w-4 h-4" />
                Avaliações
              </button>
            </div>

            
            <div className="p-6 space-y-6">
              
              {patientSheetTab === 'overview' && (
                /* DOSSIE & MEDICAL LOG */
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                      <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Contato do Responsável Legal</h4>
                      <div className="text-sm font-bold text-slate-800 mt-1">{selectedPatient.parentsName}</div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-405" />
                        <span>{selectedPatient.phone}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1 justify-center flex flex-col">
                      <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Status sob Tutela</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                        <span className="text-sm font-bold text-slate-700">Tratamento Multidisciplinar Ativo</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block pt-0.5">Criado em: {new Date(selectedPatient.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-800 border-b pb-2 mb-3">Histórico de Sessões e Evoluções Registradas</h4>
                    {selectedPatientAppointments.length === 0 ? (
                      <p className="text-xs text-slate-400 py-6 text-center">Nenhum atendimento anotado no prontuário ainda.</p>
                    ) : (
                      <div className="space-y-4">
                        {selectedPatientAppointments.map((apt) => (
                          <div key={apt.id} className="p-4 bg-white rounded-xl border border-slate-200 text-left space-y-2 hover:bg-slate-50/50 transition duration-150">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[11px] font-bold text-slate-400">{new Date(apt.date).toLocaleDateString('pt-BR')} às {apt.time}</span>
                                <h5 className="font-bold text-slate-800 text-sm mt-0.5">{apt.type} • com {apt.doctorName}</h5>
                              </div>
                              <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-full ${
                                apt.status === 'Finalizado' ? 'bg-emerald-50 text-emerald-700' : 'bg-teal-50 text-teal-700'
                              }`}>{apt.status}</span>
                            </div>

                            
                            <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100 mt-1 lines-clamp-3">
                              <strong>Indicação/Queixa:</strong> {apt.notes || 'Sem anotações anotadas.'}
                            </div>

                            
                            {apt.evolutionRegistered && (
                              <div className="text-xs text-teal-900 bg-teal-50/40 p-2.5 rounded border border-teal-100/50">
                                <strong>Evolução do Caso:</strong> {apt.evolutionRegistered}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {patientSheetTab === 'lastAssessment' && (
                /* PROTOCOLO DENVER II SCORING GRID */
                <div className="space-y-6">
                  
                  
                  <div className="p-5 bg-teal-900 text-white rounded-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-teal-800 pb-3">
                      <div>
                        <h4 className="text-base font-bold text-white">Última Avaliação</h4>
                        <p className="text-xs text-teal-300">Resumo dos últimos marcos clínicos registrados para o paciente.</p>
                      </div>
                      <span className="text-xs bg-teal-800 font-mono text-teal-300 px-3 py-1 rounded-md font-bold">
                        Calculado em Tempo Real
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
                      <div className="bg-teal-950/40 p-3 rounded-lg border border-teal-800/40 text-center">
                        <span className="block text-[10px] text-teal-300 uppercase font-bold tracking-wider">Pessoal-Social</span>
                        <div className="text-2xl font-extrabold text-white mt-1">{domainDevelopmentPercentages.personalSocial}%</div>
                      </div>
                      
                      <div className="bg-teal-950/40 p-3 rounded-lg border border-teal-800/40 text-center">
                        <span className="block text-[10px] text-teal-300 uppercase font-bold tracking-wider">Motor Fino-Adapt.</span>
                        <div className="text-2xl font-extrabold text-white mt-1">{domainDevelopmentPercentages.fineMotor}%</div>
                      </div>

                      <div className="bg-teal-950/40 p-3 rounded-lg border border-teal-800/40 text-center">
                        <span className="block text-[10px] text-teal-300 uppercase font-bold tracking-wider">Linguagem</span>
                        <div className="text-2xl font-extrabold text-white mt-1">{domainDevelopmentPercentages.language}%</div>
                      </div>

                      <div className="bg-teal-950/40 p-3 rounded-lg border border-teal-800/40 text-center">
                        <span className="block text-[10px] text-teal-300 uppercase font-bold tracking-wider">Motor Grosso</span>
                        <div className="text-2xl font-extrabold text-white mt-1">{domainDevelopmentPercentages.grossMotor}%</div>
                      </div>
                    </div>
                  </div>

                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Checklist de Triagem Corporal</h4>
                      <p className="text-xs text-slate-400">Selecione o progresso do paciente em cada marco de triagem abaixo:</p>
                    </div>

                    
                    <div className="p-5 bg-white rounded-xl border border-slate-200">
                      <h5 className="font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-2.5 mb-4">
                        <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                        Domínio Pessoal-Social
                      </h5>
                      <div className="divide-y divide-slate-50 space-y-3">
                        {domainMilestones.personalSocial.map(ms => (
                          <div key={ms.id} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
                            <div className="space-y-0.5 text-left">
                              <span className="font-bold text-slate-800">{ms.description}</span>
                              <p className="text-[11px] text-slate-400">Idade Alvo: {ms.rangeAgeMonths}</p>
                            </div>
                            <select
                              value={ms.status}
                              onChange={(e) => onUpdateDenverMilestone(ms.id, e.target.value as any)}
                              className={`p-2 bg-slate-50 border rounded-lg text-xs font-bold outline-none cursor-pointer ${
                                ms.status === 'concluido' ? 'text-emerald-700 bg-emerald-50/50' : ms.status === 'atrasado' ? 'text-rose-700 bg-rose-50' : 'text-slate-600'
                              }`}
                            >
                              <option value="concluido">✓ Concluído</option>
                              <option value="não-concluido">⌛ Não Concluído</option>
                              <option value="atrasado">⚠ Atrasado / Alerta</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>

                    
                    <div className="p-5 bg-white rounded-xl border border-slate-200">
                      <h5 className="font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-2.5 mb-4">
                        <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
                        Domínio Motor Fino-Adaptativo
                      </h5>
                      <div className="divide-y divide-slate-50 space-y-3">
                        {domainMilestones.fineMotor.map(ms => (
                          <div key={ms.id} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
                            <div className="space-y-0.5 text-left">
                              <span className="font-bold text-slate-800">{ms.description}</span>
                              <p className="text-[11px] text-slate-400">Idade Alvo: {ms.rangeAgeMonths}</p>
                            </div>
                            <select
                              value={ms.status}
                              onChange={(e) => onUpdateDenverMilestone(ms.id, e.target.value as any)}
                              className={`p-2 bg-slate-50 border rounded-lg text-xs font-bold outline-none cursor-pointer ${
                                ms.status === 'concluido' ? 'text-emerald-700 bg-emerald-50/50' : ms.status === 'atrasado' ? 'text-rose-700 bg-rose-50' : 'text-slate-600'
                              }`}
                            >
                              <option value="concluido">✓ Concluído</option>
                              <option value="não-concluido">⌛ Não Concluído</option>
                              <option value="atrasado">⚠ Atrasado / Alerta</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>

                    
                    <div className="p-5 bg-white rounded-xl border border-slate-200">
                      <h5 className="font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-2.5 mb-4">
                        <span className="w-3 h-3 bg-sky-500 rounded-full"></span>
                        Domínio de Linguagem (Comunicação)
                      </h5>
                      <div className="divide-y divide-slate-50 space-y-3">
                        {domainMilestones.language.map(ms => (
                          <div key={ms.id} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
                            <div className="space-y-0.5 text-left">
                              <span className="font-bold text-slate-800">{ms.description}</span>
                              <p className="text-[11px] text-slate-400">Idade Alvo: {ms.rangeAgeMonths}</p>
                            </div>
                            <select
                              value={ms.status}
                              onChange={(e) => onUpdateDenverMilestone(ms.id, e.target.value as any)}
                              className={`p-2 bg-slate-50 border rounded-lg text-xs font-bold outline-none cursor-pointer ${
                                ms.status === 'concluido' ? 'text-emerald-700 bg-emerald-50/50' : ms.status === 'atrasado' ? 'text-rose-700 bg-rose-50' : 'text-slate-600'
                              }`}
                            >
                              <option value="concluido">✓ Concluído</option>
                              <option value="não-concluido">⌛ Não Concluído</option>
                              <option value="atrasado">⚠ Atrasado / Alerta</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>

                    
                    <div className="p-5 bg-white rounded-xl border border-slate-200">
                      <h5 className="font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-2.5 mb-4">
                        <span className="w-3 h-3 bg-violet-500 rounded-full"></span>
                        Domínio Motor Grosso (Postura e Equilíbrio)
                      </h5>
                      <div className="divide-y divide-slate-50 space-y-3">
                        {domainMilestones.grossMotor.map(ms => (
                          <div key={ms.id} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
                            <div className="space-y-0.5 text-left">
                              <span className="font-bold text-slate-800">{ms.description}</span>
                              <p className="text-[11px] text-slate-400">Idade Alvo: {ms.rangeAgeMonths}</p>
                            </div>
                            <select
                              value={ms.status}
                              onChange={(e) => onUpdateDenverMilestone(ms.id, e.target.value as any)}
                              className={`p-2 bg-slate-50 border rounded-lg text-xs font-bold outline-none cursor-pointer ${
                                ms.status === 'concluido' ? 'text-emerald-700 bg-emerald-50/50' : ms.status === 'atrasado' ? 'text-rose-700 bg-rose-50' : 'text-slate-600'
                              }`}
                            >
                              <option value="concluido">✓ Concluído</option>
                              <option value="não-concluido">⌛ Não Concluído</option>
                              <option value="atrasado">⚠ Atrasado / Alerta</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {patientSheetTab === 'avatar' && (
                <div className="space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-slate-150 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Avatar do Paciente</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Identidade visual usada nos cards e na ficha clínica.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col items-center justify-center gap-4">
                    <div className={`w-28 h-28 rounded-3xl ${selectedPatient.avatarColor} text-white flex items-center justify-center font-extrabold text-4xl shadow-sm`}>
                      {selectedPatient.name.charAt(0)}{selectedPatient.name.split(' ').length > 1 ? selectedPatient.name.split(' ')[1].charAt(0) : ''}
                    </div>
                    <div className="text-center">
                      <h5 className="font-bold text-slate-800">{selectedPatient.name}</h5>
                      <p className="text-xs text-slate-400 mt-1">Avatar atual do prontuário</p>
                    </div>
                  </div>
                </div>
              )}

              {patientSheetTab === 'evaluations' && (
                <div className="space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-slate-150 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                        {evaluationAreaTab === 'reports'
                          ? 'Relatórios da Avaliação'
                          : isEvaluationFormOpen ? 'Preenchimento da Avaliação' : 'Modelos de Avaliação'}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {evaluationAreaTab === 'reports'
                          ? 'Gráficos de aprendizagem calculados a partir da última avaliação salva.'
                          : isEvaluationFormOpen
                          ? 'Itens agrupados automaticamente por nível e categoria do modelo.'
                          : 'Selecione um modelo disponível para iniciar o preenchimento.'}
                      </p>
                    </div>

                    {isEvaluationFormOpen ? (
                      <button
                        type="button"
                        onClick={() => setIsEvaluationFormOpen(false)}
                        className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-bold transition cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Voltar aos modelos
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-1">
                        <button
                          type="button"
                          onClick={() => setEvaluationAreaTab('models')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                            evaluationAreaTab === 'models' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <ListChecks className="w-4 h-4" />
                          Modelos
                        </button>
                        <button
                          type="button"
                          onClick={() => setEvaluationAreaTab('reports')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                            evaluationAreaTab === 'reports' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <BarChart3 className="w-4 h-4" />
                          Relatórios
                        </button>
                      </div>
                    )}
                  </div>

                  {evaluationAreaTab === 'reports' ? (
                    <div className="space-y-6">
                      <div className="bg-white rounded-xl border border-slate-200 p-4">
                        <span className="inline-flex -mt-8 mb-4 rounded bg-teal-600 px-4 py-2 text-sm font-bold text-white">Filtros</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <label className="space-y-1">
                            <span className="text-xs font-bold text-slate-500">Avaliação a ser comparada</span>
                            <select className="w-full rounded-lg border border-teal-500 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100">
                              <option>Comparar com Pontuação Máxima do Protocolo</option>
                            </select>
                          </label>
                          <label className="space-y-1">
                            <span className="text-xs font-bold text-slate-500">Nível</span>
                            <select
                              value={evaluationReportLevel}
                              onChange={(event) => {
                                const value = event.target.value;
                                setEvaluationReportLevel(value === 'consolidated' ? 'consolidated' : Number(value));
                              }}
                              className="w-full rounded-lg border border-teal-500 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100"
                            >
                              <option value="consolidated">Consolidado</option>
                              {evaluationModel.niveis.map((level) => (
                                <option key={level.nivel} value={level.nivel}>Nível {level.nivel}</option>
                              ))}
                            </select>
                          </label>
                        </div>
                      </div>

                      {savedEvaluationScores.length === 0 ? (
                        <div className="py-12 bg-slate-50 text-center rounded-xl border border-slate-100 text-slate-400 text-xs">
                          Nenhuma avaliação salva para gerar gráficos. Preencha um modelo e use o botão Salvar no fim da avaliação.
                        </div>
                      ) : (
                        <>
                          <div className="bg-white rounded-xl border border-slate-200 p-4">
                            <span className="inline-flex -mt-8 mb-4 rounded bg-teal-600 px-4 py-2 text-sm font-bold text-white">Gráfico de Esferas</span>
                            <div className="h-[620px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart
                                  data={visibleEvaluationScores}
                                  cx="50%"
                                  cy="48%"
                                  outerRadius="68%"
                                  margin={{ top: 48, right: 96, bottom: 72, left: 96 }}
                                >
                                  <PolarGrid stroke="#e5e7eb" />
                                  <PolarAngleAxis
                                    dataKey="code"
                                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                                  />
                                  <PolarRadiusAxis
                                    angle={90}
                                    domain={[0, 100]}
                                    ticks={[20, 40, 60, 80, 100]}
                                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                                    axisLine={false}
                                  />
                                  <Radar
                                    name="Pontuação Máxima do Protocolo"
                                    dataKey="maxScore"
                                    stroke="#c59168"
                                    fill="#c59168"
                                    fillOpacity={0.10}
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: '#c59168' }}
                                  />
                                  <Radar
                                    name="Avaliação Atual"
                                    dataKey="score"
                                    stroke="#7c3aed"
                                    fill="#7c3aed"
                                    fillOpacity={0.28}
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#7c3aed', stroke: '#ffffff', strokeWidth: 2 }}
                                  />
                                  <Legend verticalAlign="bottom" height={40} wrapperStyle={{ paddingTop: 24 }} />
                                  <Tooltip />
                                </RadarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl border border-slate-200 p-4">
                            <span className="inline-flex -mt-8 mb-4 rounded bg-teal-600 px-4 py-2 text-sm font-bold text-white">Gráfico de Barras</span>
                            <div className="h-[640px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={visibleEvaluationScores} layout="vertical" margin={{ top: 12, right: 28, left: 42, bottom: 20 }}>
                                  <CartesianGrid stroke="#eef2f7" />
                                  <XAxis type="number" domain={[0, 100]} tick={{ fill: '#0f172a', fontSize: 12 }} />
                                  <YAxis type="category" dataKey="code" width={42} tick={{ fill: '#0f172a', fontSize: 12 }} />
                                  <Tooltip />
                                  <Legend />
                                  <Bar dataKey="maxScore" name="Pontuação Máxima do Protocolo" fill="#c59168" radius={[0, 4, 4, 0]} />
                                  <Bar dataKey="score" name="Avaliação Atual" fill="#7c3aed" radius={[0, 4, 4, 0]} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : !isEvaluationFormOpen ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setIsEvaluationFormOpen(true)}
                        className="bg-white rounded-xl border border-slate-200 p-5 text-left hover:border-teal-300 hover:shadow-md transition duration-200 cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div className="space-y-2">
                            <div>
                              <h5 className="font-bold text-slate-800">ESDM</h5>
                              <p className="text-xs text-slate-400">{evaluationModel.titulo}</p>
                            </div>
                            <p className="text-xs leading-relaxed text-slate-500">
                              {evaluationModel.niveis.length} níveis, com categorias e competências carregadas dinamicamente do JSON.
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <form className="space-y-8" onSubmit={(event) => event.preventDefault()}>
                      <div className="bg-teal-900 text-white rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <h5 className="text-base font-bold">ESDM</h5>
                          <p className="text-xs text-teal-200 mt-1">{selectedPatient.name} • preenchimento em andamento</p>
                        </div>
                        <span className="text-xs bg-teal-800 text-teal-100 px-3 py-1 rounded-md font-bold">
                          {Object.keys(evaluationAnswers).length} objetivos respondidos
                        </span>
                      </div>

                      {evaluationModel.niveis.map((level) => (
                        <section key={level.nivel} className="space-y-5">
                          <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                            <span className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center text-sm font-extrabold">
                              {level.nivel}
                            </span>
                            <div>
                              <h5 className="font-bold text-slate-800">Nível {level.nivel}</h5>
                              <p className="text-xs text-slate-400">{level.categorias.length} categorias neste nível</p>
                            </div>
                          </div>

                          {level.categorias.map((category) => (
                            <div key={`${level.nivel}-${category.nome}`} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                                <h6 className="text-sm font-bold text-slate-800">{category.nome}</h6>
                                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{category.itens.length} objetivos</span>
                              </div>

                              <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[820px]">
                                  <thead>
                                    <tr className="bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                                      <th className="py-3 px-4 w-20">Nível</th>
                                      <th className="py-3 px-4 w-20">Item</th>
                                      <th className="py-3 px-4">Objetivo</th>
                                      {evaluationOptions.map((option) => (
                                        <th key={option.value} className="py-3 px-2 text-center w-28">{option.label}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 text-xs">
                                    {category.itens.map((item) => {
                                      const answerKey = `${level.nivel}-${category.nome}-${item.numero}`;
                                      return (
                                        <tr key={answerKey} className="odd:bg-white even:bg-slate-50/60">
                                          <td className="py-3 px-4 font-bold text-slate-500">Nível {level.nivel}</td>
                                          <td className="py-3 px-4 font-mono text-slate-500">{item.numero}</td>
                                          <td className="py-3 px-4 text-slate-700">
                                            <div className="flex items-center gap-2">
                                              <span>{item.competencia}</span>
                                              <span className="relative group shrink-0" title={item.descricao}>
                                                <Info className="w-4 h-4 text-slate-400 hover:text-teal-600 cursor-help" />
                                                <span className="pointer-events-none absolute left-1/2 top-6 z-20 hidden w-72 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-3 text-[11px] leading-relaxed text-slate-600 shadow-xl group-hover:block">
                                                  {item.descricao}
                                                </span>
                                              </span>
                                            </div>
                                          </td>
                                          {evaluationOptions.map((option) => (
                                            <td key={option.value} className="py-3 px-2 text-center">
                                              <label className="inline-flex items-center justify-center cursor-pointer">
                                                <input
                                                  type="radio"
                                                  name={answerKey}
                                                  value={option.value}
                                                  checked={evaluationAnswers[answerKey] === option.value}
                                                  onChange={() => setEvaluationAnswers((current) => ({ ...current, [answerKey]: option.value }))}
                                                  className="sr-only peer"
                                                />
                                                <span className="w-5 h-5 rounded border border-slate-300 bg-white peer-checked:bg-teal-600 peer-checked:border-teal-600 peer-focus:ring-2 peer-focus:ring-teal-100 transition flex items-center justify-center">
                                                  {evaluationAnswers[answerKey] === option.value && (
                                                    <span className="w-2 h-2 rounded-sm bg-white"></span>
                                                  )}
                                                </span>
                                              </label>
                                            </td>
                                          ))}
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ))}
                        </section>
                      ))}

                      <div className="sticky bottom-0 z-10 rounded-xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <h5 className="text-sm font-bold text-slate-800">Salvar avaliação</h5>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Calcula a nota média em porcentagem por categoria e disponibiliza os gráficos de aprendizagem.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleSaveEvaluationScores}
                          disabled={Object.keys(evaluationAnswers).length === 0}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-600/10 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                        >
                          <Save className="w-4 h-4" />
                          Salvar e gerar relatórios
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

            </div>

            
            <div className="p-4 bg-slate-50 border-t border-slate-150 flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span className="flex items-center gap-1">
                <Brain className="w-4 h-4 text-teal-650" />
                Hospitalis Triagem Digital v1.4
              </span>
              <span>Criptografia Clinica ponta-a-ponta</span>
            </div>
          </div>
        </div>
      )}


      
      {isPatientModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 animate-slide-up">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Baby className="w-5 h-5 text-teal-400" />
                <div>
                  <h3 className="font-sans font-bold text-lg text-white">Cadastrar Novo Paciente</h3>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wide">Módulo de Prontuário Central</p>
                </div>
              </div>
              <button onClick={() => setIsPatientModalOpen(false)} className="text-slate-400 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePatient} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-400 uppercase">Nome Completo da Criança *</label>
                <input
                  type="text"
                  required
                  value={newPatName}
                  onChange={(e) => setNewPatName(e.target.value)}
                  placeholder="Ex: Pedro Henrique Vasconcelos"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase">Data de Nascimento *</label>
                  <input
                    type="date"
                    required
                    value={newPatBirthDate}
                    onChange={(e) => setNewPatBirthDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase">Gênero *</label>
                  <select
                    value={newPatGender}
                    onChange={(e) => setNewPatGender(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100"
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase">Idade Cronológica Estimada *</label>
                  <input
                    type="text"
                    required
                    value={newPatAgeText}
                    onChange={(e) => setNewPatAgeText(e.target.value)}
                    placeholder="Ex: 2 anos e 3 meses"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase">Telefone Celular do Pai/Mãe *</label>
                  <input
                    type="text"
                    required
                    value={newPatPhone}
                    onChange={(e) => setNewPatPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-400 uppercase">Nome Completo dos Pais / Responsáveis *</label>
                <input
                  type="text"
                  required
                  value={newPatParentsName}
                  onChange={(e) => setNewPatParentsName(e.target.value)}
                  placeholder="Ex: Juliana Prado Castilho e Carlos Castilho"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div className="pt-4 border-t flex items-center justify-end gap-3 text-sm">
                <button type="button" onClick={() => setIsPatientModalOpen(false)} className="px-4 py-2 border hover:bg-slate-50 rounded-lg font-semibold cursor-pointer">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold shadow-lg shadow-teal-600/10 cursor-pointer">Salvar Paciente</button>
              </div>
            </form>
          </div>
        </div>
      )}


      
      {isStaffModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 animate-slide-up">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
                <div>
                  <h3 className="font-sans font-bold text-lg text-white">Cadastrar Membro na Equipe</h3>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wide">Módulo de Organização Central</p>
                </div>
              </div>
              <button onClick={() => setIsStaffModalOpen(false)} className="text-slate-400 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-400 uppercase">Função Corporativa *</label>
                <select
                  value={newStaffRole}
                  onChange={(e) => setNewStaffRole(e.target.value as UserRole)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100"
                >
                  <option value="Médico">Médico Clínico / Terapeuta</option>
                  <option value="Recepcionista">Secretaria / Portaria</option>
                  <option value="Administrador">Administrador Geral</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-400 uppercase">Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={newStaffName}
                  onChange={(e) => setNewStaffName(e.target.value)}
                  placeholder="Ex: Dra. Larissa Bittencourt"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase">E-mail Corporativo *</label>
                  <input
                    type="email"
                    required
                    value={newStaffEmail}
                    onChange={(e) => setNewStaffEmail(e.target.value)}
                    placeholder="larissa@hospitalis.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase">Celular / Telefone *</label>
                  <input
                    type="text"
                    required
                    value={newStaffPhone}
                    onChange={(e) => setNewStaffPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              {newStaffRole === 'Médico' && (
                <div className="p-4 bg-teal-50/50 rounded-lg border border-teal-100 grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-teal-800 uppercase">Especialidade Clínica</label>
                    <input
                      type="text"
                      required
                      value={newStaffSpecialty}
                      onChange={(e) => setNewStaffSpecialty(e.target.value)}
                      placeholder="Ex: Psicopedagoga"
                      className="w-full p-2 bg-white border border-teal-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-teal-800 uppercase">CRM / CRP Registro</label>
                    <input
                      type="text"
                      required
                      value={newStaffCRM}
                      onChange={(e) => setNewStaffCRM(e.target.value)}
                      placeholder="CRP/SP 12345"
                      className="w-full p-2 bg-white border border-teal-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-100"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t flex items-center justify-end gap-3 text-sm">
                <button type="button" onClick={() => setIsStaffModalOpen(false)} className="px-4 py-2 border hover:bg-slate-50 rounded-lg font-semibold cursor-pointer">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold shadow-lg shadow-teal-600/10 cursor-pointer">Confirmar Cadastro</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
