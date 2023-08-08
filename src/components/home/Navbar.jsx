import React, { useState, useEffect } from 'react';
import { navData } from '../../constants/data';
import { Box, Typography, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  margin: '55px 130px 0 180px',
  overflow: 'overlay',
  background: '#fff',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    margin: 0,
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Local loading state

  // Simulate data loading with useEffect
  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Replace 2000 with the actual time it takes to load the data
  }, []);

  const { products } = useSelector((state) => state.getproducts.products); // Get products from the Redux store

  useEffect(() => {
    // When the products data is available, update the filtered products
    if (products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  const handleProductClick = (category) => {
    // Filter products based on the clicked category
    const filteredProducts = products.filter((item) => item.category === category);

    // Store the filtered products in state
    setFilteredProducts(filteredProducts);

    // Redirect the user to '/search-results' with the filtered data in the state
    navigate('/search-results', { state: { filteredData: filteredProducts } });
  };

  return (
    <Box style={{ background: '#fff' }}>
      <Wrapper>
        {loading ? (
          // Show the loading skeleton while data is loading
          <Box display="flex" flexDirection="row">
            {navData.map((item, index) => (
              <Box key={index} padding="12px 20px" textAlign="center">
                <Skeleton circle={true} height={74} width={74} />
                <Skeleton height={16} width={74} />
              </Box>
            ))}
          </Box>
        ) : (
          // Show the actual data once it is loaded
          <Box display="flex" flexDirection="row">
            {navData.map((item, index) => (
              <Box key={index} padding="12px 20px" textAlign="center" onClick={() => handleProductClick(item.text)}>
                <img src={item.url} width={74} alt="nav-image" />
                <Typography fontSize="14px" fontWeight="bold" fontFamily="sans-serif">
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Wrapper>
    </Box>
  );
};

export default Navbar;
