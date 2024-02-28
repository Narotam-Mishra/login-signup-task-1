
import { useState } from 'react';
import {
  Typography,
  Button,
  Container,
  TextField,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import illustration from '../assets/illustration.png';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    topHeader:{
        color: 'skyblue',
        textTransform: 'uppercase',
        display: 'flex',
        textAlign: 'left',
    },
    illustration: {
      flex: 1,
      margin: theme.spacing(2),
      maxWidth: '50%',
    },
    formContainer: {
      flex: 1,
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    signInLink: {
        marginTop: theme.spacing(2),
    },
  }));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Signup() {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
  });

  // State variables to track touched state of input fields
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    dob: false,
    mobileNumber: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Function to handle changes in form fields
  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  // Function to handle changes in file input for profile image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRegistrationData({
      ...registrationData,
      profileImage: file,
    });
  };

  // Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regular expression for password strength
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  // Function to handle form submission
  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    // Perform validations
    // Here you can add more specific validation rules as per your requirement
    if (
      !emailRegex.test(registrationData.email) ||
      registrationData.password.length < 8 ||
      !passwordRegex.test(registrationData.password) ||
      registrationData.password !== registrationData.confirmPassword ||
      registrationData.mobileNumber.length !== 10 ||
      registrationData.profileImage === null ||
      !['image/png', 'image/jpeg', 'image/jpg'].includes(
        registrationData.profileImage.type
      )
    ) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Invalid registration data');
      setOpenSnackbar(true);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(
      (user) => user.email === registrationData.email
    );
    if (existingUser) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Email already registered');
      setOpenSnackbar(true);
      return;
    }

    // Save registration data to localStorage
    users.push(registrationData);
    localStorage.setItem('users', JSON.stringify(users));

    setSnackbarSeverity('success');
    setSnackbarMessage('Registration successful');
    setOpenSnackbar(true);
  };

  // Function to handle Snackbar close event
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  // Function to handle input field blur and update touched state
  const handleBlur = (field) => {
    setTouchedFields({
      ...touchedFields,
      [field]: true,
    });
  };

  return (
    <div className={classes.root}>
      <img
        src={illustration}
        alt="illustration"
        className={classes.illustration}
      />
      {/* AppBar for the top navigation */}
      <div className={classes.formContainer}>
        <Typography component="h1" variant="h5" className={classes.topHeader}>
          Sign Up Here
        </Typography>
        <h2 className={{ textAlign: "center" }}>Welcome Back!</h2>
        {/* Container for the form */}
        <Container maxWidth="xs">
          {/* <Typography component="h1" variant="h5" className={classes.topHeader}>
            SIGNUP
          </Typography> */}
          <form
            className={classes.form}
            onSubmit={handleRegistrationSubmit}
            encType="multipart/form-data"
          >
            {/* Form fields */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              error={registrationData.firstName === ""}
              helperText={
                touchedFields.firstName && registrationData.firstName === ""
                  ? "First name is required"
                  : ""
              }
              onChange={handleRegistrationChange}
              onBlur={() => handleBlur("firstName")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="middleName"
              label="Middle Name"
              name="middleName"
              autoComplete="middleName"
              onChange={handleRegistrationChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              onChange={handleRegistrationChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="dob"
              label="Date of Birth"
              name="dob"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              error={registrationData.dob === ""}
              helperText={
                touchedFields.dob && registrationData.dob === ""
                  ? "Date of birth is required"
                  : ""
              }
              onChange={handleRegistrationChange}
              onBlur={() => handleBlur("dob")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mobileNumber"
              label="Mobile Number"
              name="mobileNumber"
              autoComplete="mobileNumber"
              error={registrationData.mobileNumber.length !== 10}
              helperText={
                touchedFields.mobileNumber &&
                registrationData.mobileNumber.length !== 10
                  ? "Mobile number must be 10 characters"
                  : ""
              }
              onChange={handleRegistrationChange}
              onBlur={() => handleBlur("mobileNumber")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={!emailRegex.test(registrationData.email)}
              helperText={
                touchedFields.email && !emailRegex.test(registrationData.email)
                  ? "Invalid email address"
                  : ""
              }
              onChange={handleRegistrationChange}
              onBlur={() => handleBlur("email")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={
                registrationData.password.length < 8 ||
                !passwordRegex.test(registrationData.password)
              }
              helperText={
                (touchedFields.password &&
                  registrationData.password.length < 8) ||
                !passwordRegex.test(registrationData.password)
                  ? "Password must be at least 8 characters with one uppercase letter, one lowercase letter, one number, and one special character"
                  : ""
              }
              onChange={handleRegistrationChange}
              onBlur={() => handleBlur("password")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
              error={
                registrationData.password !== registrationData.confirmPassword
              }
              helperText={
                touchedFields.confirmPassword &&
                registrationData.password !== registrationData.confirmPassword
                  ? "Passwords do not match"
                  : ""
              }
              onChange={handleRegistrationChange}
              onBlur={() => handleBlur("confirmPassword")}
            />
            <input
              accept="image/*"
              id="profileImage"
              name="profileImage"
              type="file"
              onChange={handleFileChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Signup
            </Button>
          </form>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            className={classes.signInLink}
          >
            Already have an account?{" "}
            <Link to="/login" color="primary">
              Log In
            </Link>
          </Typography>
        </Container>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Signup;
