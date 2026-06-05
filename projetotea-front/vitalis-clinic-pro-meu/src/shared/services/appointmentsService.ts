import { resolveMock } from '../api/client';
import { Appointment, AppointmentStatus } from '../interfaces';
import { mockStore } from './mockStore';

export const appointmentsService = {
  getAll() {
    return resolveMock([...mockStore.appointments]);
  },

  add(appointmentData: Omit<Appointment, 'id'>) {
    const newAppointment: Appointment = {
      id: `apt-${mockStore.appointments.length + 1}`,
      ...appointmentData,
    };

    mockStore.appointments = [newAppointment, ...mockStore.appointments];
    return resolveMock(newAppointment);
  },

  updateStatus(appointmentId: string, status: AppointmentStatus) {
    mockStore.appointments = mockStore.appointments.map((appointment) => {
      if (appointment.id === appointmentId) {
        return { ...appointment, status };
      }

      return appointment;
    });

    return resolveMock([...mockStore.appointments]);
  },

  updateEvolution(appointmentId: string, notes: string, evolution: string) {
    mockStore.appointments = mockStore.appointments.map((appointment) => {
      if (appointment.id === appointmentId) {
        return { ...appointment, notes, evolutionRegistered: evolution };
      }

      return appointment;
    });

    return resolveMock([...mockStore.appointments]);
  },

  delete(appointmentId: string) {
    mockStore.appointments = mockStore.appointments.filter((appointment) => appointment.id !== appointmentId);
    return resolveMock(appointmentId);
  },
};
