// Login.jsx
import React from 'react';
import { Button, Container, Heading, Image, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo (1).png";

const Login = () => {
  return (
    <>
      <Container h={'95vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Image src={logo} height={'100'}/>
          <Heading children={'Welcome To Medlife'} />
          <Link to="/login">
            <Button my="4" colorScheme={'yellow'} type="submit">
              Login
            </Button>
          </Link>
        </VStack>
      </Container>
    </>
  );
};

export default Login;
