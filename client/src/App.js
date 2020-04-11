import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Employees from "./pages/Employees";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path={["/", "/employees"]}>
            <Employees />
          </Route>
          <Route exact path="/employees/:id">
            <Detail />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
