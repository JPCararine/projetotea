export interface AuthUser {
  displayName: string;
  email: string;
  role: string;
  initials: string;
  userId?: number | string;
  authorities: string[];
}

export interface TokenPayload {
  exp?: number;
  email?: string;
  name?: string;
  display_name?: string;
  preferred_username?: string;
  user_id?: number | string;
  authorities?: string[] | string;
  scope?: string;
}

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_REFRESH_TOKEN_KEY = 'auth_refresh_token';
const AUTH_USER_KEY = 'auth_user';

function decodeJwtPayload(token: string): TokenPayload | null {
  const parts = token.split('.');

  if (parts.length < 2) {
    return null;
  }

  try {
    const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(payload) as TokenPayload;
  } catch {
    return null;
  }
}

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

function resolveAuthorities(payload: TokenPayload): string[] {
  if (Array.isArray(payload.authorities)) {
    return payload.authorities;
  }

  if (typeof payload.authorities === 'string') {
    return [payload.authorities];
  }

  if (typeof payload.scope === 'string') {
    return payload.scope.split(' ').filter(Boolean);
  }

  return [];
}

function resolveInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function isTokenExpired(token: string) {
  const payload = decodeJwtPayload(token);

  if (!payload?.exp) {
    return false;
  }

  return payload.exp * 1000 <= Date.now();
}

export function hasAuthSession() {
  const token = getAuthToken();

  if (!token) {
    return false;
  }

  if (isTokenExpired(token)) {
    clearAuthSession();
    return false;
  }

  return true;
}

export function getStoredAuthUser(): AuthUser | null {
  const rawUser = localStorage.getItem(AUTH_USER_KEY);

  if (rawUser) {
    try {
      const parsed = JSON.parse(rawUser) as AuthUser;

      if (parsed?.displayName && parsed?.email) {
        return parsed;
      }
    } catch {
      // Fallback to token data below.
    }
  }

  const token = getAuthToken();

  if (!token) {
    return null;
  }

  const payload = decodeJwtPayload(token);

  if (!payload) {
    return null;
  }

  const email = payload.email || payload.preferred_username || 'usuario@local';
  const displayName = payload.display_name || payload.name || formatDisplayName(email);
  const authorities = resolveAuthorities(payload);
  const role = authorities[0] || 'Usuário';

  const user: AuthUser = {
    displayName,
    email,
    role,
    initials: resolveInitials(displayName),
    userId: payload.user_id,
    authorities,
  };

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  return user;
}

export function persistAuthTokens(accessToken: string, refreshToken?: string | null) {
  localStorage.setItem(AUTH_TOKEN_KEY, accessToken);

  if (refreshToken) {
    localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function storeAuthUser(user: AuthUser) {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function persistAuthSession(accessToken: string, refreshToken?: string | null) {
  persistAuthTokens(accessToken, refreshToken);

  const user = getStoredAuthUser();

  if (user) {
    storeAuthUser(user);
  }
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

