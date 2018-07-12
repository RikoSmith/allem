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
import Admin from './components/Admin';

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
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/login" component={PageLogin} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
