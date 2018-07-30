import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { instance as axios } from '../utils/axiosConf';
import HeaderNav from './HeaderNav';
import Header from './Header';
import { Helmet } from 'react-helmet';
import { ScriptInjector } from '../utils/scriptInjectorAdmin';
import ReactLoading from 'react-loading';

class PageHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      show: 'flex'
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuth) {
      this.props.history.push('/login');
    } else {
      if (!this.props.auth.user.permission.includes('members')) {
        this.props.history.push('/denied');
        window.location.reload();
      }

      axios.get('/handbook').then(res => {
        const list = res.data.data;
        this.setState({ list, show: 'none' });
        ScriptInjector();
      });
    }
  }

  render() {
    return (
      <div id="wrapper">
        <Helmet>
          <title>Сотрудники</title>
        </Helmet>
        <HeaderNav />
        <div id="page-wrapper">
          <Header page="Сотрудники" />
          <div className="row">
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading">Список сотрудников</div>
                <div className="panel-body">
                  <div
                    className="vertical-center col-centered col-md-1"
                    style={{ display: this.state.show }}
                  >
                    <ReactLoading
                      type="spin"
                      color="#339BEB"
                      height={100}
                      width={100}
                    />
                  </div>
                  <table width="100%" className="table" id="dataTables-example">
                    <thead>
                      <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Должность</th>
                        <th>Отдел</th>
                        <th>Внутренний номер</th>
                        <th>Городской номер</th>
                        <th>Мобильный</th>
                        <th>Кабинет</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.list.map(function(dep, i) {
                        if (!dep.ShowInDirectory) return;
                        console.log(dep);
                        var depname = dep.Name;
                        return dep.Users.map(function(user, j) {
                          if (!user.ShowInDirectory) return;
                          console.log(user);
                          return (
                            <tr className="aaaa" key={'item' + i + '-' + j}>
                              <td>{user.SurName}</td>
                              <td>{user.FirstName}</td>
                              <td>{user.LastName}</td>
                              <td>{user.Position}</td>
                              <td>{depname}</td>
                              <td>{user.Localnumber}</td>
                              <td>{user.CityNumber}</td>
                              <td>{user.MobileNumber}</td>
                              <td>{user.CabinetNumber}</td>
                            </tr>
                          );
                        });
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
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
  )(PageHandbook)
);
