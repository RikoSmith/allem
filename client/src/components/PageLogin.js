import React, { Component } from 'react';
import { ScriptInjector } from '../config/scriptInjector';
import MetaTags from 'react-meta-tags';
import CSSHead from './CSSHead';
import ReactLoading from 'react-loading';

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
    ScriptInjector();
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

export default PageLogin;
