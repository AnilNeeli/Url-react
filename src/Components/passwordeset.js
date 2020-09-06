import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {useHistory,useParams} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import routes from "../routes/routes"
import {SERVER_URL} from "../routes/url"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Resetspassword() {
  const history=useHistory();
  const {Token}=useParams();
  const classes = useStyles();
  const [password,setpassword]=useState("");

  const passwordupdate=(e)=>{
    setpassword(e.target.value)

  }

  const passwordreset=async(e)=>{
    e.preventDefault();
    const data={password:password,token:Token};
    console.log(data);
    if(password===""){
      alert("Please enter password and click on submit")
    }
    else{
    const settings = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    
  };
setpassword("");
  try {
      const fetchResponse = await fetch(SERVER_URL+"resetpassword/passwordchange", settings);
      const result = await fetchResponse.json();
      console.log(result);
      if(result.status==="success"){
        alert(`Password has changed successfully`)
        history.push(routes.login)
      }
      else if(result.status==="Token tampered"){
        alert("The mail link that has been sent you has been tampered,please reset your password again ")
      }
      else if(result.status==="Internal Server Error"){
        alert("Error has occured ,please try again after sometime")
      }
  }
  catch(error) {
      console.log(error);
  };

    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          
          <Typography component="h1" variant="h5">
            Enter New Password
          </Typography>
          <form className={classes.form} noValidate>
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
              value={password}
              onChange={passwordupdate}
            />
            
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={passwordreset}
            >
              Submit
            </Button>
            <Grid container>
             
              <Grid item>
                <Link to={routes.signup} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

