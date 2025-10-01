import { hasTokenExpired, setTokens } from './';
import { refreshTokens } from '../api/api';
import { ITokens } from '../types';

let refreshPromise: Promise<ITokens | null> | null = null;

export async function validateOrRefreshTokens(tokens: ITokens | null): Promise<ITokens | null> {
  if (!tokens) return null;

  // If tokens still valid return
  if (!hasTokenExpired(tokens.accessToken)) return tokens;

  // If another refresh is already happening → wait for it
  if (refreshPromise) return refreshPromise;

  // Start a new refresh
  refreshPromise = refreshTokens(tokens.accessToken, tokens.refreshToken)
    .then((refreshed) => {
      setTokens(refreshed);
      return refreshed;
    })
    .catch(() => null)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}
