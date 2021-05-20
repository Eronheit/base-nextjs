import React from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex } from '@chakra-ui/layout';

const GuestLayout: React.FC = ({ children }) => {
  return (
    <Flex
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
    >
      {children}
    </Flex>
  );
};

export default GuestLayout;
