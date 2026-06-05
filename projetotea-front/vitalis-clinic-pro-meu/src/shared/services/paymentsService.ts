import { resolveMock } from '../api/client';
import { mockStore } from './mockStore';

export const paymentsService = {
  getInvoices() {
    return resolveMock([...mockStore.saasInvoices]);
  },

  getPlans() {
    return resolveMock([...mockStore.saasPlans]);
  },

  payInvoice(invoiceId: string, method: string) {
    mockStore.saasInvoices = mockStore.saasInvoices.map((invoice) => {
      if (invoice.id === invoiceId) {
        return {
          ...invoice,
          status: 'Pago' as const,
          paymentMethod: method,
          paymentDate: new Date().toISOString().split('T')[0],
        };
      }

      return invoice;
    });

    return resolveMock([...mockStore.saasInvoices]);
  },

  selectPlan(planName: string) {
    mockStore.saasPlans = mockStore.saasPlans.map((plan) => ({
      ...plan,
      isCurrent: plan.name === planName,
    }));

    return resolveMock([...mockStore.saasPlans]);
  },
};
