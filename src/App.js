import React from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Middlebar from "./Middlebar";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Mail from "./Mail";
import EmailList from "./EmailList";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <div className="app__body">
          <Sidebar />
          <Switch>
            <Route path='/mail'>
<Mail/>
            </Route>

            <Route path='/'>
              <EmailList />
            </Route>
          </Switch>
          <Middlebar />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
