import { ChakraProvider, cookieStorageManager } from '@chakra-ui/react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import React, { useMemo, ReactNode } from 'react';
import GuestLayout from '@/pages/_layouts/Ghest';
import AuthLayout from '@/pages/_layouts/Auth';
import theme from '@/styles/theme';

type ThemeContainerProps = {
  children: ReactNode;
  chakraColorMode: string;
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
    <ChakraProvider theme={theme} colorModeManager={cookieChakraColorMode}>
      <EmotionThemeProvider theme={theme}>
        {isAuthenticated ? (
          <AuthLayout>{children}</AuthLayout>
        ) : (
          <GuestLayout>{children}</GuestLayout>
        )}
      </EmotionThemeProvider>
    </ChakraProvider>
  );
};

export default ThemeContainer;
