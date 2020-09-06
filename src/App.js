import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import routes from "./routes/routes";
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Forgotpassword from "./Components/Forgotpassword"
import Confirmation from './Components/Conformation';
import Passwordreset from './Components/passwordeset';
import Dashboard from "./Components/Dashboard";
import Table from "./Components/table"
import Logout from "./Components/logout"
import Chart from "./Components/Chart"
function App() {
  return (
    <Switch>
      <Route exact path={routes.login}>
        <Login />
      </Route>
      <Route exact path={routes.signup}>
        <Signup />
      </Route>
      <Route exact path={routes.Confirmation}>
        <Confirmation />
      </Route>
      
      <Route exact path={routes.forgotpassword}>
        <Forgotpassword />
      </Route>
      <Route exact path={routes.passwordreset}>
        <Passwordreset />
      </Route>
      <Route exact path={routes.Dashboard}>
        <Dashboard />
      </Route>
      <Route exact path={routes.Table}>
        <Table />
      </Route>
      <Route exact path={routes.Logout}>
        <Logout />
      </Route>
      <Route exact path={routes.Chart}>
        <Chart />
      </Route>
      
    </Switch>
  );
}

export default App;
