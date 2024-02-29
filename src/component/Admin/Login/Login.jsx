// Login.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Image,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/userAction';
import logo from "../../../assets/logo (1).png";

const Login = () => {
  const dispatch = useDispatch();
  const{loading} = useSelector(state=>state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Container h={'95vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Image src={logo} height={'57'}/>
          <Heading children={'Welcome To Medlife'} />
          <form onSubmit={submitHandler}>
            <Box my={'4'}>
              <FormLabel htmlFor="email" children="Email Address" />
              <Input
                required
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                type={'email'}
                focusBorderColor="yellow.500"
              />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="email" children="Password" />
              <Input
                required
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                type={'password'}
                focusBorderColor="yellow.500"
              />
            </Box>
            <Button  isLoading={loading} my="4" colorScheme={'yellow'} type="submit">
              Login
            </Button>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Login;
