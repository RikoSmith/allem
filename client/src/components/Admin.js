import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  IndexRoute
} from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { withRouter } from 'react-router-dom';

import HeaderNav from './HeaderNav';
import PageMain from './PageMain';
import PageMembers from './PageMembers';

class Admin extends Component {
  componentWillMount() {
    if (!this.props.auth.isAuth) this.props.history.push('/login');
  }

  render() {
    return (
      <Router>
        <Switch>
          <div id="wrapper">
            <Route component={HeaderNav} />
            <Route path="/" component={PageMain} />
            <Route path="/members" component={PageMembers} />
          </div>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(Admin)
);
