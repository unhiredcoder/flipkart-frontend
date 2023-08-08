import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, styled } from '@mui/material';
import NotFound from './NotFound';
import { motion ,AnimatePresence} from 'framer-motion';


const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  background: '#fff',
  alignItems: 'center',
  borderBottom: '1px solid #f0f0f0',
  margin: '10px 15px',
  '&:hover': {
    boxShadow: "0 2px 4px 0 rgb(0 0 0/10%)"
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column', // Stack items vertically below 'md' screen
    alignItems: 'center', // Align items to the left below 'md' screen
  },
}));

const Main = styled(Box)(({ theme }) => ({
  marginLeft: '80px',
  [theme.breakpoints.down('md')]: {
    margin: '0 10px',
  },
}));

const ProductImage = styled('img')(({ theme }) => ({
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '120px'
  },
}));

const StyledTypo = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  '&:hover': {
    color: '#2874f0'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  }
}));

const Load = styled(Box)({
  minHeight: '100vh',
  background: '#f0f0f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)'
})





const SearchResults = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { filteredData } = location.state;
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const [isLoading, setIsLoading] = useState(true); // Add the loading state

  const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

  useEffect(() => {
    // Simulate an API call or any asynchronous operation
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after the data is fetched
    }, 2000);
  }, []);

  const handleClick = (data) => {
    navigate(`/product/detail/${data.id}`)
  }
  return (
    <>  {isLoading ? (
      <Load>
        <img width={50} src="/loooding.svg" alt="img" />
      </Load>
    ) : filteredData && filteredData.length > 0 ? (
      filteredData.map((item,index) => (
        <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: index * 0.2 }} // Adjust the delay for a staggered effect
      >          <Wrapper key={item.id}>
            <Box margin={4}>
              <ProductImage src={item?.url} alt="product" width={160} />
            </Box>
            <Main>
              <StyledTypo style={{ marginTop: -20 }}>
                {item.title.longTitle}
              </StyledTypo>
              <Typography
                style={{
                  marginTop: 5,
                  color: '#878787',
                  fontSize: 14,
                  display: 'flex',
                }}
              >
                {getRandomNumber(500, 1000)} Ratings & {getRandomNumber(1000, 1500)} reviews
              </Typography>
              <Box>
                <img src={fassured} width={50} style={{ marginLeft: 1 }} alt="img" />
                <Typography style={{ margin: '10px 0' }}>
                  <Box component='span' style={{ color: '#388e3c' }}>
                    {item.discount}
                  </Box>
                </Typography>
              </Box>
              <Button
                style={{ marginLeft: '-7px', textTransform: 'none' }}
                onClick={() => handleClick(item)}
                color="primary"
              >
                View Details
              </Button>
            </Main>
          </Wrapper>
        </motion.div>
      ))
    ) : (
      <NotFound />
    )}
    </>
  );
};

export default SearchResults;
