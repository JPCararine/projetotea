import { resolveMock } from '../api/client';
import { DenverAssessment, DenverMilestone } from '../interfaces';
import { mockStore } from './mockStore';

export const denverService = {
  getMilestones() {
    return resolveMock([...mockStore.denverMilestones]);
  },

  getAssessments() {
    return resolveMock([...mockStore.denverAssessments]);
  },

  updateMilestoneStatus(milestoneId: string, status: DenverMilestone['status']) {
    mockStore.denverMilestones = mockStore.denverMilestones.map((milestone) => {
      if (milestone.id === milestoneId) {
        return { ...milestone, status };
      }

      return milestone;
    });

    return resolveMock([...mockStore.denverMilestones]);
  },

  addAssessment(assessmentData: Omit<DenverAssessment, 'id' | 'date'>) {
    const newAssessment: DenverAssessment = {
      id: `da-${mockStore.denverAssessments.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      ...assessmentData,
    };

    mockStore.denverAssessments = [newAssessment, ...mockStore.denverAssessments];
    return resolveMock(newAssessment);
  },
};
