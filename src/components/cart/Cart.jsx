import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography,Button, styled } from '@mui/material';
import CartItem from './CartItem';
import TotalBalance from './TotalBalance';
import EmptyCart from './EmptyCart';
import { motion } from 'framer-motion';
import { clearCart } from '../../redux/actions/cartActions';
import PayBtn from './PayBtn';


const BtnWrapper = styled(Box)({
  background: '#fff',
  padding: '16px 22px',
  borderTop: '1px solid #f0f0f0',
})

const Container = styled(Grid)(({ theme }) => ({
  padding: '30px 135px',
  [theme.breakpoints.down('md')]: {
    padding: '15px 0px',
    maxWidth: '100%'
  },
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginBottom: '15px',
    minWidth: '100%'
  },
}));

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.products);
  // console.log("🚀 ~ file: Cart.jsx:35 ~ Cart ~ cartItems:", cartItems)
  const dispatch = useDispatch();
  const clear=()=>{
    dispatch(clearCart());
  }
  useEffect(() => {
    document.title = cartItems.length > 0 ? `cart [${cartItems.length}]` : 'ProMart';
  }, [cartItems]);
  
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
      {cartItems && cartItems.length > 0 ? (
        <Container container>
          <LeftComponent item xs={12} sm={6} md={9} lg={9}>
          <Box style={{ background: '#fff',display:'flex',justifyContent:'space-between' }} padding='15px 50px'>
              <Typography><b>My Cart ({cartItems.length})</b></Typography>
              <Button onClick={clear}><b>Clear</b></Button>
            </Box>
            {cartItems && cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <BtnWrapper>
            <PayBtn cartItems={cartItems}/>
            </BtnWrapper>
          </LeftComponent>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <TotalBalance cartItems={cartItems} />
          </Grid>
        </Container>
      ) : (
        <EmptyCart />
      )}
    </motion.div>
  );
};

export default Cart;

