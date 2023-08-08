import { Box, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'


const Container = styled(Box)(({ theme }) => ({
  margin: '0 20px',
  background: '#fff',
  padding: '15px 24px',
  '& > p': {
    marginBottom: 20,
    fontSize: 14
  },
  '& > h6': {
    marginBottom: 20,
  },
  [theme.breakpoints.up('md')]: {
    width: '100%',
  }
}))


const TotalHeader = styled(Box)(({ theme }) => ({
  background: '#fff', padding: '15px 24px', borderBottom: '1px solid #f0f0f0',
  margin: '0 20px',
  [theme.breakpoints.up('md')]: {
    width: '100%',
  }
}))

const TotalBalance = ({ cartItems }) => {
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    TotalAmount()
  }, [cartItems])

  const TotalAmount = () => {
    let price = 0, discount = 0;
    cartItems.map((item) => {
      price += item?.price.mrp*item?.quantity
      discount += (item?.price.mrp - item?.price?.cost)*item?.quantity
    })
    setPrice(price)
    setDiscount(discount)

  }

  return (
    <Box>
      <TotalHeader>
        <Typography color='#878787' fontWeight='bold'>PRICE DETAILS</Typography>
      </TotalHeader>
      <Container>
        <Typography>Price ({cartItems?.length} item)
          <Box style={{ float: 'right' }} component='span'>₹{price.toLocaleString()}</Box>
        </Typography>
        <Typography>Discount
          <Box style={{ float: 'right' }} component='span'>- ₹{discount.toLocaleString()}</Box>
        </Typography>
        <Typography>Deleviry Charges
          <Box style={{ float: 'right' }} component='span'>₹40</Box>
        </Typography>
        <Typography variant='h6' >Total Amount
          <Box style={{ float: 'right' }} component='span'>₹{(price - discount + 40).toLocaleString()}</Box>
        </Typography>
        <Typography style={{ color: 'green', fontSize: 14, fontWeight:'bolder' }}>You will save ₹{(discount - 40).toLocaleString()} on this order</Typography>
      </Container>
    </Box>
  )
}

export default TotalBalance