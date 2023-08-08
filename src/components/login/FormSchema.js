import * as Yup from 'yup';
  
  export const SignupSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, 'Firstname must be at least 2 characters.')
      .max(20, 'Firstname must not exceed 20 characters.')
      .required('Firstname is required.'),
    lastname: Yup.string()
      .min(2, 'Lastname must be at least 2 characters.')
      .max(20, 'Lastname must not exceed 20 characters.')
      .required('Lastname is required.'),
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters.')
      .max(20, 'Username must not exceed 20 characters.')
      .required('Username is required.'),
    email: Yup.string()
      .email('Invalid email format.')
      .required('Email address is required.'),
    password: Yup.string()
    .required('Password is required.')
      .min(8, 'Password must be at least 8 characters.'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be a valid 10-digit number.')
      .required('Phone number is required.'),
      role: Yup.string() // Add the validation rule for the role field if needed
  });

  export const LoginSchema = Yup.object().shape({
    emailOrUsername: Yup.string().required('Email or username is required.'),
    password: Yup.string().required('Password is required.'),
  });