import { resolveMock } from '../api/client';
import { Patient } from '../interfaces';
import { mockStore } from './mockStore';

export const patientsService = {
  getAll() {
    return resolveMock([...mockStore.patients]);
  },

  add(patientData: Omit<Patient, 'id' | 'createdAt'>) {
    const newPatient: Patient = {
      id: `pat-${mockStore.patients.length + 1}`,
      createdAt: new Date().toISOString().split('T')[0],
      ...patientData,
    };

    mockStore.patients = [...mockStore.patients, newPatient];
    return resolveMock(newPatient);
  },

  update(patient: Patient) {
    mockStore.patients = mockStore.patients.map((item) => (item.id === patient.id ? patient : item));
    return resolveMock(patient);
  },

  delete(patientId: string) {
    mockStore.patients = mockStore.patients.filter((patient) => patient.id !== patientId);
    mockStore.appointments = mockStore.appointments.filter((appointment) => appointment.patientId !== patientId);
    return resolveMock(patientId);
  },
};
