
import React, { useContext, useState, useEffect } from 'react';
import Dialog from "@mui/material/Dialog";
import { Box, TextField, Typography, Button, styled } from '@mui/material';
import { useFormik } from 'formik';
import { authenticateSignUp, authenticateLogin } from '../../services/api';
import { DataContext } from '../../../context/DataProvider';
import { SignupSchema, LoginSchema } from './FormSchema'
import { fetchCartData } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';




const Component = styled(Box)(({ theme }) => ({
  maxHeight: "70vh",
  width: "90vh",
  [theme.breakpoints.down('sm')]: {
    width: "100%", // Adjust the width for smaller screens
  },
}));

const RightContainer = styled('form')(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "45px 35px",
  flex: "1",
  '& > div, & > button, & > p': {
    marginTop: "10px",
  },
  [theme.breakpoints.up('sm')]: {
    width: '100%',
    margin: '10px',
    overflow: 'hidden',
  },
}));

const LeftContainer = styled(Box)(({ theme }) => ({
  background: "#2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat",
  width: "30%",
  padding: "45px 35px",
  '& > p ,& > h5': {
    color: "#fff",
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const CreateAC = styled(Typography)(({ theme }) => ({
  color: "#2874f0",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
  textAlign: "center",
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    fontSize: "16px", // Adjust the font size for smaller screens
  },
}));
const Error = styled(Typography)({
  position: 'relative',
  top: -5,
  color: "red",
  fontSize: "12px",
  textAlign: "start"
})


const SignUpInitialValue = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  role:""
};

const LoginInitialValue = {
  emailOrUsername: "",
  password: "",

}

const LoginDialog = ({ open, setOpen }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { setAccount } = useContext(DataContext);
  const dispatch = useDispatch()
  const location = useLocation();






  const handleClose = () => {
    setOpen(false);
    setShowSignup(false);
    setIsError(false);
  };



  const saveUserDetailsToLocalStorage = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const getUserDetailsFromLocalStorage = () => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      return JSON.parse(userDataString);
    }
    return null;
  };



  useEffect(() => {
    const loggedInUser = getUserDetailsFromLocalStorage();
    if (loggedInUser) {
      setAccount(loggedInUser.firstname);
    }
  }, []);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: !showSignup ? LoginInitialValue :{ ...SignUpInitialValue, role: "user" },
    validationSchema: !showSignup ? LoginSchema : SignupSchema,
    onSubmit: async (values, action) => {
      try {
        if (showSignup) {
          // Handle Signup
          const signUpData = { ...values, role: "user" };
          console.log("🚀 ~ file: loginDialog.jsx:132 ~ onSubmit: ~ values:", signUpData)
          const response = await authenticateSignUp(signUpData);
          console.log("getting", response);
          if (response) {
            handleClose();
            saveUserDetailsToLocalStorage(response.user);
            setAccount(values.firstname);
          }
          action.resetForm()
        } else {
          // Handle Login
          const response = await authenticateLogin(values);
          console.log("getting",response);
          if (response.status === 200) {
            const userData = response.data;
            // User is an admin, allow access to the dashboard
            handleClose();
            saveUserDetailsToLocalStorage(userData);
            const userId = userData ? userData._id : null;
            dispatch(fetchCartData(userId));
            setAccount(userData.firstname);
            if (userData.role === "admin" || userData.role === "superadmin" ) {
              setIsAdmin(true); // Set the isAdmin state to true
            }
          } else {
            setIsError(true);
            action.resetForm()
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });


  return (
    <Dialog open={open} onClose={() => handleClose()} PaperProps={{ sx: { maxWidth: "unset" } }}>
      <Component>
        <Box display="flex" height="100%">
          {
            !showSignup ?
              <>
                <LeftContainer>
                  <Typography variant='h5'>Login</Typography>
                  <Typography marginTop="20px">Get access to your <br /> Orders, Wishlist and <br />Recommendations</Typography>
                </LeftContainer>
                <RightContainer onSubmit={handleSubmit}>
                  <TextField variant='standard' onChange={handleChange} value={values.emailOrUsername} name="emailOrUsername" label="Enter Username/Email" />
                  {isError && <Error>Invalid email/username or password</Error>}
                  <TextField variant='standard' onChange={handleChange} value={values.password} name="password" label="Enter password" />
                  {errors.password && touched.password && <Error>{errors.password}</Error>}
                  <Typography fontSize="12px " color="#878787">By continuing, you agree to Flipkart's <span style={{ color: "blue" }}>Terms of Use</span> and <span style={{ color: "blue" }}>Privacy Policy.</span></Typography>
                  <Button type='submit' style={{ background: "#fb641b", color: "#fff", height: "48px", borderRadius: "2px" }}>LOGIN</Button>
                  <Typography textAlign="center">OR</Typography>
                  <Button style={{ background: "#ffff", color: "#2874f0", height: "48px", borderRadius: "2px", boxShadow: "0 2px 4px 0 rgb(0 0 0/20%)", textTransform: "none" }}>Request Otp</Button>
                  <CreateAC onClick={() => setShowSignup(true)}>New to Flipkart? Create an account</CreateAC>
                </RightContainer>
              </>
              :
              <>
                <LeftContainer>
                  <Typography variant='h5'>Looks like Your're new here !</Typography>
                  <Typography marginTop="20px">Sign up with your mobile number to get started</Typography>
                </LeftContainer>
                <RightContainer style={{ padding: "20px 35px" }} onSubmit={handleSubmit}>
                  <TextField
                    variant="standard"
                    onChange={handleChange}
                    name="firstname"
                    label="Enter Firstname"
                    value={values.firstname}
                  />
                  {errors.firstname && touched.firstname && <Error>{errors.firstname}</Error>}

                  <TextField
                    variant="standard"
                    onChange={handleChange}
                    name="lastname"
                    label="Enter Lastname"
                    value={values.lastname}
                  />
                  {errors.lastname && touched.lastname && <Error>{errors.lastname}</Error>}

                  <TextField
                    variant="standard"
                    onChange={handleChange}
                    name="username"
                    label="Enter Username"
                    value={values.username}
                  />
                  {errors.username && touched.username && <Error>{errors.username}</Error>}

                  <TextField
                    variant="standard"
                    onChange={handleChange}
                    name="email"
                    label="Enter Email"
                    value={values.email}
                  />
                  {errors.email && touched.email && <Error>{errors.email}</Error>}

                  <TextField
                    variant="standard"
                    onChange={handleChange}
                    name="password"
                    label="Enter Password"
                    type="password"
                    value={values.password}
                  />
                  {errors.password && touched.password && <Error>{errors.password}</Error>}

                  <TextField
                    // style={{ marginBottom: "20px" }}
                    variant="standard"
                    onChange={handleChange}
                    name="phone"
                    type="tel"
                    label="Enter phone"
                    value={values.phone}
                  />
                  {errors.phone && touched.phone && <Error>{errors.phone}</Error>}

                  <Button type='submit' style={{ background: "#fb641b", color: "#fff", height: "48px", borderRadius: "2px" }} >Continue</Button>
                </RightContainer>
              </>
          }
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;












