import React from "react";
import { Route, Switch } from "react-router-dom";
import TopbarLogged from "../components/Topbar/TopbarLogged";
import FoodsList from "../components/FoodList/FoodList.jsx";
import EditFood from "../components/FoodList/EditFood";
import LogPortionView from "../components/LogPortion/LogPortionView";

export default function LoggedPage() {
  return (
    <div>
      <TopbarLogged />

      <Switch>
        <Route path="/" exact component={FoodsList} />
        <Route path="/edit/:id" exact component={EditFood} />
        <Route path="/create" component={LogPortionView} />
      </Switch>
    </div>
  );
}
