import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { styled } from '@mui/material';
import 'react-multi-carousel/lib/styles.css';
import { bannerData } from '../../constants/data';
import Skeleton from 'react-loading-skeleton';

const ImgTag = styled('img')(({ theme }) => ({
  width: '100%',
  height: '300px',
  [theme.breakpoints.down('md')]: {
    objectFit: 'cover',
    Width: '100%',
    height: '120px',
  },
}));

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const LoadingSkeleton = () => {
  // Show the skeleton while data is loading
  return <Skeleton width={'100%'}  height={'300px'} />;
};

const Banner = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading by setting a timeout (replace this with actual data fetching)
    const fetchData = () => {
      // Replace the following setTimeout with actual data fetching logic
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Replace 2000 with the actual time it takes to load the data
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        // Show the loading skeleton while data is loading
        <LoadingSkeleton />
      ) : (
        // Show the Carousel once data is loaded
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          keyBoardControl={true}
          slidesToSlide={1}
          containerClass="carousel-container"
        >
          {bannerData.map((item, index) => (
            <ImgTag src={item.url} alt="banner" key={index} />
          ))}
        </Carousel>
      )}
    </>
  );
};

export default Banner;
