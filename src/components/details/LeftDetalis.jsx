import React, { useState } from 'react';
import { Box, Button, styled } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart } from '../../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { URL } from '../../constants/data';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: '40%',
  padding: '0 0 0 80px',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: '0 20px',
  },
}));

const StyledImage = styled('img')(({ theme }) => ({
  // padding: '15px 20px',
  border: '1px solid #f0f0f0',
  width: '70%',
  margin: '50px 30px 20px 0',
  [theme.breakpoints.down('sm')]: {
    // margin: '0 auto 20px 50px',
    width: '70%',
    margin: '0 auto',
    marginBottom: 30,
  },
}));
const StyledImage2 = styled(Skeleton)(({ theme }) => ({
  // padding: '15px 20px',
  border: '1px solid #f0f0f0',
  width: '70%',
  margin: '50px 30px 20px 0',
  [theme.breakpoints.down('sm')]: {
    // margin: '0 auto 20px 50px',
    width: '70%',
    margin: '0 auto',
    marginBottom: 30,
  },
}));

const LeftDetails = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  console.log("🚀 ~ file: LeftDetalis.jsx:38 ~ LeftDetails ~ cart:", cart)
  const cartItems = cart.products
  const isProductInCart = cartItems.some((p) => p.id === product.id);

  const addItemToCart = () => {
    if (!isProductInCart) {
      const user = JSON.parse(localStorage.getItem('userData'));
      const userId = user ? user._id : null;
      console.log("sending pid", product.id);
      dispatch(addItemsToCart(product.id, userId));
      navigate('/cart');
    }
  };


  const [isHovered, setIsHovered] = useState(false);
  const isLoggedIn = JSON.parse(localStorage.getItem('userData'));

  const placeOrder = (product) => {
    if (!isLoggedIn) return;
    else {
      const user = JSON.parse(localStorage.getItem('userData'));
      axios.post(`${URL}/create-checkout-session`, {
        cartItems: [product], // Sending the current product as an array
        user,
      })
        .then((res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };






  const StyledButton = styled(Button)(({ theme, isHovered,isLoggedIn }) => ({
    color: '#fff',
    background: '#fb641b',
    width: 250,
    height: 51,
    '&:hover': {
      background:isHovered && isLoggedIn  ? '#fb641b' : '#cccccc',
      boxShadow: '0 2px 4px 0 rgb(0 0 0/10%)',
    },
    marginLeft: 'auto',
    cursor:isHovered && isLoggedIn  ? 'pointer' : 'not-allowed',
    [theme.breakpoints.down('sm')]: {
      width: 150,
    },
  }));
  const StyledButton2 = styled(Button)(({ theme }) => ({
    color: '#fff',
    background: '#fb641b',
    width: 250,
    height: 51,
    '&:hover': {
      background: '#ff9f00',
      boxShadow: '0 2px 4px 0 rgb(0 0 0/10%)',
    },
    marginLeft: 'auto',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: 150,
    },
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 20 }}>
      <LeftContainer>
        <StyledImage src={product.detailUrl} alt="detailed url" />
        <StyledButton2
          sx={{ width: '46%', height: '50px', borderRadius: '2px', background: '#ff9f00', marginRight: '10px' }}
          variant="contained"
          onClick={() => {
            addItemToCart();
          }}
        >
          <ShoppingCartIcon />

          {
            isProductInCart ? "In Cart" : " Add to Cart"
          }
        </StyledButton2>

        <StyledButton isLoggedIn={isLoggedIn} isHovered={isHovered}
          sx={{ width: '46%', height: '50px', borderRadius: '2px', background: '#fb541b' }}
          onClick={()=>placeOrder(product)}
          variant='contained'
          onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <FlashOnIcon />
          {isLoggedIn ? "Buy Now" : (isHovered && !isLoggedIn ? "Login" : "Buy Now")}
        </StyledButton>

      </LeftContainer>
    </motion.div>
  );
};

export default LeftDetails;
