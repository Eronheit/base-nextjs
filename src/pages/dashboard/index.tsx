import { useAuthContext } from '@/contexts/AuthContext';
import { withSSRAuth } from '@/utils/withSSRAuth';
import { Heading } from '@chakra-ui/react';
import React from 'react';

import styles from './styles.module.scss';

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  return <Heading className={styles.heading}>Dashboard {user?.name}</Heading>;
};

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});

export default Dashboard;
