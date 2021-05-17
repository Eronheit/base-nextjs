import React from 'react';
import { Heading, Switch, useColorMode } from '@chakra-ui/react';

const Home: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Heading>Hello world</Heading>
      <Switch onChange={toggleColorMode}>{colorMode}</Switch>
    </div>
  );
};

export default Home;
