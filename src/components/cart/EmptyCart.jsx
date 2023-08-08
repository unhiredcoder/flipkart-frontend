import { Box, Typography ,styled,Button} from '@mui/material';
import React from 'react'
import {Link} from "react-router-dom"


const Component=styled(Box)(({ theme }) => ({
height:'65vh',
background:'#fff',
margin:'120px',
[theme.breakpoints.down('md')]: {
    margin:0,
    width:'100vw',
    minHeight:'100vh',
    background: '#fff',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  },
}));





const BtnWrapper=styled(Link)({
    background:'#fff',
    padding:'16px 22px',
    borderTop:'1px solid #f0f0f0',
    textDecoration:'none'
  
  })


const EmptyCart = () => {
    const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';

    return (
        <Component>
            <Box style={{textAlign:'center',paddingTop:'70px'}}>
                <img src={imgurl} alt="emptycartimg" width={200} />
                <Typography >Your Cart is Empty</Typography>
                <Typography>Add items to it Now</Typography>
            <BtnWrapper to={'/'}><Button style={{marginTop:'20px',color:'#fff',background:'#fb641b',width:250,height:51}}>Go Back</Button></BtnWrapper>
            </Box>
        </Component>
    )
}

export default EmptyCart