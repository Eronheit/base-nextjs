import { api } from '@/services/apiClient';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import React, { createContext, ReactNode, useCallback, useState } from 'react';
import Router from 'next/router';
import { createStandaloneToast } from '@chakra-ui/toast';

type User = {
  name: string;
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
  user: User;
  isAuthenticated: boolean;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, 'basenext.token');

  Router.replace('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const cookies = parseCookies();
  const isAuthenticated = !!cookies['basenext.token'];

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

        const { token, name } = response.data;

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
          name,
        });

        actionsSubmit.setSubmitting(false);

        Router.replace('/dashboard');
      } catch (err) {
        console.log(err);
        actionsSubmit.setSubmitting(false);
      }
    },
    [],
  );

  return (
    <AuthContext.Provider value={{ signIn, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
