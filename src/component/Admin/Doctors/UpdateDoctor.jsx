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
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoctorDetails, updateDoctor } from '../../../redux/actions/admin';
import MetaData from '../../MetaData';
import Loader from '../../Loader';

export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC94B',
  backgroundColor: 'white',
};

const UpdateDoctor = () => {
  const dispatch = useDispatch();
  const { doctor } = useSelector(state => state.doctor);

  const params = useParams();

  const { loading, error, message } = useSelector(state => state.update);

  const navigate = useNavigate();

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

  const doctorId = params.id;

  useEffect(() => {
    dispatch(getDoctorDetails(doctorId));
  }, [dispatch, doctorId]);

  useEffect(() => {
    if (doctor && doctor._id !== doctorId) {
      dispatch(getDoctorDetails(doctorId));
    } else {
      setImagePrev(doctor.avatar.url);
      setdoctorName(doctor.doctorName);
      setEducation(doctor.education);
      setExperience(doctor.experience);
      setLocation(doctor.location);
      setDiseaseHandle(doctor.diseaseHandle);
      setSpecialization1(doctor.specialization1);
      setSpecialization2(doctor.specialization2);
      setSpecialization3(doctor.specialization3);
    }

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearErrors' });
    }

  }, [dispatch, doctorId, doctor, error, message, navigate]);

  const updateHandler = e => {
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

    dispatch(updateDoctor(doctorId,myForm))
    
    if (message) {
      toast.success('doctor Updated Successfully');
      dispatch({ type: 'clearMessage' });
    }

    navigate('/doctors');
  };

  return (
    <>
    <MetaData title="Admin--Update Doctor"/>
    {loading ? (
        <Loader />
      ) : (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Container py="16">
        <form onSubmit={updateHandler}>
          <Heading
            textTransform={'uppercase'}
            children="Update Doctor"
            my="16"
            textAlign={['center', 'left']}
          />

          <VStack m="auto" spacing={'8'}>
            {imagePrev && (
              <Image src={imagePrev} boxSize="64" objectFit={'contain'} />
            )}
            <Input
              accept="image/*"
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
              Update
            </Button>
          </VStack>
        </form>
      </Container>

      <Sidebar />
    </Grid>
      )}
    </>
    
  );
};

export default UpdateDoctor;
