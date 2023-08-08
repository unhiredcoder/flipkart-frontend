import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { getProducts } from '../../redux/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import SideSlide from './SideSlide';
import MidSection from './MidSection';
import { imageURL } from '../../constants/data';

import Slide from './Slide';

const Component = styled(Box)({
  background: '#f2f2f2',
  padding: '10px',
});

const Home = () => {
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.getproducts.products);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    dispatch(getProducts())
      .then(() => {
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false); // Set loading to false even if there's an error to stop the shimmer effect
      });
  }, [dispatch]);
  
  return (
    <>
      <Navbar />
      <Component>
        <Banner />
        {products && products.length > 0 && <SideSlide products={products}  loading={loading} title='Deal of the Day' />}
        {products && products.length > 0 && <Slide products={products} loading={loading} title='Top picks for you!' />}
        <MidSection urls={imageURL.slice(0, 3)} /> {/* Pass the first 3 URLs */}
        {products && products.length > 0 && <Slide products={products} loading={loading} title='Recommended Items' />}
        {products && products.length > 0 && <Slide products={products} loading={loading} title='Discounts for You' />}
        <MidSection urls={imageURL.slice(3, 6)} /> {/* Pass the next 3 URLs */}
        {products && products.length > 0 && <Slide products={products} loading={loading} title='Top Deals' />}
        {products && products.length > 0 && <Slide products={products} loading={loading} title='Trending Offers' />}
        <MidSection urls={imageURL.slice(6, 9)} /> {/* Pass the last 3 URLs */}
        {products && products.length > 0 && <Slide products={products} loading={loading} title="Seasons's Top Pick" />}
      </Component>
    </>
  );
};

export default Home;
