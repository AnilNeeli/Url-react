import React,{useState,useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import Chart from 'chart.js';

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
const [date,setdate]=useState([])
const [count,setcount]=useState([])
const colors=[];
useEffect(()=>{
  const data= async()=>{
       const fetchResponse=await fetch(SERVER_URL+"Url/chart");
       const result = await fetchResponse.json();
       const data=result.result
       const c=data.map(data=>{
         return data.count
       })
       const d=data.map(data=>{
         return data.dateDMY
       })
       setcount(c)
       setdate(d)
       
  }
  data();
},[])

if(login===false){
  return(
  <Redirect to={routes.login} />)
}
for(var i=0;i<date.length;i++){
  const bg=[
    'rgba(255, 99, 200, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
]
const j=Math.floor(Math.random() * 5)
colors.push(bg[j])
}
var ctx = 'myChart';
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels:date,
        datasets: [{
            label: 'links created on this day',
            data: count,
            backgroundColor:colors,
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
  console.log(myChart);
  console.log(mychart);
  return (
    <>
    <Header/>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
         
      <Typography component="h1" variant="h5">
            Stats for the past 30 days
            </Typography>
          <Grid container spacing={2}>
            
           
            <Grid item xs={12}>
            <canvas id="myChart" width="400" height="400"></canvas>
            </Grid>
           
            
          </Grid>
         
      
      </div>
      
    </Container>
    </>
  );
}
