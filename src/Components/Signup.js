import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link, Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import routes from "../routes/routes"
import { loginState } from "../Recoil/Authenticate";
import { useRecoilState } from "recoil";
import {SERVER_URL} from "../routes/url"
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [login] = useRecoilState(loginState);
  const [firstname,setfirstname]=useState("");
  const [lastname,setlastname]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  if(login===true){
    return(
    <Redirect to={routes.Dashboard} />)
  }
  const fname=(e)=>{
        setfirstname(e.target.value)
  }

  const lname=(e)=>{
    setlastname(e.target.value)
}
const emset=(e)=>{
  setemail(e.target.value)
}
const pass=(e)=>{
  setpassword(e.target.value)
}
const Senddata=async(e)=>{
  e.preventDefault();
  if(firstname===""||lastname===""||email===""||password===""){
    alert("please fill all the details")
  }else{
  const data={firstname:firstname,lastname:lastname,email:email,password:password}
 setpassword("")
  setemail("")
  setfirstname("")
  setlastname("")
  const settings = {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
};
try {
  const fetchResponse = await fetch(SERVER_URL+"signup", settings);
  const result = await fetchResponse.json();
  console.log(result)
  if(result.status==="success"){
    alert(`confirmation mail has been sent to ${email}`);
  }
  else if(result.status==="user already registered"){
    alert("username already exist")
  }
  else if(result.status==="Internal Servor Error"){
    alert("Facing some issue plase try after sometime")
  }
}
  catch(error) {
    console.log(error);
};
}
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstname}
                onChange={fname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastname}
                onChange={lname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={emset}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={pass}
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={Senddata}>
          
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to={routes.login} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}