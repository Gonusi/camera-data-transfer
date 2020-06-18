import React from 'react';
import Client from './components/Client/Client';
import Provider from './components/Provider/Provider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Possible qr code generator: 
// Possible scanner for client: https://github.com/nimiq/qr-scanner
// Not stupid if we need to transfer to large amount of people via projector etc. where typical bidirectional means would be wastefull

function App() {
  return (
    <Router>
      <header>
        v.0.1
        <nav>
          <ul>
            <li>
              <Link to="/client">Client</Link>
            </li>
            <li>
              <Link to="/provider">Provider</Link>
            </li>
          </ul>
          </nav>
      </header>
      <main>
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
