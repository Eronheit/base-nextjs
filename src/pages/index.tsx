import { AuthContext } from '@/contexts/AuthContext';
import { withSSRGuest } from '@/utils/withSSRGuest';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Switch,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React, { useCallback, useContext, useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import * as yup from 'yup';

const Home: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { signIn } = useContext(AuthContext);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Por favor, digite um email válido')
      .required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
  });

  const togglePasswordVisible = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  const handleSignIn = useCallback(
    async (values, actions) => {
      await signIn(values, actions);
    },
    [signIn],
  );

  return (
    <Box maxW="md" mx="auto" my="auto">
      <Heading textAlign="center" size="xl" mb={8} fontWeight="extrabold">
        Sign in
        <Switch
          ml={8}
          onChange={toggleColorMode}
          isChecked={colorMode === 'dark'}
        />
      </Heading>

      <Box
        bg={useColorModeValue('white', 'gray.700')}
        py="8"
        px={{ base: '4', md: '10' }}
        shadow="base"
        rounded={{ sm: 'lg' }}
      >
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            handleSignIn(values, actions);
          }}
        >
          {props => (
            <Form>
              <Stack spacing="6">
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel>Email: </FormLabel>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        autoComplete="email"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }) => {
                    return (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            id="password"
                            type={passwordVisible ? 'text' : 'password'}
                            autoComplete="password"
                          />
                          <InputRightElement>
                            <IconButton
                              bg="transparent !important"
                              variant="ghost"
                              aria-label={
                                passwordVisible
                                  ? 'Mask password'
                                  : 'Reveal password'
                              }
                              onClick={togglePasswordVisible}
                              icon={passwordVisible ? <HiEye /> : <HiEyeOff />}
                            />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>

                <Button
                  type="submit"
                  colorScheme="blue"
                  shadow="sm"
                  size="lg"
                  fontSize="md"
                  isLoading={props.isSubmitting}
                >
                  Sign in
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});

export default Home;
