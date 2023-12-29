import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, updateUser } from '../../../redux/actions/admin';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import MetaData from '../../MetaData';
import Loader from '../../Loader';

const Users = () => {
  const dispatch = useDispatch();
  const { loading, users, error, message } = useSelector(state => state.users);

  const [searchTerm, setSearchTerm] = useState('');

  const updateHandler = userId => {
    dispatch(updateUser(userId));
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

    dispatch(getAllUsers());
  }, [dispatch, error, message]);

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobileNumber.toString().includes(searchTerm)
  );

  const handleDownload = () => {
    const data = filteredUsers.map(user => ({
      ID: user._id,
      Name: user.name,
      'Mobile Number': user.mobileNumber,
      City: user.city,
      Disease: user.disease,
      // Add more fields as needed
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users_Data');
    XLSX.writeFile(wb, 'users_data.xlsx');
  };

  return (
    <>
    <MetaData title="Admin--Active Users" />
      {loading ? (
        <Loader />
      ) : (
      <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Box p={['0', '16']} overflowX="auto">
        <Input
          maxW="intrinsic"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search a User..."
          type={'text'}
          focusBorderColor="purple.500"
        />
        <Heading
          textTransform={'uppercase'}
          children="All Active Users"
          my="16"
          textAlign={['center', 'left']}
        />

        <Button
          onClick={handleDownload}
          variant={'outline'}
          color="purple.500"
          mb="4"
        >
          Download Excel
        </Button>

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All Avilable User/Leads in database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Mobile Number</Th>
                <Th>City</Th>
                <Th>Disease</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {filteredUsers.map(item => (
                <Row
                  updateHandler={updateHandler}
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

export default Users;

function Row({ item, updateHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.mobileNumber}</Td>
      <Td>{item.city}</Td>
      <Td>{item.disease}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            isLoading={loading}
            onClick={() => updateHandler(item._id)}
            variant={'outline'}
            color="purple.500"
          >
            Change Status
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
