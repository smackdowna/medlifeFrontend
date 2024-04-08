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
  Button,
  HStack,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, getAllReviews, updateReview } from '../../../redux/actions/admin';
import Loader from '../../Loader';
import MetaData from '../../MetaData';
import toast from 'react-hot-toast';

const Reviews = () => {
  const dispatch = useDispatch();
  const { loading, message, error, reviews } = useSelector(
    state => state.reviews
  );

  const updateHandler = userId => {
    dispatch(updateReview(userId));
  };

  const deleteHandler = userId => {
    dispatch(deleteReview(userId));
  };


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllReviews());
  }, [dispatch, error, message]);

  return (
    <>
      <MetaData title="Admin--All Reviews" />
      {loading ? (
        <Loader />
      ) : (
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
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {reviews.map(item => (
                    <Row
                      updateHandler={updateHandler}
                      loading={loading}
                      key={item._id}
                      item={item}
                      deleteHandler={deleteHandler}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>

          <Sidebar />
        </Grid>
      )}
    </>
  );
};

export default Reviews;

function Row({ item, updateHandler, loading, deleteHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.mobileNumber}</Td>
      <Td>{item.review}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            isLoading={loading}
            onClick={() => updateHandler(item._id)}
            variant={'outline'}
            color="purple.500"
          >
            Approve
          </Button>
          <Button
            isLoading={loading}
            onClick={() => deleteHandler(item._id)}
            color={'purple.600'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
