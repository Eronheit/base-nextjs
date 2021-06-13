import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { parseCookies } from 'nookies';

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<AppProps>> => {
    const cookies = parseCookies(ctx);

    const serverSideResult = (await fn?.(ctx)) ?? ({ props: {} } as any);

    if (cookies['basenext.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }

    return {
      ...serverSideResult,
      props: {
        ...serverSideResult.props,
        chakraColorMode: cookies['chakra-ui-color-mode'] ?? '',
      },
    };
  };
}
