import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

type CustomGlobalProps = {
  isAuthenticated?: boolean;
};

export default function ssrGlobalProps<P>(
  ctx: GetServerSidePropsContext,
  SSRPagePropsResult: GetServerSideProps<P> | any,
  customGlobalPropsResult?: CustomGlobalProps,
): GetServerSidePropsContext | any {
  const cookies = parseCookies(ctx);
  const cookieChakraColorMode = cookies['chakra-ui-color-mode'];

  return {
    ...SSRPagePropsResult,
    props: {
      ...SSRPagePropsResult.props,
      chakraColorMode: cookieChakraColorMode ?? '',
      ...customGlobalPropsResult,
    },
  };
}
