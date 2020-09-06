import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory,useParams} from 'react-router-dom';
import {SERVER_URL} from "../routes/url"
import routes from "../routes/routes"
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

export default function Confirmation() {
  const classes = useStyles();
  const {Token}=useParams();
  const history=useHistory();

const check=async()=>{
try {
    const fetchResponse = await fetch(`${SERVER_URL}signup/confirmation/${Token}`);
    const result = await fetchResponse.json();
    console.log(result)
    if(result.status==="success"){
      alert("user has been verified,please click on Login to proceed futher")
      history.push(routes.login)
    }
    else if(result.status==="Internal Server Error"){
      alert("Somer error has occuered,Please try again after some time")
    }
    else if(result.status==="Token tampered"){
        alert("The Link sent you has been tampered ,please signup again with another username")
      }
}
catch(error) {
    console.log(error);
};
}



  return (
    <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          Verify your account
        </Typography>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={check}
          >
            Click to verify your account
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
          
      </div>
    </Grid>
  </Grid>
);
}