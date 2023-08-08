import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem, Fade } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, saveCartToBackend } from '../../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';

const Profile = ({ account, setAccount }) => {
  const dispatch=useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate=useNavigate()

  
  const cart = useSelector((state) => state.cart);
  const cartData = cart?.products

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clearUserDetailsFromLocalStorage = () => {
    localStorage.removeItem('userData');
  };

  const user = JSON.parse(localStorage.getItem('userData'));
  const userId = user ? user._id : null;


  const logout = async () => {
    console.log("sendingid",userId);
    dispatch(saveCartToBackend(userId, cartData));
    dispatch(clearCart());
    setAccount('');
    clearUserDetailsFromLocalStorage();
    navigate('/')
  };


  return (
    <>
      <Box onClick={handleClick}>
        <Typography style={{ cursor: "pointer", whiteSpace: 'nowrap' }}>{`Hello, ${account}`}</Typography>
      </Box>
      <Menu style={{ marginTop: "5px" }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => (logout())} style={{ fontSize: "14px", height: "20px" }}><PowerSettingsNewIcon color='primary' fontSize='small' /> &nbsp;
          Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
