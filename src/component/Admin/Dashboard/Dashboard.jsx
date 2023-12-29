import React, { useEffect } from 'react';
import { Box, Grid, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDoctorsCount,
  getReviewsCount,
  getUsersConnectedCount,
  getUsersCount,
} from '../../../redux/actions/admin';
import MetaData from '../../MetaData';
import Loader from '../../Loader';

const Databox = ({ title, qty }) => (
  <Box
    w={['full', '20%']}
    boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    p="8"
    borderRadius={'lg'}
  >
    <Text children={title} />
    <HStack spacing={'6'}>
      <Text fontSize={'2xl'} fontWeight="bold" children={qty} />
    </HStack>
  </Box>
);

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctorsCount());
    dispatch(getUsersCount());
    dispatch(getReviewsCount());
    dispatch(getUsersConnectedCount());
  }, [dispatch]);

  const {  doctors } = useSelector(state => state.doctorsCount);
  const { loading,users } = useSelector(state => state.userCount);
  const { reviews } = useSelector(state => state.reviewCount);
  const { user } = useSelector(state => state.userConnectedCount);

  return (
    <>
      <MetaData title="Admin Dashboard" />
      {loading ? (
        <Loader />
      ) : (
        <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
          <Box boxSizing="border-box" py="16" px={['4', '0']}>
            <Text
              textAlign={'center'}
              opacity={'0.5'}
              children={`Today's Date ${String(new Date()).split('G')[0]}`}
            />

            <Heading
              children="Medlife Admin Dashboard"
              ml={['0', '16']}
              py="10"
              mb="16"
              textAlign={['center', 'left']}
            />

            <Stack
              direction={['column', 'row']}
              minH="24"
              justifyContent={'space-evenly'}
            >
              <Databox title="Active Users" qty={users} />
              <Databox title="Reviews" qty={reviews} />
              <Databox title="Doctors" qty={doctors} />
              <Databox title="Connected Users" qty={user} />
            </Stack>
          </Box>

          <Sidebar />
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
