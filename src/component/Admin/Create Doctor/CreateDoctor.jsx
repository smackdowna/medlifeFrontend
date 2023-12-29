import {
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { createDoctor } from '../../../redux/actions/admin';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MetaData from '../../MetaData';

export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC94B',
  backgroundColor: 'white',
};

const CreateDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector(state => state.admin);

  const [doctorName, setdoctorName] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [diseaseHandle, setDiseaseHandle] = useState('');
  const [specialization1, setSpecialization1] = useState('');
  const [specialization2, setSpecialization2] = useState('');
  const [specialization3, setSpecialization3] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('doctorName', doctorName);
    myForm.append('education', education);
    myForm.append('experience', experience);
    myForm.append('location', location);
    myForm.append('diseaseHandle', diseaseHandle);
    myForm.append('specialization1', specialization1);
    myForm.append('specialization2', specialization2);
    myForm.append('specialization3', specialization3);
    myForm.append('file', image);

    dispatch(createDoctor(myForm));
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

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearErrors' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      navigate("/doctors")

    }
  }, [dispatch, error, message,navigate]);

  return (
    <>
    <MetaData title="Admin--Create Doctor"/>
      <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
        <Container py="16">
          <form onSubmit={submitHandler}>
            <Heading
              textTransform={'uppercase'}
              children="Create Doctors"
              my="16"
              textAlign={['center', 'left']}
            />

            <VStack m="auto" spacing={'8'}>
              {imagePrev && (
                <Image src={imagePrev} boxSize="64" objectFit={'contain'} />
              )}
              <Input
                accept="image/*"
                required
                id="chooseAvatar"
                type={'file'}
                focusBorderColor="purple.500"
                css={{
                  '&::file-selector-button': {
                    ...fileUploadCss,
                    color: 'purple',
                  },
                }}
                onChange={changeImageHandler}
              />

              <Input
                value={doctorName}
                onChange={e => setdoctorName(e.target.value)}
                placeholder="Enter Doctor Name"
                type={'text'}
                focusBorderColor="purple.500"
              />
              <Input
                value={education}
                onChange={e => setEducation(e.target.value)}
                placeholder="Enter Doctor education"
                type={'text'}
                focusBorderColor="purple.500"
              />
              <Input
                value={experience}
                onChange={e => setExperience(e.target.value)}
                placeholder="Enter Doctor experience"
                type={'text'}
                focusBorderColor="purple.500"
              />
              <Input
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Enter Doctor Location"
                type={'text'}
                focusBorderColor="purple.500"
              />
              <Select
                focusBorderColor="purple.500"
                value={diseaseHandle}
                onChange={e => setDiseaseHandle(e.target.value)}
              >
                <option value="">Category</option>
                {categories.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
              <Input
                value={specialization1}
                onChange={e => setSpecialization1(e.target.value)}
                placeholder="Enter Doctor specialization1"
                type={'text'}
                focusBorderColor="purple.500"
              />
              <Input
                value={specialization2}
                onChange={e => setSpecialization2(e.target.value)}
                placeholder="Enter Doctor specialization2"
                type={'text'}
                focusBorderColor="purple.500"
              />
              <Input
                value={specialization3}
                onChange={e => setSpecialization3(e.target.value)}
                placeholder="Enter Doctor specialization3"
                type={'text'}
                focusBorderColor="purple.500"
              />
              <Button
                isLoading={loading}
                w="full"
                colorScheme={'purple'}
                type="submit"
              >
                Create
              </Button>
            </VStack>
          </form>
        </Container>

        <Sidebar />
      </Grid>
    </>
  );
};

export default CreateDoctor;
