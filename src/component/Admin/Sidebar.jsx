import { Button,  Image, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiLogoutBoxLine, RiRadarFill, RiUser3Fill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions/userAction';
import logo from "../../assets/logo (1).png";

const Sidebar = () => {
    const location = useLocation();

    const dispatch = useDispatch();
    const logoutHandler =()=>{
      dispatch(logOut());
    }

  return (
    <VStack spacing={'8'} p="16" boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}>
        <Image src={logo}/>
      <LinkButton Icon={RiDashboardFill} text="Dashboard" url={'dashboard'} active={location.pathname ==='/dashboard'}/>
      <LinkButton Icon={RiAddCircleFill} text="Create Doctors" url={'createdoctors'} active={location.pathname ==='/createdoctors'}/>
      <LinkButton Icon={RiEyeFill} text="Doctors" url={'doctors'} active={location.pathname ==='/doctors'}/>
      <LinkButton Icon={RiUser3Fill} text="Users" url={'users'} active={location.pathname ==='/users'}/>
      <LinkButton Icon={RiUser3Fill} text="Connected Users" url={'connected'} active={location.pathname ==='/connected'}/>
      <LinkButton Icon={RiRadarFill} text="Reviews" url={'reviews'} active={location.pathname ==='/reviews'}/>
      <LinkButton Icon={RiRadarFill} text="Create Blog" url={'createblog'} active={location.pathname ==='/createblog'}/>
      <LinkButton Icon={RiRadarFill} text="Blogs" url={'blogs'} active={location.pathname ==='/blogs'}/>
      <LinkButton Icon={RiLogoutBoxLine} text="Logout" url={''} logoutHandler={logoutHandler} />
    </VStack>
  );
};

export default Sidebar;


function LinkButton({url,logoutHandler,Icon,text,active}){

  

    return(
        <Link to={`/${url}`}>
        <Button fontSize={'larger'} variant="ghost" colorScheme={active?'purple':"" } onClick={logoutHandler} >
          <Icon style={{ margin: '4px' }} />
          {text}
        </Button>
      </Link>
    )
}