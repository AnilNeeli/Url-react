import React ,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link, Redirect} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import routes from "../routes/routes"
import {useHistory} from "react-router-dom";
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

export default function Login() {
  
  const [login, setlogin] = useRecoilState(loginState);
  const classes = useStyles();
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const history=useHistory();
  if(login===true){
    return(
    <Redirect to={routes.Dashboard} />)
  }
  const emailupdate=(e)=>{
    setemail(e.target.value)

  }
  const passwordupdate=(e)=>{
    setpassword(e.target.value)
  }
  const Submitdetails=async(e)=>{
    e.preventDefault();
    const data={email:email,password:password};

    if(email===""||password===""){
      alert("Please enter all details")
    }
    else{

    setpassword("")
    setemail("")
    const settings = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  };
  try {
      const fetchResponse = await fetch(SERVER_URL+"login", settings);
      const result = await fetchResponse.json();
      if(result.status==="SUCCESS"){
        const login=true;
        window.localStorage.setItem("loginstatus",login);
        setlogin(true)
        history.push(routes.Dashboard)
      }
      else if(result.status==="invaliduser"){
        alert("invalid username or password")
      }
      else if(result.status==="User not verified"){
        alert("User is not yet verified")
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
            Sign in
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
              onChange={emailupdate}
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
              value={password}
              onChange={passwordupdate}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={Submitdetails}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={routes.forgotpassword} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
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

