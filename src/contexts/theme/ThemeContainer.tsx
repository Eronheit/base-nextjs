import { ChakraProvider, cookieStorageManager } from '@chakra-ui/react';
import React, { useMemo, ReactNode } from 'react';
import GuestLayout from '@/pages/_layouts/Ghest';
import AuthLayout from '@/pages/_layouts/Auth';

type ThemeContainerProps = {
  children: ReactNode;
  chakraColorMode: boolean;
  isAuthenticated: boolean;
};

const ThemeContainer: React.FC<ThemeContainerProps> = ({
  chakraColorMode,
  isAuthenticated,
  children,
}) => {
  const cookieChakraColorMode = useMemo(
    () => cookieStorageManager(`chakra-ui-color-mode=${chakraColorMode}`),
    [chakraColorMode],
  );

  return (
    <ChakraProvider colorModeManager={cookieChakraColorMode}>
      {isAuthenticated ? (
        <AuthLayout>{children}</AuthLayout>
      ) : (
        <GuestLayout>{children}</GuestLayout>
      )}
    </ChakraProvider>
  );
};

export default ThemeContainer;
