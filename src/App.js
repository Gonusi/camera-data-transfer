import React from "react";
import Client from "./components/Client/Client";
import Provider from "./components/Provider/Provider";
import Button from "./components/Button/Button";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import styles from "./App.module.scss";

function App() {
  return (
    <Router>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink
            className={styles.navLink}
            activeClassName={styles.active}
            to="/client"
          >
            <Button>Client</Button>
          </NavLink>
          <NavLink
            className={styles.navLink}
            activeClassName={styles.active}
            to="/provider"
          >
            <Button>Provider</Button>
          </NavLink>
        </nav>
      </header>
      <main className={styles.main}>
        <Switch>
          <Route path="/client">
            <Client />
          </Route>
          <Route path="/provider">
            <Provider />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
