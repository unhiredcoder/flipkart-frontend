import React from 'react';
import { Box, Typography, styled, Button } from '@mui/material';
import BtnGroup from './BtnGroup';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions/cartActions';
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion';

const Wrapper = styled(motion.div)({
  borderTop: '1px solid #f0f0f0',
  display: 'flex',
  alignItems: 'center',
  background: 'white',
  justifyContent: 'start',
});

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
  },
}));

const CartItem = ({ item }) => {
  const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
  const dispatch = useDispatch();
  const RemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };


  return (
    <Wrapper initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
      <Box margin={4} textAlign='center'>
        <img src={item?.url} alt="product" width={110} />
    <BtnGroup item={item} />
      </Box>
      <Box>
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to={`/product/detail/${item.id}`}
        >
          <StyledTypography>{item.title.longTitle}</StyledTypography>
        </Link>
        <Typography style={{ marginTop: 10, color: '#878787', fontSize: 14 }}>
          Seller: RetailNet
          <Box component='span'><img src={fassured} width={50} style={{ marginLeft: 10 }} alt="img" /></Box>
        </Typography>
        <Typography style={{ margin: '20px 0' }}>
          <Box component='span' style={{ fontWeight: 600, fontSize: 18 }}>₹{item.price?.cost.toLocaleString()}</Box>&nbsp;&nbsp;&nbsp;
          <Box component='span' style={{ color: '#878787' }}><strike>₹{item.price.mrp.toLocaleString()}</strike></Box>&nbsp;&nbsp;&nbsp;
          <Box component='span' style={{ color: '#388e3c' }}>{item?.price?.discount} off</Box>
        </Typography>
        <Button style={{ marginTop: 10, color: '#000', fontSize: 16, fontWeight: 600 }} onClick={() => RemoveItem(item.id)}>Remove</Button>
      </Box>
    </Wrapper>
  );
};

export default CartItem;