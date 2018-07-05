import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HeaderNav from './HeaderNav';
import PageMain from './PageMain';
import FooterScripts from './FooterScripts';

class Admin extends Component {
  render() {
    return (
      <Router>
        <div id="wrapper">
          <HeaderNav />
          <Route path="/" component={PageMain} />
        </div>
        <FooterScripts />
      </Router>
    );
  }
}

export default Admin;
