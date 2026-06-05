const AUTH_SERVER_URL = import.meta.env.VITE_AUTH_SERVER_URL || 'http://localhost:8081';
const CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID || 'projetotea-web';
const SCOPE = import.meta.env.VITE_AUTH_SCOPE || 'openid profile email READ WRITE';
const REDIRECT_URI = `${window.location.origin}/authorized`;
const STATE_KEY = 'oauth_state';
const VERIFIER_KEY = 'oauth_code_verifier';

function base64UrlEncode(bytes: Uint8Array) {
  let result = '';

  bytes.forEach((byte) => {
    result += String.fromCharCode(byte);
  });

  return btoa(result)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

async function sha256(value: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(hash));
}

function randomVerifier() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return base64UrlEncode(bytes);
}

export async function buildAuthorizeUrl() {
  const codeVerifier = randomVerifier();
  const codeChallenge = await sha256(codeVerifier);
  const state = crypto.randomUUID();

  sessionStorage.setItem(STATE_KEY, state);
  sessionStorage.setItem(VERIFIER_KEY, codeVerifier);

  const url = new URL('/oauth2/authorize', AUTH_SERVER_URL);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', CLIENT_ID);
  url.searchParams.set('redirect_uri', REDIRECT_URI);
  url.searchParams.set('scope', SCOPE);
  url.searchParams.set('state', state);
  url.searchParams.set('code_challenge', codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');

  return url.toString();
}

export function getAuthorizationCallbackState() {
  return {
    expectedState: sessionStorage.getItem(STATE_KEY),
    codeVerifier: sessionStorage.getItem(VERIFIER_KEY),
    redirectUri: REDIRECT_URI,
    authServerUrl: AUTH_SERVER_URL,
  };
}

export function clearAuthorizationCallbackState() {
  sessionStorage.removeItem(STATE_KEY);
  sessionStorage.removeItem(VERIFIER_KEY);
}
