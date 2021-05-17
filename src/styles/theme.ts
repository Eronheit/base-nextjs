import { theme, Theme } from '@chakra-ui/react';

const customTheme: Theme = {
  ...theme,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
};

export default customTheme;
