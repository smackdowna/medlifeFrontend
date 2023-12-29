import {
  Box,
  Grid,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews } from '../../../redux/actions/admin';

const Reviews = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector(state => state.reviews);

  
  useEffect(()=>{
    dispatch(getAllReviews())
  },[dispatch])

 

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Box p={['0', '16']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="All Reviews"
          my="16"
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All Avilable Reviews in database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Mobile Number</Th>
                <Th>Review</Th>
              </Tr>
            </Thead>

            <Tbody>
              {reviews.map(item => (
                <Row key={item._id} item={item} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default Reviews;

function Row({ item }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.mobileNumber}</Td>
      <Td>{item.review}</Td>
    </Tr>
  );
}
