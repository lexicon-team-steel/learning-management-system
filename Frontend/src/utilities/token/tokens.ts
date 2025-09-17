import { TOKENS } from '../constants';
import { ITokens } from '../types';

export function getTokens(): ITokens | null {
  const raw = localStorage.getItem(TOKENS);
  return raw ? (JSON.parse(raw) as ITokens) : null;
}

export function setTokens(newTokens: ITokens) {
  localStorage.setItem(TOKENS, JSON.stringify(newTokens));
}
