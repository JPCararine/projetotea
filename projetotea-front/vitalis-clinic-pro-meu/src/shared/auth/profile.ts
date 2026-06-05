import { AuthUser } from './session';

const AUTH_SERVER_URL = import.meta.env.VITE_AUTH_SERVER_URL || 'http://localhost:8081';

function toTitleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function formatDisplayName(value: string) {
  const cleanValue = value
    .split('@')[0]
    .replace(/[._-]+/g, ' ')
    .trim();

  if (!cleanValue) {
    return 'Usuário logado';
  }

  return toTitleCase(cleanValue);
}

function resolveInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function resolveAuthorities(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String);
  }

  if (typeof value === 'string') {
    return value.split(' ').filter(Boolean);
  }

  return [];
}

export interface UserInfoResponse {
  sub?: string;
  name?: string;
  display_name?: string;
  preferred_username?: string;
  email?: string;
  user_id?: number | string;
  authorities?: string[] | string;
  scope?: string;
}

export async function fetchCurrentUserProfile(accessToken: string): Promise<AuthUser> {
  const response = await fetch(`${AUTH_SERVER_URL}/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Não foi possível carregar os dados do usuário autenticado.');
  }

  const data = (await response.json()) as UserInfoResponse;
  const email = data.email || data.preferred_username || 'usuario@local';
  const displayName = data.display_name || data.name || formatDisplayName(email);
  const authorities = resolveAuthorities(data.authorities);
  const resolvedAuthorities = authorities.length > 0 ? authorities : resolveAuthorities(data.scope);
  const role = resolvedAuthorities[0] || 'Usuário';

  return {
    displayName,
    email,
    role,
    initials: resolveInitials(displayName),
    userId: data.user_id || data.sub,
    authorities: resolvedAuthorities,
  };
}
