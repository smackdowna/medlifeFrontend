import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect} from 'react';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import MetaData from '../../MetaData';
import Loader from '../../Loader';
import { deleteBlog, getAllBlog } from '../../../redux/actions/blog';

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector(state => state.getBlog);
  const { loading, error, message } = useSelector(state => state.deleteBlog);

  const deleteHandler = userId => {
    dispatch(deleteBlog(userId));
  };

  useEffect(() => {
    if (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred.');
      }

      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllBlog());
  }, [dispatch, error, message, blogs]);

  return (
    <>
      <MetaData title="Admin--All Blogs" />
      {loading ? (
        <Loader />
      ) : (
        <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
          <Box p={['0', '8']} overflowX="auto">
            <Heading
              textTransform={'uppercase'}
              children={`All Blogs`}
              my="16"
              textAlign={['center', 'left']}
            />

            <TableContainer w={['100vw', 'full']}>
              <Table variant={'simple'} size="lg">
                <TableCaption>All Available Blog in database</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Title</Th>
                    <Th>Image</Th>
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {blogs.map((item, key) => (
                    <Row
                      deleteHandler={deleteHandler}
                      key={item._id}
                      item={item}
                      loading={loading}
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

export default Blogs;

function Row({ item, deleteHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.title}</Td>
      <Td>
        <Image boxSize="50px" src={item.avatar.url} />
      </Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Link to={`/blog/${item._id}`}>
            <Button variant={'outline'} color="purple.500">
              View Blog
            </Button>
          </Link>
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
