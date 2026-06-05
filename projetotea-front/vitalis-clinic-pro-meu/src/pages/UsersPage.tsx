import UsersView from '../contexts/users/components/users-view';

interface UsersPageProps {
  searchTerm: string;
}

export default function UsersPage(props: UsersPageProps) {
  return <UsersView {...props} />;
}
