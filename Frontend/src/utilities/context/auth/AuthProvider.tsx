import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { AuthContext } from './AuthContext';
import { loginReq } from '../../api/api';
import { GUEST_USER, TOKENS } from '../../constants';
import { ITokens, IAuthContext, IUser } from '../../types';
import { CustomError } from '../../classes';
import decodeToken from '../../token/decodeToken';

interface IAuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps): ReactElement {
  // useLocalStorage works as a useState but it is always hooked up to LS, which means, if another component updates LS, this component will update as well.
  const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(TOKENS, null);
  const [user, setUser] = useState<IUser>(GUEST_USER);
  const isLoggedIn = !!tokens;

  const login = async (username: string, password: string) => {
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
  };

  const logout = () => clearTokens();

  useEffect(() => {
    setUser(() => (isLoggedIn ? decodeToken(tokens.accessToken) : GUEST_USER));
  }, [isLoggedIn, tokens]);

  const values: IAuthContext = { user, isLoggedIn, login, logout };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
