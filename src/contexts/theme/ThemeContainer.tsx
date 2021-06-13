import { ChakraProvider, cookieStorageManager } from '@chakra-ui/react';
import React, { useMemo, ReactNode } from 'react';

type ThemeContainerProps = {
  children: ReactNode;
  chakraColorMode: boolean;
};

const ThemeContainer: React.FC<ThemeContainerProps> = ({
  chakraColorMode,
  children,
}) => {
  const cookieChakraColorMode = useMemo(
    () => cookieStorageManager(`chakra-ui-color-mode=${chakraColorMode}`),
    [chakraColorMode],
  );

  return (
    <ChakraProvider colorModeManager={cookieChakraColorMode}>
      {children}
    </ChakraProvider>
  );
};

export default ThemeContainer;
