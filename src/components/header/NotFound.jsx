import { Box,styled,Typography } from '@mui/material';
import React from 'react'


const Component = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    textAlign: 'center',
    lineHeight: 3,
    transform: 'translate(-50%,-50%)',
    flexDirection: 'column',
    '& > h5': {
      fontWeight: 600,
    },
    '& > h6': {
      color: '#878787',
      whiteSpace: 'nowrap'
    },
    [theme.breakpoints.down('md')]: {
      '& > h5': {
        fontWeight: 600,
        fontSize: '18px'
      },
      '& > h6': {
        color: '#878787',
        fontSize: '14px',
        whiteSpace: 'normal'
      },
      '& > img': {
        width: 200,
      }
    }
  }));

const NotFound = () => {
  const Notfound = 'https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png'
  return (
    <>
    <Component>
      <img src={Notfound} alt="img" />
      <Typography variant='h5' >Sorry, no results found!</Typography>
      <Typography variant='h6'>Please check the spelling or try searching for something else</Typography>
    </Component>
  </>
  )
}

export default NotFound