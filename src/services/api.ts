import { createStandaloneToast } from '@chakra-ui/toast';
import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);
  const toast = createStandaloneToast();

  const api = axios.create({
    baseURL: 'http://your_project/api',
    headers: {
      Authorization: `Bearer ${cookies['basenext.token']}`,
    },
  });

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (process.browser) {
          toast({
            title: error.response.data.titulo,
            description: error.response.data.mensagem,
            status: 'error',
            isClosable: true,
            position: 'top-right',
          });
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    },
  );

  return api;
}
