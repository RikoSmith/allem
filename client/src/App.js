import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import PageNotFound from './components/PageNotFound';
import PageLanding from './components/PageLanding';
import Admin from './components/Admin';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={PageLanding} />
          <Route exact path="/en" render={() => <PageLanding lang="en" />} />
          <Route exact path="/kz" render={() => <PageLanding lang="kz" />} />
          <Route exact path="/admin" component={Admin} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
