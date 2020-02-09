import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/header";
import Home from "./components/home";
import Account from "./components/account";
import Results from "./components/results";
import Login from "./components/login";
import Dashboard from "./components/dashboard";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <header className="Header">
          < Header />
        </header>
        <section className="Section">
          <BrowserRouter>
            <Route exact={true} path='/' render={(props) =>
              <Home />
            }
            />
            <Route exact={true} path='/account' render={(props) =>
              <Account />
            }
            />
            <Route exact={true} path='/dashboard' render={(props) =>
              <Dashboard />
            }
            />
            <Route exact={true} path='/results' render={(props) =>
              <Results />
            }
            />
            <Route exact={true} path='/login' render={(props) =>
              <Login />
            }
            />
          </BrowserRouter>
        </section>
      </div>
    );
  }
}

export default App;



