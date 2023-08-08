import React, { useState } from 'react';
import { AppBar, Toolbar, styled, Box, Typography, IconButton, Drawer } from '@mui/material';
import Search from './Search';
import CustomButton from './CustomButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";
const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

const MyComponent = styled(AppBar)({
    backgroundColor: "#2874f0",
    display: "flex",
    justifyContent: "center",
    height: "55px",
    boxShadow: "none"
});

const StyledBox = styled(NavLink)(({ theme }) => ({
    marginLeft: "12%",
    lineHeight: 0,
    [theme.breakpoints.down('md')]: {
        marginLeft: "5%",
    },
}));

const SubHeading = styled(Typography)(({ theme }) => ({
    fontSize: "10px",
    fontStyle: "italic",
    [theme.breakpoints.down('md')]: {
    fontSize: "1px",
    },
}));

const PlusImage = styled('img')({
    width: 10,
    height: 10,
    marginLeft: 4
});


const Logo = styled('img')(({ theme }) => ({
    width: 75,
        [theme.breakpoints.down('md')]: {
            width: 55
        },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'block',
        },
}));



const Header = () => {

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(!open)
    }

    return (
        <>
            <MyComponent>
                <Toolbar>
                    <StyledIconButton color='white' onClick={handleClose}>
                        <MenuIcon />
                    </StyledIconButton>
                    <Drawer open={open} onClose={handleClose}><CustomButton /></Drawer>
                    <StyledBox to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Logo src={logoURL} alt="logo" />
                        <Box display={'flex'} >
                            <SubHeading>Explore&nbsp;
                                <Box component="span" color={"#ffe500"}>Plus</Box>
                            </SubHeading>
                            <PlusImage src={subURL} alt="sublogo" />
                        </Box>
                    </StyledBox>
                    <Search />
                    <Box component='span' display={{ xs: 'none', md: 'block' }}>
                        <CustomButton />
                    </Box>
                </Toolbar>
            </MyComponent>
        </>
    );
};

export default Header;
