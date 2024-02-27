import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  TextField,
  Snackbar,
  Avatar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function LoginSignup() {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [registrationData, setRegistrationData] = useState({});
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    // Perform validations
    // Here you can add more specific validation rules as per your requirement
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (
      !emailRegex.test(registrationData.email) ||
      registrationData.password.length < 8 ||
      !passwordRegex.test(registrationData.password) ||
      registrationData.password !== registrationData.confirmPassword
    ) {
      setSnackbarMessage('Invalid registration data');
      setOpenSnackbar(true);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(
      (user) => user.email === registrationData.email
    );
    if (existingUser) {
      setSnackbarMessage('Email already registered');
      setOpenSnackbar(true);
      return;
    }

    // Save registration data to localStorage
    users.push(registrationData);
    localStorage.setItem('users', JSON.stringify(users));

    setSnackbarMessage('Registration successful');
    setOpenSnackbar(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(
      (user) =>
        user.email === loginData.email && user.password === loginData.password
    );
    if (foundUser) {
      setSnackbarMessage('Login successful');
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage('Invalid email or password');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My App</Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Register</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs">
        <div className={classes.formContainer}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} onSubmit={handleRegistrationSubmit}>
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
              onChange={handleRegistrationChange}
            />
            {/* Other fields */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
          </form>
        </div>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginSignup;
