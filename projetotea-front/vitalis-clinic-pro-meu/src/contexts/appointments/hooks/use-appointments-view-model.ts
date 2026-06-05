import React, { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  INITIAL_APPOINTMENTS,
  INITIAL_PATIENTS,
  INITIAL_PLATFORM_USERS,
} from '../../../data/mockData';
import {
  Appointment,
  AppointmentStatus,
  AppointmentType,
} from '../../../shared/interfaces';
import { getAppointmentStatusBadgeClass } from '../../../shared/helpers/statusClasses';
import { queryKeys } from '../../../shared/queries/queryKeys';
import { appointmentsService } from '../../../shared/services/appointmentsService';
import { patientsService } from '../../../shared/services/patientsService';
import { platformUsersService } from '../../../shared/services/platformUsersService';

interface UseAppointmentsViewModelParams {
  searchTerm: string;
  setIsAddModalOpen: (open: boolean) => void;
}

export function useAppointmentsViewModel({
  searchTerm,
  setIsAddModalOpen,
}: UseAppointmentsViewModelParams) {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [doctorFilter, setDoctorFilter] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isEvolutionEditing, setIsEvolutionEditing] = useState<boolean>(false);
  const [editingNotes, setEditingNotes] = useState<string>('');
  const [editingEvolution, setEditingEvolution] = useState<string>('');
  const [newPatientId, setNewPatientId] = useState('');
  const [newDoctorId, setNewDoctorId] = useState('');
  const [newDate, setNewDate] = useState('2026-05-21');
  const [newTime, setNewTime] = useState('11:00');
  const [newType, setNewType] = useState<AppointmentType>('Triagem');
  const [newNotes, setNewNotes] = useState('');

  const { data: appointments = INITIAL_APPOINTMENTS } = useQuery({
    queryKey: queryKeys.appointments,
    queryFn: appointmentsService.getAll,
    initialData: INITIAL_APPOINTMENTS,
  });

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

  const doctors = useMemo(() => {
    return platformUsers.filter((user) => user.role === 'Médico');
  }, [platformUsers]);

  const invalidateAppointmentsData = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.appointments });
  };

  const addAppointmentMutation = useMutation({
    mutationFn: appointmentsService.add,
    onSuccess: invalidateAppointmentsData,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: AppointmentStatus }) =>
      appointmentsService.updateStatus(id, status),
    onSuccess: invalidateAppointmentsData,
  });

  const updateEvolutionMutation = useMutation({
    mutationFn: ({ id, notes, evolution }: { id: string; notes: string; evolution: string }) =>
      appointmentsService.updateEvolution(id, notes, evolution),
    onSuccess: invalidateAppointmentsData,
  });

  const deleteAppointmentMutation = useMutation({
    mutationFn: appointmentsService.delete,
    onSuccess: invalidateAppointmentsData,
  });

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorSpecialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (appointment.notes && appointment.notes.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
      const matchesDoctor = doctorFilter === 'all' || appointment.doctorName === doctorFilter;

      return matchesSearch && matchesStatus && matchesDoctor;
    }).sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    });
  }, [appointments, searchTerm, statusFilter, doctorFilter]);

  const onUpdateStatus = (id: string, status: AppointmentStatus) => {
    updateStatusMutation.mutate({ id, status });
  };

  const onUpdateEvolution = (id: string, notes: string, evolution: string) => {
    updateEvolutionMutation.mutate({ id, notes, evolution });
  };

  const onDeleteAppointment = (id: string) => {
    deleteAppointmentMutation.mutate(id);
  };

  const handleAddAppointment = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newPatientId || !newDoctorId || !newDate || !newTime) {
      alert('Por favor, preencha todos os campos do agendamento.');
      return;
    }

    const patient = patients.find((item) => item.id === newPatientId);
    const doctor = doctors.find((item) => item.id === newDoctorId);

    if (!patient || !doctor) {
      alert('Dados de paciente ou médico inválidos.');
      return;
    }

    addAppointmentMutation.mutate({
      patientId: newPatientId,
      patientName: patient.name,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty || 'Clínica Geral',
      date: newDate,
      time: newTime,
      status: 'Agendado',
      type: newType,
      notes: newNotes,
    });

    setNewPatientId('');
    setNewDoctorId('');
    setNewDate('2026-05-21');
    setNewTime('11:00');
    setNewType('Triagem');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  const handleSaveEvolution = () => {
    if (!selectedAppointment) return;
    onUpdateEvolution(selectedAppointment.id, editingNotes, editingEvolution);
    setIsEvolutionEditing(false);
    setSelectedAppointment((previous) =>
      previous ? { ...previous, notes: editingNotes, evolutionRegistered: editingEvolution } : null,
    );
  };

  return {
    doctors,
    doctorFilter,
    editingEvolution,
    editingNotes,
    filteredAppointments,
    getStatusBadgeClass: getAppointmentStatusBadgeClass,
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
  };
}
