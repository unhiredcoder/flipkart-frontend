import React from 'react';
import { Grid, styled } from '@mui/material';
import Skeleton from 'react-loading-skeleton';

const MidSection = ({ urls }) => {
  return (
    <>
      <Grid marginTop={1} justifyContent='space-between' lg={12} sm={12} md={12} xs={12} container>
        {urls.map((url, id) => (
          <Grid key={id} lg={4} item sm={12} md={4} xs={12}>
            {url ? (
              // Show the image if the URL is available
              <img src={url} alt="sidebanner" width='100%' />
            ) : (
              // Show the loading skeleton while data is loading (URL is not available)
              <Skeleton width={'100%'} height={200} />
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MidSection;
