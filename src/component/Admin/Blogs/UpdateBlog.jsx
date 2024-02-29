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
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../../MetaData';
import Loader from '../../Loader';
import { getBlogDetails, updateblog } from '../../../redux/actions/blog';

export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC94B',
  backgroundColor: 'white',
};

const UpdateBlog = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector(state => state.getSingleBlog);

  const params = useParams();

  const { loading, error, message } = useSelector(state => state.updateBlog);

  const navigate = useNavigate();

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

  
  const blogId = params.id;

  useEffect(() => {
    dispatch(getBlogDetails(blogId));
  }, [dispatch, blogId]);

  useEffect(() => {
    if (blog && blog._id !== blogId) {
      dispatch(getBlogDetails(blogId));
    } else {
      setImagePrev(blog.avatar.url);
      setTitle(blog.title);
      setAbout(blog.about);
    }

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearErrors' });
    }

  }, [dispatch, blogId, blog, error, message, navigate]);

  const updateHandler = e => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append('title', title);
      myForm.append('about', about);
      myForm.append('file', image);

    dispatch(updateblog(blogId,myForm))
    
    if (message) {
      toast.success('Blog Updated Successfully');
      dispatch({ type: 'clearMessage' });
    }

    navigate('/blogs');
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
                children="Update Blog"
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
      )}
    </>
    
  );
};

export default UpdateBlog;
