import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import LoggedPage from "./pages/LoggedPage";
import NotLoggedPage from "./pages/NotLoggedPage";

function App() {
  const [auth, setAuth] = useState();

  const loggedUserJSON = localStorage.getItem("currentUser");

  if (loggedUserJSON && !auth) {
    setAuth(true);
  }

  if (!loggedUserJSON && auth) {
    setAuth(false);
  }

  return (
    <div className="App">
      <div className="sections">
        <Router>
          <Switch>{auth ? <LoggedPage /> : <NotLoggedPage />}</Switch>
        </Router>
      </div>
      <footer>(c) Tero Ankkuri 2021</footer>
    </div>
  );
}

export default App;
