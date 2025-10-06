import { CustomError } from '../classes';
import { ApiErrorType, FormErrorType } from '../types';
import { fetchWithToken } from './fetchWithToken';

export const safeFetch = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<{ errors?: ApiErrorType } | null> => {
  try {
    await fetchWithToken<T>(input, init);
    return null;
  } catch (err) {
    if (err instanceof CustomError) {
      try {
        const parsed = JSON.parse(err.message);
        if (parsed.errors) {
          const fieldErrors: FormErrorType = {};
          for (const [key, messages] of Object.entries(parsed.errors)) {
            fieldErrors[key.toLowerCase()] = (messages as string[])[0];
          }
          return { errors: { fieldErrors } };
        }
        if (parsed.detail) {
          return { errors: { generalError: parsed.detail } };
        }
      } catch {
        return { errors: { generalError: err.message } };
      }
    }
    return { errors: { generalError: 'Ett oväntat fel uppstod' } };
  }
};
