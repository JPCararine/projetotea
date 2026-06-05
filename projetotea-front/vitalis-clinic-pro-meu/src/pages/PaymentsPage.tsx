import PaymentsView from '../contexts/payments/components/payments-view';

interface PaymentsPageProps {
  searchTerm: string;
}

export default function PaymentsPage(props: PaymentsPageProps) {
  return <PaymentsView {...props} />;
}
