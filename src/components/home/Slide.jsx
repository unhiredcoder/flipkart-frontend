import { Box, Typography, styled, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Countdown from 'react-countdown';
import { NavLink } from 'react-router-dom';


const ProductImage = styled('img')(({ theme }) => ({
  height: '140px',
  width: 'auto',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    height: '120px',
  },
}));

const ModifyedText = styled(Typography)({
  marginTop: '5px',
  fontSize: '13px'
});


const Slide = ({ products, title ,loading}) => {
  // const [loading, setLoading] = useState(true); // State to manage loading status


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

    // useEffect(() => {
    //   // Simulate API call delay for demonstration purposes
    //   setTimeout(() => {
    //     setLoading(false); // Set loading to false after fetching data (Replace this with your actual API call)
    //   }, 2000);
    // }, []);

  const renderer = ({ hours, minutes, seconds }) => {
    // Format the countdown values to hh:mm:ss format
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return <span>{formattedTime} Left</span>;
  };

  const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';
  const isFirstSlide = title === 'Deal of the Day'; // Check if it's the first slide

  return (
    <Box marginTop={1} style={{ background: '#fff' }}>
      <Box padding="15px 20px" display="flex">
        <Typography fontSize={20} fontWeight={600} marginRight={4}>
          {title}
        </Typography>
        {isFirstSlide && (
          <Box display="flex" alignItems="center" color="#7f7f7f">
            <img src={timerURL} alt="time" width={28} />
            <Countdown date={Date.now() + 5.04e7} renderer={renderer} />
          </Box>
        )}
      </Box>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        centerMode={true}
        slidesToSlide={1}
        containerClass="carousel-container"
      >
        {products.map((product) => (
          <NavLink to={`/product/detail/${product.id}`} key={product.id} style={{ textDecoration: 'none' }}>
              {loading ? (
              <Box style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}} padding="25px 15px">
                <Skeleton variant="rectangular" style={{borderRadius:'4px'}}  width={120} height={120} />
                <Skeleton variant="text" width={120} height={14} style={{ marginTop: '10px' }} />
                <Skeleton variant="text" width={60} height={14} style={{ marginTop: '5px' }} />
                <Skeleton variant="text" width={120} height={14} style={{ marginTop: '5px' }} />
              </Box>
            ) : (
              <Box textAlign="center" padding="25px 15px">
                <ProductImage src={product.url} alt="product" />
                <ModifyedText color="#212121" fontWeight={600}>
                  {product.title?.shortTitle}
                </ModifyedText>
                <ModifyedText color="green">{product.discount}</ModifyedText>
                <ModifyedText color="#212121" style={{ opacity: 0.6 }}>
                  {product.tagline}
                </ModifyedText>
              </Box>
            )}

          </NavLink>
        ))}
      </Carousel>
    </Box>
  );
};

export default Slide;
