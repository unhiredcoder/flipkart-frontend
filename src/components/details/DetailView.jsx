import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../redux/actions/productAction';
import { Box, Grid, Typography, styled } from '@mui/material';
import LeftDetails from './LeftDetalis';
import RightDetails from './RightDetails';


const Container = styled(Box)({
  background: '#fff',
  marginTop: '120px',
  margin: 0
})
const GridContainer = styled(Grid)({
  background: '#fff',
  display: 'flex',
})
const Load = styled(Box)({
  // width:'100%',
  minHeight:'100vh',
  background: '#f0f0f0',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)'
})


const DetailView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product } = useSelector((state) => state.getproductDetails);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    setLoading(true); // Set loading to true initially to show a loading state while fetching data

    // Always call the getProductDetails() function when the component mounts
    dispatch(getProductDetails(id)).then(() => {
      // Once the data is loaded, set loading to false
      setLoading(false);
    });
  }, [dispatch, id]);


  return (
    <Container>
      {loading ? (
        <Load>
          <img width={50} src="/loooding.svg" alt="img" />
        </Load>
      ) : (
        product && Object.keys(product).length > 0 && (
          <GridContainer container>
            <Grid item lg={4} md={4} sm={8} sx={12}>
              <LeftDetails product={product} />
            </Grid>
            <Grid paddingLeft='20px' item lg={8} md={8} sm={8} sx={12}>
              <RightDetails product={product} />
            </Grid>
          </GridContainer>
        )
      )}
    </Container>
  );
};

export default DetailView;
