import React, { Component } from 'react';
import { ScriptInjector } from '../utils/scriptInjector';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { withRouter } from 'react-router-dom';

class PageImage extends Component {
  constructor(props) {
    super(props);
   
  }

  componentWillMount() {
    if (this.props.auth.isAuth) this.props.history.push('/admin');
    ScriptInjector();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuth) {
      this.props.history.push('/admin');
    }
  }

  

  
  render() {
    return (
      <div className="container">
        <Helmet>
          <title>Прайс-лист для услуг клининга</title>
        </Helmet>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <img src="../images/cleaning.jpg" style={{maxWidth: 100+"%"}}></img>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withRouter(
  connect(
    mapStateToProps,
    { loginUser }
  )(PageImage)
);
