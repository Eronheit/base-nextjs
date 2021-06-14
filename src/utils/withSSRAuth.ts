import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';
import ssrGlobalProps from './ssrGlobalProps';

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['basenext.token'];

    const SSRPagePropsResult = (await fn?.(ctx)) ?? ({ props: {} } as any); //eslint-disable-line

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    try {
      return ssrGlobalProps(ctx, SSRPagePropsResult, { isAuthenticated: true });
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'basenext.token');
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
      return err;
    }
  };
}
