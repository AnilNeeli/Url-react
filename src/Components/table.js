import React,{useEffect,useState} from 'react';
import { Table } from 'reactstrap';
import Header from './Header';
import { loginState } from "../Recoil/Authenticate";
import { useRecoilState } from "recoil";
import routes from "../routes/routes";
import {Link,Redirect} from "react-router-dom";
import {SERVER_URL} from "../routes/url"
const Example = (props) => {
  const[login]=useRecoilState(loginState);
  const [i,seti]=useState(0)
const [urls,seturls]=useState([])
    useEffect(()=>{
        const data= async()=>{
             const fetchResponse=await fetch(SERVER_URL+"Url/data");
             const result = await fetchResponse.json();
      seturls(result)
             
        }
        data();
    },[i])
    if(login===false){
      return(
      <Redirect to={routes.login} />)
    }
    const update=async(index,e)=>{
      const data=urls[index]
      window.open(data.shotrurl,'_blank');
      const req={fullurl:data.fullurl}
      const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    };

    try{
      const fetchResponse = await fetch(SERVER_URL+"url/count", settings);
      const result = await fetchResponse.json();
      if(result.status==="pass"){
        seti(i+1)
      }
    }catch(error) {
      console.log(error);
  };
    }
    

  return (
      <>
      <Header/>
      <h3>List of all urls</h3>
    <Table>
      <thead>
        <tr>
          <th>S.no</th>
          <th>Full Url</th>
          <th>Short Url</th>
          <th>Clicks</th>
          <th>Date created</th>
        </tr>
      </thead>
      <tbody>
      {urls.map((row,index) => {
        const count=()=>{
          update(index)
        }
        return(
            <tr key={index}>
            <th scope="row">{index+1}</th>
            <td>{row.fullurl}</td>
            <td > <Link onClick={count} to="#" rel="noopener noreferrer">{row.shotrurl}</Link></td>
            <td>{row.count}</td>
            <td>{new Date(row.date).toDateString()}</td>
          </tr>)
})}
       
       
       
      </tbody>
    </Table>
          
    </>
  );
}
export default Example;
