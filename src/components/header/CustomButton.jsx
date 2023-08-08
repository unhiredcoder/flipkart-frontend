import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Badge, Box, Button, Typography, colors, styled } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import LoginDialog from '../login/loginDialog';
import { DataContext } from '../../../context/DataProvider';
import Profile from './Profile';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';


const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: '20px 50px',
  justifyContent: 'center',
  '& > button, & > p, & > div ,& >div': {
    marginRight: '40px',
    fontSize: '16px',

  },
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    '& > button, & > p, & > div': {
      marginBottom: '10px',
    },
  },
}));

const LoginBtn = styled(Box)(({ theme }) => ({
  display: 'flex',
  background: '#fff',
  color: '#2874f0',
  textTransform: 'none',
  padding: '6px 40px',
  borderRadius: '1px',
  alignItems: 'center', justifyContent: 'center',
  boxShadow: 'none',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'sans-serif',
  [theme.breakpoints.down('md')]: {
    background: '#2874f0',
    color: '#fff',
    marginTop: 20,
  },
}));

const CustomButton = () => {
  const [open, setOpen] = useState(false);
  const { account, setAccount } = useContext(DataContext);
  const cartItems = useSelector((state) => state.cart.products);
  const cartLength = cartItems?.length;

  const isLoggedIn = JSON.parse(localStorage.getItem('userData'));
  const userRole = isLoggedIn?.role;
  console.log("🚀 ~ file: CustomButton.jsx:58 ~ CustomButton ~ userRole:", userRole)
  useEffect(() => {
    const isDashboardPage = window.location.pathname.includes('/dashboard');
    if (!isLoggedIn && !isDashboardPage) {
      const timeoutId = setTimeout(() => {
        setOpen(true);
      }, 7000);

      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, []);


  return (
    <Wrapper>
      {account ? (
        <Profile account={account} setAccount={setAccount} />
      ) : (
        <LoginBtn variant="contained" onClick={() => setOpen(true)}>
          Login
        </LoginBtn>
      )}
      <Typography whiteSpace='nowrap'>Beacome a seller</Typography>
      <Typography>More</Typography>
      <Box display="flex" justifyContent="space-evenly">
        <Link to={'/cart'} style={{ textDecoration: 'none', display: 'flex' }}>
          <Badge badgeContent={cartLength} color="secondary">
            <ShoppingCart sx={{
              color: {
                xs: '#000', // Default color for screens other than md and lg
                md: '#fff', // Black color for screens in the 'md' range
                lg: '#fff', // White color for screens in the 'lg' range
              },
            }} />
          </Badge>
          <Typography
            // marginLeft="4px"
            sx={{
              color: {
                xs: '#000', // Default color for screens other than md and lg
                md: '#fff', // Black color for screens in the 'md' range
                lg: '#fff', // White color for screens in the 'lg' range
              },
            }}
          >Cart</Typography>
        </Link >
        <Link to={'/dashboard'} style={{ position: 'absolute', right: 20, color: 'inherit' }}>
          {(userRole === "admin" || userRole === "superadmin") && (
            <SupervisorAccountIcon />
          )}
        </Link>
      </Box>
      <LoginDialog open={open} setOpen={setOpen} />
    </Wrapper>
  );
};

export default CustomButton;
