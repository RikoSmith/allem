import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { instance as axios } from '../utils/axiosConf';
import HeaderNav from './HeaderNav';
import Header from './Header';
import { Helmet } from 'react-helmet';
import { ScriptInjector } from '../utils/scriptInjectorAdmin';
import ReactLoading from 'react-loading';

class PageMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      show: 'flex'
    };
  }

  componentWillMount() {
    if (!this.props.auth.isAuth) {
      this.props.history.push('/login');
    } else {
      axios
        .get('/members')
        .then(res => {
          const list = res.data.data;
          this.setState({ list, show: 'none' });
          ScriptInjector();
        })
        .catch(err => {
          this.props.history.push('/denied');
          window.location.reload();
        });
    }
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(PageMembers)
);
