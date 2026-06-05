import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  INITIAL_PATIENTS,
  INITIAL_SAAS_INVOICES,
  SAAS_PLANS,
} from '../../../data/mockData';
import { queryKeys } from '../../../shared/queries/queryKeys';
import { patientsService } from '../../../shared/services/patientsService';
import { paymentsService } from '../../../shared/services/paymentsService';

interface UsePaymentsViewModelParams {
  searchTerm: string;
}

export function usePaymentsViewModel({ searchTerm }: UsePaymentsViewModelParams) {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [payInvoiceModalId, setPayInvoiceModalId] = useState<string | null>(null);
  const [selectedPayMethod, setSelectedPayMethod] = useState<string>('Pix');

  const { data: invoices = INITIAL_SAAS_INVOICES } = useQuery({
    queryKey: queryKeys.saasInvoices,
    queryFn: paymentsService.getInvoices,
    initialData: INITIAL_SAAS_INVOICES,
  });

  const { data: plans = SAAS_PLANS } = useQuery({
    queryKey: queryKeys.saasPlans,
    queryFn: paymentsService.getPlans,
    initialData: SAAS_PLANS,
  });

  const { data: patients = INITIAL_PATIENTS } = useQuery({
    queryKey: queryKeys.patients,
    queryFn: patientsService.getAll,
    initialData: INITIAL_PATIENTS,
  });

  const patientsCount = patients.length;

  const invalidatePaymentsData = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.saasInvoices });
    queryClient.invalidateQueries({ queryKey: queryKeys.saasPlans });
  };

  const payInvoiceMutation = useMutation({
    mutationFn: ({ id, method }: { id: string; method: string }) => paymentsService.payInvoice(id, method),
    onSuccess: invalidatePaymentsData,
  });

  const selectPlanMutation = useMutation({
    mutationFn: paymentsService.selectPlan,
    onSuccess: invalidatePaymentsData,
  });

  const activePlan = useMemo(() => {
    return plans.find((plan) => plan.isCurrent) || plans[0];
  }, [plans]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch = invoice.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
      return matchesSearch && matchesStatus;
    }).sort((a, b) => b.dueDate.localeCompare(a.dueDate));
  }, [invoices, searchTerm, statusFilter]);

  const usagePercentage = useMemo(() => {
    return Math.round((patientsCount / activePlan.patientLimit) * 100);
  }, [patientsCount, activePlan]);

  const onPayInvoice = (id: string, method: string) => {
    payInvoiceMutation.mutate({ id, method });
  };

  const onSelectPlan = (planName: string) => {
    selectPlanMutation.mutate(planName);
  };

  const handleExecutePayment = () => {
    if (payInvoiceModalId) {
      onPayInvoice(payInvoiceModalId, selectedPayMethod);
      setPayInvoiceModalId(null);
      alert('Sua assinatura foi renovada e quitada com sucesso!');
    }
  };

  return {
    activePlan,
    filteredInvoices,
    handleExecutePayment,
    onSelectPlan,
    patientsCount,
    payInvoiceModalId,
    plans,
    selectedPayMethod,
    setPayInvoiceModalId,
    setSelectedPayMethod,
    setStatusFilter,
    statusFilter,
    usagePercentage,
  };
}
