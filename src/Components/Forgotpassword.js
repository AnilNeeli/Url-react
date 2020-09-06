import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link, Redirect} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import routes from "../routes/routes"
import { useRecoilState } from "recoil";
import { loginState } from "../Recoil/Authenticate";
import {SERVER_URL} from "../routes/url"

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

export default function Forgotpassword() {
  const [login] = useRecoilState(loginState);
  const history=useHistory();
  const classes = useStyles();
  const [email,setemail]=useState("");

  if(login===true){
    return(
    <Redirect to={routes.Dashboard} />)
  }

  const updateemail=(e)=>{
    setemail(e.target.value)

  }

  const emailreset=async(e)=>{
    e.preventDefault();
    const data={email:email};
    if(email===""){
      alert("Please enter email and click on submit")
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
  setemail("");
  try {
      const fetchResponse = await fetch(SERVER_URL+"resetpassword", settings);
      const result = await fetchResponse.json();
      console.log(result);
      if(result.status==="success"){
        alert(`Password link as been sent to given mail`)
        history.push(routes.login)
      }
      else if(result.status==="user not found"){
        alert("The username provided is not registered ,please signup")
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
            Enter Email
          </Typography>
          <form className={classes.form} noValidate>
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
               value={email}
               onChange={updateemail}
            />
            
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={emailreset}
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
            
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

