import React from 'react';
import { ChakraProvider, localStorageManager } from '@chakra-ui/react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import theme from '@/styles/theme';

const ThemeContainer: React.FC = ({ children }) => {
  return (
    <ChakraProvider theme={theme} colorModeManager={localStorageManager}>
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </ChakraProvider>
  );
};

export default ThemeContainer;
