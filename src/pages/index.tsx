import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
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
import React, { useCallback, useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

type FormItems = {
  email: string;
  password: string;
};

const Home: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formItems, setFormItems] = useState<FormItems>({
    email: '',
    password: '',
  });

  const togglePasswordVisible = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate promise
      return new Promise(() => {
        setTimeout(() => {
          console.log(formItems);
          setIsLoading(false);
        }, 2000);
      });
    } catch (err) {
      console.log(err);
      return setIsLoading(false);
    }
  }, [formItems]);

  return (
    <Flex
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
      alignItems="center"
    >
      <Box maxW="md" mx="auto">
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
          <chakra.form
            onSubmit={e => {
              e.preventDefault();
              handleSignIn();
            }}
          >
            <Stack spacing="6">
              <FormControl id="email" isRequired>
                <FormLabel>Email: </FormLabel>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formItems.email}
                  onChange={e =>
                    setFormItems({
                      ...formItems,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={formItems.password}
                    onChange={e =>
                      setFormItems({
                        ...formItems,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <InputRightElement>
                    <IconButton
                      bg="transparent !important"
                      variant="ghost"
                      aria-label={
                        passwordVisible ? 'Mask password' : 'Reveal password'
                      }
                      onClick={togglePasswordVisible}
                      icon={passwordVisible ? <HiEye /> : <HiEyeOff />}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </Stack>
          </chakra.form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
