import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageLogin from './components/PageLogin';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import { setAuthHeader } from './utils/setAuthHeader';
import { setCurrentUser, logoutUser } from './actions/authActions';

import './App.css';
import PageNotFound from './components/PageNotFound';
import PageLanding from './components/PageLanding';
import PageMain from './components/PageMain';
import PageMembers from './components/PageMembers';
import PageSingleMember from './components/PageSingleMember';
import PageDepartments from './components/PageDepartments';

if (localStorage.jtoken) {
  setAuthHeader(localStorage.jtoken);
  const decoded = jwt_decode(localStorage.jtoken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={PageLanding} />
            <Route exact path="/en" render={() => <PageLanding lang="en" />} />
            <Route exact path="/kz" render={() => <PageLanding lang="kz" />} />
            <Route exact path="/ru" render={() => <PageLanding lang="ru" />} />
            <Route exact path="/admin" component={PageMain} />
            <Route exact path="/admin/members" component={PageMembers} />
            <Route
              exact
              path="/admin/member/:memberId"
              component={PageSingleMember}
            />
            <Route
              exact
              path="/admin/departments"
              component={PageDepartments}
            />
            <Route exact path="/login" component={PageLogin} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
