import {
    Button,
    Container,
    Grid,
    Heading,
    Image,
    Input,
    Textarea,
    VStack,
  } from '@chakra-ui/react';
  import React, { useEffect, useState } from 'react';
  import Sidebar from '../Sidebar';
  import { useDispatch, useSelector } from 'react-redux';
  import toast from 'react-hot-toast';
  import { useNavigate } from 'react-router-dom';
  import MetaData from '../../MetaData';
import { createBlog } from '../../../redux/actions/blog';
  
  export const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: '#ECC94B',
    backgroundColor: 'white',
  };
  
  const CreateBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const{loading,message,error}=useSelector(state=>state.blog)
  
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
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
  
      myForm.append('title', title);
      myForm.append('about', about);
      myForm.append('file', image);
  
      dispatch(createBlog(myForm));
    };
  
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: 'clearErrors' });
      }
  
      if (message) {
        toast.success(message);
        dispatch({ type: 'clearMessage' });
        navigate("/blogs")
  
      }
    }, [dispatch, error, message,navigate]);
  
    return (
      <>
      <MetaData title="Admin--Create Blog"/>
        <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
          <Container py="16">
            <form onSubmit={submitHandler}>
              <Heading
                textTransform={'uppercase'}
                children="Create Blog"
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
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Enter Blog Title"
                  type={'text'}
                  focusBorderColor="purple.500"
                />

                <Textarea
                    value={about}
                    boxSize="500px"
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Enter Blog Content (up to 5000 words)"
                    resize="vertical"
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
  
  export default CreateBlog;
  