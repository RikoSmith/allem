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
      if (!this.props.auth.user.permission.includes('general')) {
        this.props.history.push('/denied');
        window.location.reload();
      }

      axios.get('/members').then(res => {
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
                  <table width="100%" className="table" id="dataTables-example">
                    <thead>
                      <tr>
                        <th>Фото</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Должность</th>
                        <th>ИИН</th>
                        <th>Телефон</th>
                        <th>Статус</th>
                        <th>Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.list.map(function(item, i) {
                        var src =
                          '../images/members_small/' + item.image + '.jpg';
                        var cName = '';
                        if (item.is_active === 'Нет') {
                          cName = 'passive_member';
                        } else {
                          switch (item.status) {
                            case 'В отпуске':
                              cName = 'holiday_member';
                              break;
                            case 'В декрете':
                              cName = 'dekret_member';
                              break;
                            case 'На больничных':
                              cName = 'ill_member';
                              break;
                            case 'В командировке':
                              cName = 'trip_member';
                              break;
                            default:
                              cName = '';
                          }
                        }
                        return (
                          <tr className={cName} key={'item_' + i}>
                            <td>
                              <img src={src} alt="" height="50" />
                            </td>
                            <td>{item.lastname}</td>
                            <td>{item.name}</td>
                            <td>{item.middlename}</td>
                            <td>{item.position}</td>
                            <td>{item.id}</td>
                            <td>{item.phone}</td>
                            <td>{item.status}</td>
                            <td>
                              <a href="../../admin/member/{item._id}">
                                Подробнее...
                              </a>
                            </td>
                          </tr>
                        );
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
  )(PageMembers)
);
