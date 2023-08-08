import React from 'react';
import { styled, Button, Box } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity } from '../../redux/actions/cartActions';

const StyledBtnGroup = styled(Button)({
  borderRadius: '50%',
});

const BtnGroup = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(item.id));
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <StyledBtnGroup onClick={handleDecrement}>-</StyledBtnGroup>
          <Button disabled><b>{item?.quantity}</b></Button>
          <StyledBtnGroup onClick={handleIncrement}>+</StyledBtnGroup>
        </ButtonGroup>
      </Box >
    </>
  );
};

export default BtnGroup;
            