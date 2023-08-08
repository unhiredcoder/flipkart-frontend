import React from 'react';
import Slide from './Slide';
import { Box, styled, useTheme } from '@mui/material';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LeftComponent = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '83%',
  },
}));

const RightComponent = styled(Box)({
  background: '#fff',
  padding: '5px',
  marginTop: '10px',
  marginLeft: '10px',
  width: '15%',
  textAlign: 'center',
  display: 'none',
  '@media (min-width: 960px)': {
    display: 'block',
  },
});

const SideSlide = ({ products, title, loading }) => {
  const theme = useTheme();
  const adURL =
    'https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70';

    return (
      <Box display="flex">
        <LeftComponent>
          <Slide products={products} title={title} loading={loading} />
        </LeftComponent>
        <RightComponent theme={theme}>
          {loading ? (
              <Skeleton variant="rectangular" style={{ borderRadius: '4px' }} width='100%' height='100%' />
            // </Box>
          ) : (
            <img src={adURL} width={217} alt="sideimage" />
          )}
        </RightComponent>
      </Box>
    );
  };

export default SideSlide;
