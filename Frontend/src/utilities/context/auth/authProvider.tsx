import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { AuthContext } from './authContext';
import { loginReq } from '../../api/api';
import { TOKENS } from '../../constants';
import { ITokens, IAuthContext } from '../../types';
import { CustomError } from '../../classes';

interface IAuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // useLocalStorage works as a useState but it is always hooked up to LS, which means, if another component updates LS, this component will update as well.
  const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(TOKENS, null);

  async function login(username: string, password: string) {
    try {
      const tokens = await loginReq(username, password);
      setTokens(tokens);
      return { success: true };
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error);
        return { success: false, message: error.message };
      }
      return { success: false, message: 'Något gick fel vid inloggningen' };
    }
  }

  function logout() {
    clearTokens();
  }

  const values: IAuthContext = { isLoggedIn, login, logout };

  useEffect(() => {
    if (tokens === null) setIsLoggedIn(false);
    if (tokens) setIsLoggedIn(true);
  }, [tokens]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
