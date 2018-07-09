import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HeaderNav from './HeaderNav';
import PageMain from './PageMain';

class Admin extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <div id="wrapper">
            <HeaderNav />
            <Route path="/" component={PageMain} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default Admin;
