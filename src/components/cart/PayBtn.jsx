import axios from 'axios';
import React, { useState } from 'react'
import { Button, styled } from '@mui/material';
import { URL } from '../../constants/data';

const StyledButton = styled(Button)(({ theme, isLog ,isHovered}) => ({
  display: 'flex',
  color: '#fff',
  background:'#fb641b',
  width: 250,
  height: 51,
  '&:hover': {
    background:isHovered && !isLog ? '#cccccc' : '#fb641b',
    boxShadow: "0 2px 4px 0 rgb(0 0 0/10%)"
  },
  marginLeft: 'auto',
  cursor:isHovered && !isLog ? 'not-allowed' : 'pointer',
  [theme.breakpoints.down('sm')]: { width: 150 },
}));

const PayBtn = ({ cartItems }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLog = localStorage.getItem('userData');

  const placeOrder = () => {
    const isLoggedIn = localStorage.getItem('userData');
    if (!isLoggedIn) return;
    const user = JSON.parse(localStorage.getItem('userData'));
    axios.post(`${URL}/create-checkout-session`, {
      cartItems,
      user,
    }).then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url
      }
    }).catch((e) => {
      console.log(e.message);
    });
  };

  return (
    <StyledButton isLog={isLog} isHovered={isHovered}  onClick={placeOrder} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {isLog ? "Place Order" : (isHovered && !isLog ? "Login" : "Place Order")}
    </StyledButton>
  );
};

export default PayBtn;
