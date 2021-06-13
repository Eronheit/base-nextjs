import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['basenext.token'];

    const serverSideResult = (await fn?.(ctx)) ?? ({ props: {} } as any);

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    try {
      return {
        ...serverSideResult,
        props: {
          ...serverSideResult.props,
          chakraColorMode: cookies['chakra-ui-color-mode'],
          isAuthenticated: true,
        },
      };
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
