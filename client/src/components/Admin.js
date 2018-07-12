import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

import HeaderNav from './HeaderNav';
import PageMain from './PageMain';

class Admin extends Component {
  componentWillMount() {
    if (!this.props.auth.isAuth) this.props.history.push('/login');
  }

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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Admin);
