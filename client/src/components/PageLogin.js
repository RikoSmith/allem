import React, { Component } from 'react';
import { ScriptInjector } from '../config/scriptInjector';
import MetaTags from 'react-meta-tags';
import CSSHead from './CSSHead';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { withRouter } from 'react-router-dom';

class PageLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if (!this.props.auth.isAuth) this.props.history.push('/login');
    ScriptInjector();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuth) {
      this.props.history.push('/admin');
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      id: this.state.id,
      password: this.state.password
    };

    this.props.loginUser(newUser, this.props.history);

    console.log('Logging in: ' + newUser);
  }

  render() {
    return (
      <div className="container">
        <CSSHead />
        <MetaTags>
          <title>Авторизация - Панель администратора</title>
        </MetaTags>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="login-panel panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Авторизация</h3>
              </div>
              <div className="panel-body">
                {this.props.message}
                <form role="form" onSubmit={this.onSubmit} method="POST">
                  <fieldset>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Имя пользователя"
                        name="id"
                        type="text"
                        value={this.state.id}
                        onChange={this.onChange}
                        autoFocus
                      />
                      <div className="invalid-feedback">
                        {this.props.errors
                          ? this.props.errors.user_not_found
                          : null}
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Пароль"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                      <div className="invalid-feedback">
                        {this.props.errors
                          ? this.props.errors.invalid_password
                          : null}
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-lg btn-success btn-block login_button"
                      value="Войти"
                    />
                  </fieldset>
                </form>
              </div>
            </div>
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

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(PageLogin));
