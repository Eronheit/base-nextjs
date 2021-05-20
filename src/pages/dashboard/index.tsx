import { useAuthContext } from '@/contexts/AuthContext';
import { withSSRAuth } from '@/utils/withSSRAuth';
import { Heading } from '@chakra-ui/react';
import React from 'react';

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  return <Heading>Hello {user?.name}</Heading>;
};

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});

export default Dashboard;
