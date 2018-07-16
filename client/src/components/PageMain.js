import React, { Component } from 'react';
import Header from './Header';
import MainTopButtons from './MainTopButtons';
import History from './History';
import MetaTags from 'react-meta-tags';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderNav from './HeaderNav';
import { ScriptInjector } from '../utils/scriptInjectorAdmin';

class PageMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: {}
    };
  }

  componentWillMount() {
    if (!this.props.auth.isAuth) {
      this.props.history.push('/login');
      window.location.reload();
    } else {
      console.log('Here');
      /*if (!this.props.auth.user.permission.includes('general')) {
        this.props.history.push('/denied');
        window.location.reload();
      }*/
    }
    ScriptInjector();
  }

  render() {
    return (
      <div id="wrapper">
        <HeaderNav />
        <div id="page-wrapper">
          <MetaTags>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="description" content="" />
            <meta name="author" content="" />
            <title>Панель администратора</title>
          </MetaTags>

          <Header page="Общая панель" />
          <MainTopButtons />
          <History />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(PageMain)
);
