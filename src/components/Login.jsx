
import { useState } from 'react';
import { Typography, Button, Container, TextField, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import illustration from '../assets/illustration.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topHeader: {
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
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login() {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Function to handle changes in form fields
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to handle form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Perform validations
    if (
      !emailRegex.test(loginData.email) ||
      loginData.password.length < 8
    ) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Invalid email or password');
      setOpenSnackbar(true);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) => user.email === loginData.email && user.password === loginData.password
    );
    if (!user) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Invalid email or password');
      setOpenSnackbar(true);
      return;
    }

    // Successful login
    setSnackbarSeverity('success');
    setSnackbarMessage('Login successful');
    setOpenSnackbar(true);
  };

  // Function to handle Snackbar close event
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <div className={classes.root}>
        <img
        src={illustration}
        alt="illustration"
        className={classes.illustration}
      />
      <div className={classes.formContainer}>
      <h2 className={{ textAlign: "left" }}>Welcome Back!</h2>
        <Typography component="h1" variant="h5" className={classes.topHeader}>
          Login Here
        </Typography>
        <Container maxWidth="xs">
          <form className={classes.form} onSubmit={handleLoginSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleLoginChange}
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
              onChange={handleLoginChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            className={classes.signInLink}
          >
            Don&apos;t have an account?{' '}
            <Link to="/" color="primary">
              Sign Up
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

export default Login;
