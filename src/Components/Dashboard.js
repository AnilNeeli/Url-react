import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import routes from "../routes/routes"
import { useRecoilState } from "recoil";
import Header from "./Header";
import { loginState } from "../Recoil/Authenticate";
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

export default function Dashboard() {
  const classes = useStyles();
  const [login] = useRecoilState(loginState);
const [url,seturl]=useState("")
const [urlshort,seturlshort]=useState("")
if(login===false){
  return(
  <Redirect to={routes.login} />)
}

const updateurl=(e)=>{
  seturl(e.target.value)
}
const updateData=async(e)=>{
 e.preventDefault();
 const fullurl=url
 if(fullurl===""){
   alert("Please enter the url and click on submit")
 }else{
   const data={fullurl:fullurl}
  const settings = {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  
};
try {
  const fetchResponse = await fetch(SERVER_URL+"Url", settings);
  const result = await fetchResponse.json();
  console.log(result);
  if(result.status==="success"){
    seturlshort(result.url)
  }
  else if(result.status==="Internal Server Error"){
    alert("Error has occured ,please try again after sometime")
  }
  else if(result.status==="invalid Url"){
    alert("please enter valid url")
    seturl("");
  }
}
catch(error) {
  console.log(error);
};
    
 }
}
const clr=(e)=>{
  e.preventDefault();
  if(url===""||urlshort===""){
    alert("no values to clear")
  }
  else{
    seturl("")
    seturlshort("")
  }
}
  return (
    <>
    <Header/>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
         
      <Typography component="h1" variant="h5">
            Enter Url
          </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="url"
                label="url"
                name="url"
                autoComplete="url"
                value={url}
                onChange={updateurl}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="url"
                label="urlshot"
                name="url"
                autoComplete="url"
                value={urlshort}
              />
            </Grid>
            
          </Grid>
          <Button
           
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          onClick={updateData}
            >Submit
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={clr}
            >Clear
          </Button>
        </form>
      </div>
      
    </Container>
    </>
  );
}