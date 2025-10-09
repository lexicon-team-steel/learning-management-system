import { CustomError } from '../../utilities/classes';

export async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    let message = res.statusText;

    try {
      const errorData = await res.json();

      if (typeof errorData === 'string') {
        message = errorData;
      } else {
        message = JSON.stringify(errorData);
      }
    } catch {}
    throw new CustomError(res.status, message || 'Request failed');
  }
  return res.json() as Promise<T>;
}
