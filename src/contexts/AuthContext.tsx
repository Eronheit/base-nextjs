import { api } from '@/services/apiClient';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Router from 'next/router';
import { createStandaloneToast } from '@chakra-ui/toast';
import GuestLayout from '@/pages/_layouts/Ghest';
import AuthLayout from '@/pages/_layouts/Auth';

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

export function signOut() {
  destroyCookie(undefined, 'basenext.token');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  const toast = createStandaloneToast();

  const signIn = useCallback(
    async (
      { email, password }: SignInCredentials,
      actionsSubmit: SignInActionsSubmit,
    ) => {
      try {
        const response = await api.post('login', {
          email,
          password,
        });

        const { token } = response.data;

        toast({
          title: response.data.titulo,
          description: response.data.mensagem,
          status: 'success',
          isClosable: true,
          position: 'top-right',
        });

        setCookie(undefined, 'basenext.token', token, {
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
      } catch (err) {
        console.log(err);
        actionsSubmit.setSubmitting(false);
      }
    },
    [],
  );

  useEffect(() => {
    const { 'basenext.token': token } = parseCookies();
    if (token) {
      // implements rules for get user info
      setUser({ name: 'John Doe', permissions: [''], roles: [''] });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isAuthenticated }}>
      {isAuthenticated && Router.pathname !== '/' ? (
        <AuthLayout>{children}</AuthLayout>
      ) : (
        <GuestLayout>{children}</GuestLayout>
      )}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
