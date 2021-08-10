import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import TopbarNotLogged from "../components/Topbar/TopbarNotLogged";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import "./pages.scss";

export default function NotLoggedPage() {

  return (
    <div>
      <Link to="/" className="header">
        Macrolator
      </Link>
      <Switch>
        <Route exact path="/" component={TopbarNotLogged} />
        <Route exact path="/login" component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </div>
  );
}
