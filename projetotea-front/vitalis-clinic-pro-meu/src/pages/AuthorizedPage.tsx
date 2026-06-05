import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { clearAuthorizationCallbackState, getAuthorizationCallbackState } from '../shared/auth/pkce';
import {
  clearAuthSession,
  hasAuthSession,
  persistAuthTokens,
  storeAuthUser,
} from '../shared/auth/session';
import { fetchCurrentUserProfile } from '../shared/auth/profile';

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  scope?: string;
}

export default function AuthorizedPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'error'>('loading');
  const [message, setMessage] = useState('Finalizando autenticação...');

  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const callbackState = useMemo(() => getAuthorizationCallbackState(), []);

  useEffect(() => {
    const completeLogin = async () => {
      if (hasAuthSession()) {
        navigate('/dashboard', { replace: true });
        return;
      }

      if (!code || !state) {
        setStatus('error');
        setMessage('Callback inválido. O código de autorização não foi enviado.');
        return;
      }

      if (!callbackState.expectedState || callbackState.expectedState !== state || !callbackState.codeVerifier) {
        clearAuthorizationCallbackState();
        clearAuthSession();
        setStatus('error');
        setMessage('A sessão de autorização expirou. Tente entrar novamente.');
        return;
      }

      try {
        const response = await fetch(`${callbackState.authServerUrl}/oauth2/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: callbackState.redirectUri,
            client_id: import.meta.env.VITE_AUTH_CLIENT_ID || 'projetotea-web',
            code_verifier: callbackState.codeVerifier,
          }).toString(),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || 'Falha ao trocar o código por token.');
        }

        const data = (await response.json()) as TokenResponse;
        persistAuthTokens(data.access_token, data.refresh_token);

        const profile = await fetchCurrentUserProfile(data.access_token);
        storeAuthUser(profile);
        clearAuthorizationCallbackState();
        navigate('/dashboard', { replace: true });
      } catch (error) {
        clearAuthorizationCallbackState();
        clearAuthSession();
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Não foi possível concluir o login.');
      }
    };

    void completeLogin();
  }, [callbackState.authServerUrl, callbackState.codeVerifier, callbackState.expectedState, callbackState.redirectUri, code, navigate, state]);

  if (!code || !state) {
    return <Navigate to="/" replace />;
  }

  if (status === 'error') {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Autenticação
          </span>
          <h1 className="text-3xl font-semibold tracking-tight">Não foi possível entrar</h1>
          <p className="max-w-xl text-sm leading-6 text-slate-600">{message}</p>
          <button
            type="button"
            onClick={() => navigate('/', { replace: true })}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Voltar para a entrada
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-900">
      <div className="flex w-full max-w-md flex-col items-start gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
          Autenticação
        </span>
        <h1 className="text-3xl font-semibold tracking-tight">Conectando sua sessão</h1>
        <p className="text-sm leading-6 text-slate-600">{message}</p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-teal-500" />
        </div>
      </div>
    </main>
  );
}
