import { destroyCookie, parseCookies, setCookie } from 'nookies';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Router from 'next/router';
import { createStandaloneToast } from '@chakra-ui/toast';

type User = {
  name: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type SignInActionsSubmit = {
  setSubmitting: (value: boolean) => void;
};

type AuthProviderProps = {
  children: ReactNode;
  isAuthenticated: boolean;
};

type AuthContextData = {
  signIn: (
    credentials: SignInCredentials,
    actions: SignInActionsSubmit,
  ) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut(): void {
  destroyCookie(undefined, 'basenext.token');

  Router.push('/');
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  isAuthenticated,
}) => {
  const [user, setUser] = useState<User>(null);

  const toast = createStandaloneToast();

  const signIn = async (
    { email, password }: SignInCredentials,
    actionsSubmit: SignInActionsSubmit,
  ) => {
    // eslint-disable-next-line
      console.log(email, password);
    toast({
      title: 'Sucesso',
      description: 'Seja bem vindo!',
      status: 'success',
      isClosable: true,
      position: 'top-right',
    });

    setCookie(undefined, 'basenext.token', 'token', {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    setUser({
      name: 'John Doe',
      permissions: [''],
      roles: [''],
    });

    actionsSubmit.setSubmitting(false);

    Router.push('/dashboard');
  };

  useEffect(() => {
    const { 'basenext.token': token } = parseCookies();

    if (token) {
      // implements rules for get user info
      setUser({ name: 'John Doe', permissions: [''], roles: [''] });
    }
  }, []);

  // console.log('user', user);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextData => {
  return useContext(AuthContext);
};
