import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { parseCookies } from 'nookies';
import ssrGlobalProps from './ssrGlobalProps';

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<AppProps>> => {
    const cookies = parseCookies(ctx);

    const SSRPagePropsResult = (await fn?.(ctx)) ?? ({ props: {} } as any); //eslint-disable-line

    if (cookies['basenext.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }

    return ssrGlobalProps(ctx, SSRPagePropsResult);
  };
}
