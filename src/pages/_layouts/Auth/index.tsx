import React from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Grid, GridItem } from '@chakra-ui/layout';

const AuthLayout: React.FC = ({ children }) => {
  return (
    <Grid
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      templateColumns="240px 1fr"
      gap={4}
    >
      <GridItem colSpan={1} bg="tomato" />
      <GridItem bg="whiteAlpha.600">{children}</GridItem>
    </Grid>
  );
};

export default AuthLayout;
