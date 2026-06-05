import React, { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  DENVER_DEFAULT_MILESTONES,
  INITIAL_APPOINTMENTS,
  INITIAL_DENVER_ASSESSMENTS,
  INITIAL_PATIENTS,
  INITIAL_PLATFORM_USERS,
} from '../../../data/mockData';
import {
  DenverAssessment,
  DenverMilestone,
  PatientSheetTab,
  Patient,
  PlatformUser,
  UserRole,
} from '../../../shared/interfaces';
import { queryKeys } from '../../../shared/queries/queryKeys';
import { appointmentsService } from '../../../shared/services/appointmentsService';
import { denverService } from '../../../shared/services/denverService';
import { patientsService } from '../../../shared/services/patientsService';
import { platformUsersService } from '../../../shared/services/platformUsersService';

interface UseUsersViewModelParams {
  searchTerm: string;
}

const itemsPerPage = 6;

export function useUsersViewModel({ searchTerm }: UseUsersViewModelParams) {
  const queryClient = useQueryClient();
  const [subTab, setSubTab] = useState<'patients' | 'team'>('patients');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isPatientModalOpen, setIsPatientModalOpen] = useState<boolean>(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientSheetTab, setPatientSheetTab] = useState<PatientSheetTab>('overview');
  const [isNewAssessmentFormOpen, setIsNewAssessmentFormOpen] = useState<boolean>(false);
  const [newAssessorName, setNewAssessorName] = useState<string>('Dr. Henrique Vasconcelos');
  const [newAssScorePS, setNewAssScorePS] = useState<number>(80);
  const [newAssScoreFM, setNewAssScoreFM] = useState<number>(85);
  const [newAssScoreL, setNewAssScoreL] = useState<number>(75);
  const [newAssScoreGM, setNewAssScoreGM] = useState<number>(90);
  const [newAssDecision, setNewAssDecision] = useState<DenverAssessment['status']>('Normal');
  const [newAssObservations, setNewAssObservations] = useState<string>('');
  const [newPatName, setNewPatName] = useState('');
  const [newPatBirthDate, setNewPatBirthDate] = useState('2024-05-15');
  const [newPatGender, setNewPatGender] = useState<Patient['gender']>('M');
  const [newPatParentsName, setNewPatParentsName] = useState('');
  const [newPatPhone, setNewPatPhone] = useState('');
  const [newPatAgeText, setNewPatAgeText] = useState('2 anos');
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffPhone, setNewStaffPhone] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<UserRole>('Médico');
  const [newStaffSpecialty, setNewStaffSpecialty] = useState('');
  const [newStaffCRM, setNewStaffCRM] = useState('');

  const { data: platformUsers = INITIAL_PLATFORM_USERS } = useQuery({
    queryKey: queryKeys.platformUsers,
    queryFn: platformUsersService.getAll,
    initialData: INITIAL_PLATFORM_USERS,
  });

  const { data: patients = INITIAL_PATIENTS } = useQuery({
    queryKey: queryKeys.patients,
    queryFn: patientsService.getAll,
    initialData: INITIAL_PATIENTS,
  });

  const { data: denverMilestones = DENVER_DEFAULT_MILESTONES } = useQuery({
    queryKey: queryKeys.denverMilestones,
    queryFn: denverService.getMilestones,
    initialData: DENVER_DEFAULT_MILESTONES,
  });

  const { data: denverAssessments = INITIAL_DENVER_ASSESSMENTS } = useQuery({
    queryKey: queryKeys.denverAssessments,
    queryFn: denverService.getAssessments,
    initialData: INITIAL_DENVER_ASSESSMENTS,
  });

  const { data: appointments = INITIAL_APPOINTMENTS } = useQuery({
    queryKey: queryKeys.appointments,
    queryFn: appointmentsService.getAll,
    initialData: INITIAL_APPOINTMENTS,
  });

  const invalidateUsersData = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.platformUsers });
    queryClient.invalidateQueries({ queryKey: queryKeys.patients });
    queryClient.invalidateQueries({ queryKey: queryKeys.appointments });
    queryClient.invalidateQueries({ queryKey: queryKeys.denverMilestones });
    queryClient.invalidateQueries({ queryKey: queryKeys.denverAssessments });
  };

  const addPlatformUserMutation = useMutation({
    mutationFn: platformUsersService.add,
    onSuccess: invalidateUsersData,
  });

  const togglePlatformUserMutation = useMutation({
    mutationFn: platformUsersService.toggleStatus,
    onSuccess: invalidateUsersData,
  });

  const deletePlatformUserMutation = useMutation({
    mutationFn: platformUsersService.delete,
    onSuccess: invalidateUsersData,
  });

  const addPatientMutation = useMutation({
    mutationFn: patientsService.add,
    onSuccess: invalidateUsersData,
  });

  const updatePatientMutation = useMutation({
    mutationFn: patientsService.update,
    onSuccess: invalidateUsersData,
  });

  const deletePatientMutation = useMutation({
    mutationFn: patientsService.delete,
    onSuccess: invalidateUsersData,
  });

  const updateDenverMilestoneMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: DenverMilestone['status'] }) =>
      denverService.updateMilestoneStatus(id, status),
    onSuccess: invalidateUsersData,
  });

  const addDenverAssessmentMutation = useMutation({
    mutationFn: denverService.addAssessment,
    onSuccess: invalidateUsersData,
  });

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.parentsName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm);
      const matchesGender = genderFilter === 'all' || patient.gender === genderFilter;
      return matchesSearch && matchesGender;
    });
  }, [patients, searchTerm, genderFilter]);

  const filteredTeam = useMemo(() => {
    return platformUsers.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.specialty && user.specialty.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [platformUsers, searchTerm, roleFilter]);

  const activeListLength = subTab === 'patients' ? filteredPatients.length : filteredTeam.length;
  const totalPages = Math.ceil(activeListLength / itemsPerPage) || 1;

  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPatients.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPatients, currentPage]);

  const paginatedTeam = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTeam.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTeam, currentPage]);

  const handleCreatePatient = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newPatName || !newPatParentsName || !newPatPhone) {
      alert('Preencha os dados obrigatórios!');
      return;
    }

    const colors = ['bg-sky-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-indigo-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    addPatientMutation.mutate({
      name: newPatName,
      birthDate: newPatBirthDate,
      gender: newPatGender,
      parentsName: newPatParentsName,
      phone: newPatPhone,
      ageText: newPatAgeText,
      status: 'Ativo',
      avatarColor: randomColor,
    });

    setNewPatName('');
    setNewPatParentsName('');
    setNewPatPhone('');
    setNewPatAgeText('2 anos');
    setIsPatientModalOpen(false);
  };

  const handleCreateStaff = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newStaffName || !newStaffEmail || !newStaffPhone) {
      alert('Preencha os dados obrigatórios!');
      return;
    }

    const colors = ['bg-teal-500', 'bg-indigo-500', 'bg-zinc-500', 'bg-orange-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    addPlatformUserMutation.mutate({
      name: newStaffName,
      email: newStaffEmail,
      phone: newStaffPhone,
      role: newStaffRole,
      status: 'Ativo',
      createdAt: new Date().toISOString().split('T')[0],
      avatarColor: randomColor,
      specialty: newStaffRole === 'Médico' ? newStaffSpecialty : undefined,
      crm: newStaffRole === 'Médico' ? newStaffCRM : undefined,
    });

    setNewStaffName('');
    setNewStaffEmail('');
    setNewStaffPhone('');
    setNewStaffSpecialty('');
    setNewStaffCRM('');
    setIsStaffModalOpen(false);
  };

  const handleCreateDenverAssessment = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedPatient) return;

    addDenverAssessmentMutation.mutate({
      patientId: selectedPatient.id,
      assessorName: newAssessorName,
      status: newAssDecision,
      scorePersonalSocial: Number(newAssScorePS),
      scoreFineMotor: Number(newAssScoreFM),
      scoreLanguage: Number(newAssScoreL),
      scoreGrossMotor: Number(newAssScoreGM),
      observations: newAssObservations || 'Triagem realizada com marcos adaptados de idade cronológica.',
    });

    setIsNewAssessmentFormOpen(false);
    setNewAssObservations('');
    setPatientSheetTab('evaluations');
  };

  const selectedPatientAppointments = useMemo(() => {
    if (!selectedPatient) return [];
    return appointments.filter((appointment) => appointment.patientId === selectedPatient.id);
  }, [selectedPatient, appointments]);

  const selectedPatientDenverAssessments = useMemo(() => {
    if (!selectedPatient) return [];
    return denverAssessments.filter((assessment) => assessment.patientId === selectedPatient.id);
  }, [selectedPatient, denverAssessments]);

  const domainMilestones = useMemo(() => {
    return {
      personalSocial: denverMilestones.filter((milestone) => milestone.domain === 'personal-social'),
      fineMotor: denverMilestones.filter((milestone) => milestone.domain === 'fine-motor'),
      language: denverMilestones.filter((milestone) => milestone.domain === 'language'),
      grossMotor: denverMilestones.filter((milestone) => milestone.domain === 'gross-motor'),
    };
  }, [denverMilestones]);

  const domainDevelopmentPercentages = useMemo(() => {
    const calcPercentage = (milestones: DenverMilestone[]) => {
      if (milestones.length === 0) return 0;
      const completed = milestones.filter((milestone) => milestone.status === 'concluido').length;
      return Math.round((completed / milestones.length) * 100);
    };

    return {
      personalSocial: calcPercentage(domainMilestones.personalSocial),
      fineMotor: calcPercentage(domainMilestones.fineMotor),
      language: calcPercentage(domainMilestones.language),
      grossMotor: calcPercentage(domainMilestones.grossMotor),
    };
  }, [domainMilestones]);

  return {
    appointments,
    currentPage,
    domainDevelopmentPercentages,
    domainMilestones,
    filteredPatients,
    filteredTeam,
    genderFilter,
    handleCreateDenverAssessment,
    handleCreatePatient,
    handleCreateStaff,
    isNewAssessmentFormOpen,
    isPatientModalOpen,
    isStaffModalOpen,
    newAssDecision,
    newAssObservations,
    newAssScoreFM,
    newAssScoreGM,
    newAssScoreL,
    newAssScorePS,
    newAssessorName,
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
    onAddDenverAssessment: addDenverAssessmentMutation.mutate,
    onAddPatient: addPatientMutation.mutate,
    onAddPlatformUser: addPlatformUserMutation.mutate,
    onDeletePatient: deletePatientMutation.mutate,
    onDeletePlatformUser: deletePlatformUserMutation.mutate,
    onTogglePlatformUser: togglePlatformUserMutation.mutate,
    onUpdateDenverMilestone: (id: string, status: DenverMilestone['status']) =>
      updateDenverMilestoneMutation.mutate({ id, status }),
    onUpdatePatient: updatePatientMutation.mutate,
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
    setIsNewAssessmentFormOpen,
    setIsPatientModalOpen,
    setIsStaffModalOpen,
    setNewAssDecision,
    setNewAssObservations,
    setNewAssScoreFM,
    setNewAssScoreGM,
    setNewAssScoreL,
    setNewAssScorePS,
    setNewAssessorName,
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
  };
}
