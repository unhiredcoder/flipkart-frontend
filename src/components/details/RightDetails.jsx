import { Box, styled, Table, TableBody, TableCell,Typography, TableRow } from '@mui/material'
import React from 'react'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { motion } from 'framer-motion';

const Text = styled(Typography)({
    fontSize: '14px',
    marginTop: 20,
    display: 'flex'
})
const StyledBadge = styled(LocalOfferIcon)({
    color: 'forestgreen',
    verticalAlign: 'baseline',
})
const MyRow = styled(TableRow)({
    fontSize: '14px',
    
    verticalAlign:'baseline',
    '& > td': {
        fontSize: '14px',
      marginTop:10,
      border:'none'
    },
  });

const RightDetails = ({ product }) => {
    const date = new Date(new Date().getTime(+(5 * 24 * 60 * 60 * 1000)))
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';


    return (
        <>
            <motion.div initial={{ opacity: 0,y:0 }} animate={{ opacity: 1, y:20 }}>
            <Typography  fontSize={20} marginTop={5}>{product.title.longTitle}</Typography>
            <Typography style={{ marginTop: 5, color: '#878787', fontSize: 14,display:'flex ' }}>
            {getRandomNumber(50, 100)} Ratings & {getRandomNumber(87, 500)} reviews
                <Box component='span'><img src={fassured} style={{ marginLeft: 20, width: 77 }} alt="asssured" /></Box>
            </Typography>
            <Typography>
                <Box component='span' style={{ fontSize: 28 }}>₹{product.price.cost.toLocaleString()}</Box>&nbsp;&nbsp;&nbsp;
                <Box component='span' style={{ color: '#878787' }}><strike>₹{product.price.mrp.toLocaleString()}</strike></Box>&nbsp;&nbsp;&nbsp;
                <Box component='span' style={{ color: '#388e3c' }}>{product.price.discount} off</Box>
            </Typography>
            <Typography><b>Available Offers</b></Typography>
            <Box>
                <Text><StyledBadge />&nbsp;&nbsp;&nbsp;&nbsp;Get extra 20% off upto ₹50 on 1 item(s) T&C </Text>
                <Text><StyledBadge />&nbsp;&nbsp;&nbsp;&nbsp;5% Cashback on Flipkart Axis Bank Card T&C</Text>
                <Text><StyledBadge />&nbsp;&nbsp;&nbsp;&nbsp;Flat ₹4,000 Off on HDFC Bank Credit Card EMI Trxns on orders of ₹50,000 and above T&C</Text>
                <Text><StyledBadge />&nbsp;&nbsp;&nbsp;&nbsp;Get extra 31% off (price inclusive of cashback/coupon) T&C</Text>
                <Text><StyledBadge />&nbsp;&nbsp;&nbsp;&nbsp;No Cost EMI on Bajaj Finserv EMI Card on cart value above ₹2997 T&C</Text>
                <Text><StyledBadge />&nbsp;&nbsp;&nbsp;&nbsp;Flat ₹15 Instant Discount on Paytm UPI. Min Order Value ₹250. Valid once per Paytm account T&C</Text>
            </Box>
            <Table>
                <TableBody>
                    <MyRow>
                        <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>Delivery By {date.toDateString()} | ₹40</TableCell>
                    </MyRow>
                    <MyRow>
                        <TableCell style={{ color: '#878787' }}>Warranty</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>No Warranty</TableCell>
                    </MyRow>
                    <MyRow>
                        <TableCell >Seller</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>
                            <Box style={{ color: '#2874f0' }} component='span'>
                                SuperComNet
                            </Box>
                            <Typography>GST Invoice Available</Typography>
                            <Typography>View more sellers starting from ₹{product.price.cost}</Typography>
                        </TableCell>
                    </MyRow>
                    <MyRow>
                        <TableCell colSpan={2}>
                            <img src={adURL} width={300} alt="points" />
                        </TableCell>
                    </MyRow>
                    <MyRow>
                        <TableCell style={{ color: '#878787' }} >Description
                        </TableCell>
                        <TableCell>{product.description}</TableCell>
                    </MyRow>
                </TableBody>
            </Table>
            </motion.div>
        </>
    )
}

export default RightDetails