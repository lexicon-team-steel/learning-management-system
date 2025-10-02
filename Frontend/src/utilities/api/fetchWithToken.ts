import { getTokens, addTokenToRequestInit, validateOrRefreshTokens } from '../token';
import { CustomError } from '../classes';
import { fetchJson } from '../api/fetchJson';

// Loader-friendly fetch with token-refresh
export async function fetchWithToken<T>(input: RequestInfo | URL, options?: RequestInit): Promise<T> {
  let tokens = getTokens();

  // No token => let guard handle redirect higher up
  if (!tokens) throw new CustomError(401, 'No tokens');

  tokens = await validateOrRefreshTokens(tokens);
  if (!tokens) throw new CustomError(401, 'Token refresh failed');

  // Invoke the fetch with Authorization
  const reqInit = addTokenToRequestInit(tokens.accessToken, {
    ...options,
    headers: { Accept: 'application/json', ...(options?.headers || {}) },
  });

  return fetchJson<T>(input, reqInit);
}
