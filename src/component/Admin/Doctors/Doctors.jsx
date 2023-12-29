import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoctor, getAllDoctors } from '../../../redux/actions/admin';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import MetaData from '../../MetaData';
import Loader from '../../Loader';

const Doctors = () => {
  const dispatch = useDispatch();
  const { doctors } = useSelector(state => state.doctors);
  const { loading, error, message } = useSelector(state => state.delete);

  const [doctorName, setdoctorName] = useState('');
  const [diseaseHandle, setDiseaseHandle] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const deleteHandler = userId => {
    dispatch(deleteDoctor(userId));
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

    const filteredByName = doctors.filter(doctor =>
      doctor.doctorName.toLowerCase().includes(doctorName.toLowerCase())
    );

    const filteredByCategory =
      diseaseHandle !== ''
        ? doctors.filter(
            doctor =>
              doctor.diseaseHandle.toLowerCase() === diseaseHandle.toLowerCase()
          )
        : doctors;

    const combinedFilteredDoctors = filteredByName.filter(doctor =>
      filteredByCategory.includes(doctor)
    );

    setFilteredDoctors(combinedFilteredDoctors);

    dispatch(getAllDoctors());
  }, [dispatch, error, message, doctors, doctorName, diseaseHandle]);

  const handleDownload = () => {
    const data = filteredDoctors.map(doctor => ({
      ID: doctor._id,
      Name: doctor.doctorName,
      Image: doctor.avatar.url,
      Experience: doctor.experience,
      Education: doctor.education,
      DiseaseHandle: doctor.diseaseHandle,
      // Add more fields as needed
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Doctors_Data');
    XLSX.writeFile(wb, 'doctors_data.xlsx');
  };

  const categories = [
    'Proctology',
    'Laparoscopy',
    'Gynaecology',
    'ENT',
    'Urology',
    'Vascular',
    'Aesthetics',
    'Orthopedics',
    'Ophthalmology',
    'Fertility',
    'Dentistry',
    'Dermatology',
  ];

  return (
    <>
    <MetaData title="Admin--All Doctors" />
      {loading ? (
        <Loader />
      ) : (
      <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
        <Box p={['0', '8']} overflowX="auto">
          <Input
            maxW="intrinsic"
            value={doctorName}
            onChange={e => setdoctorName(e.target.value)}
            placeholder="Search Doctor..."
            type={'text'}
            focusBorderColor="purple.500"
          />
          <HStack
            overflowX={'auto'}
            py={'8'}
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {categories.map((item, index) => (
              <Button
                key={index}
                onClick={() => setDiseaseHandle(item)}
                minW={'60'}
              >
                <Text children={item} />
              </Button>
            ))}
          </HStack>
          <Heading
            textTransform={'uppercase'}
            children={`All Doctors`}
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
              <TableCaption>All Available Doctors in database</TableCaption>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Image</Th>
                  <Th>Experience</Th>
                  <Th>Education</Th>
                  <Th>DiseaseHandle</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>

              <Tbody>
                {filteredDoctors.map((item, key) => (
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

export default Doctors;

function Row({ item, deleteHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.doctorName}</Td>
      <Td>
        <Image src={item.avatar.url} />
      </Td>
      <Td>{item.experience}</Td>
      <Td>{item.education}</Td>
      <Td>{item.diseaseHandle}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Link to={`/doctor/${item._id}`}>
            <Button variant={'outline'} color="purple.500">
              View Doctors
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
