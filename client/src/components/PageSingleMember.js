import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { instance as axios } from '../utils/axiosConf';
import HeaderNav from './HeaderNav';
import Header from './Header';
import { Helmet } from 'react-helmet';
import { ScriptInjector } from '../utils/scriptInjectorAdmin';
import ReactLoading from 'react-loading';
import MainEdit from './MemberForms/MainEdit';
import PrivateEdit from './MemberForms/PrivateEdit';
import EduEdit from './MemberForms/EduEdit';
import ReactHtmlParser from 'react-html-parser';

class PageMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: {},
      show: 'flex'
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuth) {
      this.props.history.push('/login');
    } else {
      axios
        .get('/member/' + this.props.match.params.memberId)
        .then(res => {
          const member = res.data.data;
          this.setState({ member, show: 'none' });
          ScriptInjector();
        })
        .catch(err => {
          console.log('Error on fetching: ' + err);
          this.props.history.push('/denied');
          //window.location.reload();
        });
    }
  }

  render() {
    if (this.state.show === 'none') {
      return (
        <div id="wrapper">
          <Helmet>
            <title>
              Сотрудник -{' '}
              {this.state.member.name + ' ' + this.state.member.lastname}
            </title>
          </Helmet>
          <HeaderNav />
          <div id="page-wrapper">
            <Header page="Сотрудники" />
            <div className="col-md-4">
              <div className="panel panel-default">
                <div className="panel-heading">Изображение</div>
                <div className="panel-body">
                  <img
                    className="user_image"
                    src={
                      this.state.member.image
                        ? '../../images/members/' +
                          this.state.member.image +
                          '.jpg'
                        : 'http://via.placeholder.com/750x900'
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="panel panel-default">
                <div className="panel-heading">
                  Информация{' '}
                  <a
                    href={
                      this.state.member.delo_url
                        ? this.state.member.delo_url
                        : ''
                    }
                  >
                    <span className="member_delo">[личное дело]</span>
                  </a>{' '}
                  <a
                    href={
                      this.state.member.folder_url
                        ? this.state.member.folder_url
                        : ''
                    }
                  >
                    <span className="member_delo">[папка сотрудника]</span>
                  </a>
                </div>
                <div className="panel-body">
                  <ul className="nav nav-tabs">
                    <li className="active">
                      <a href="#home" data-toggle="tab">
                        Основные
                      </a>
                    </li>
                    <li>
                      <a href="#profile" data-toggle="tab">
                        Личные
                      </a>
                    </li>
                    <li>
                      <a href="#messages" data-toggle="tab">
                        Образование
                      </a>
                    </li>
                    <li>
                      <a href="#settings" data-toggle="tab">
                        Настройки
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div className="tab-pane fade in active " id="home">
                      <br />
                      <h4>Основные данные сотрудника:</h4>
                      <br />
                      <div className="table-responsive info_table">
                        <table className="table table-hover">
                          <tbody>
                            <tr>
                              <td className="info_header">Фамилия:</td>
                              <td>{this.state.member.lastname}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Имя:</td>
                              <td>{this.state.member.name}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Отчество:</td>
                              <td>{this.state.member.middlename}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Должность:</td>
                              <td>{this.state.member.position}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Департамент:</td>
                              <td>{this.state.member.department}</td>
                            </tr>
                            <tr>
                              <td className="info_header">В штате:</td>
                              <td>{this.state.member.is_active}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Статус:</td>
                              <td>{this.state.member.status}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Статус до:</td>
                              <td>{this.state.member.status_end_date}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Отпуск с:</td>
                              <td>{this.state.member.holiday_start}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Отпуск до:</td>
                              <td>{this.state.member.holiday_end}</td>
                            </tr>
                            <tr>
                              <td className="info_header">
                                Начало сотрудничества:
                              </td>
                              <td>{this.state.member.start_date}</td>
                            </tr>
                            <tr>
                              <td className="info_header">
                                Конец сотрудничества:
                              </td>
                              <td>{this.state.member.end_date}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="profile">
                      <br />
                      <h4>Личные данные сотрудника:</h4>
                      <br />
                      <div className="table-responsive info_table">
                        <table className="table table-hover">
                          <tbody>
                            <tr>
                              <td className="info_header">Пол:</td>
                              <td>{this.state.member.sex}</td>
                            </tr>
                            <tr>
                              <td className="info_header">ИИН:</td>
                              <td>{this.state.member.id}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Дата рождения:</td>
                              <td>{this.state.member.birthdate}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Телефон:</td>
                              <td>{this.state.member.phone}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Адрес прописки:</td>
                              <td>{this.state.member.address}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Адрес проживания:</td>
                              <td>{this.state.member.address_current}</td>
                            </tr>
                            <tr>
                              <td className="info_header">
                                Семейное положение:
                              </td>
                              <td>{this.state.member.family_status}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Наличие детей:</td>
                              <td>{this.state.member.children}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Дети моложе 18:</td>
                              <td>{this.state.member.children_18}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="messages">
                      <br />
                      <h4>Личные данные сотрудника:</h4>
                      <br />
                      <div className="table-responsive info_table">
                        <table className="table table-hover">
                          <tbody>
                            <tr>
                              <td className="info_header">
                                Среднее образование:
                              </td>
                              <td>{this.state.member.s_ed}</td>
                            </tr>
                            <tr>
                              <td className="info_header">
                                Высшее образование:
                              </td>
                              <td>{this.state.member.h_ed}</td>
                            </tr>
                            <tr>
                              <td className="info_header">ВУЗ:</td>
                              <td>{this.state.member.institute}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Специальность:</td>
                              <td>{this.state.member.specialty}</td>
                            </tr>
                            <tr>
                              <td className="info_header">Год окончания:</td>
                              <td>{this.state.member.ed_finish}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="settings">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="panel panel-primary">
                            <div className="panel-heading">
                              Изменить Основные данные
                            </div>
                            <div className="panel-body">
                              <p>
                                Изменить данные, которые указаны во вкладке
                                "Основные". После изменения данные сохраняются в
                                БД перезаписывая старые данные.
                              </p>
                            </div>
                            <button
                              type="button"
                              className="btn btn-outline btn-primary btn-lg btn-block change_profile_button"
                              data-toggle="modal"
                              data-target="#osnov_modal"
                            >
                              Изменить
                            </button>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="panel panel-primary">
                            <div className="panel-heading">
                              Изменить Личные данные
                            </div>
                            <div className="panel-body">
                              <p>
                                Изменить данные, которые указаны во вкладке
                                "Личные". После изменения данные сохраняются в
                                БД перезаписывая старые данные.
                              </p>
                            </div>
                            <button
                              type="button"
                              className="btn btn-outline btn-primary btn-lg btn-block change_profile_button"
                              data-toggle="modal"
                              data-target="#lich_modal"
                            >
                              Изменить
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="panel panel-primary">
                            <div className="panel-heading">
                              Изменить Образование
                            </div>
                            <div className="panel-body">
                              <p>
                                Изменить данные, которые указаны во вкладке
                                "Образование". После изменения данные
                                сохраняются в БД перезаписывая старые данные.
                              </p>
                            </div>
                            <button
                              type="button"
                              className="btn btn-outline btn-primary btn-lg btn-block change_profile_button"
                              data-toggle="modal"
                              data-target="#edu_modal"
                            >
                              Изменить
                            </button>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="panel panel-warning">
                            <div className="panel-heading">
                              {this.state.member.is_active == 'Да'
                                ? 'Убрать сотрудника из штата'
                                : 'Добавить сотрудника в штат'}
                            </div>
                            <div className="panel-body">
                              {this.state.member.is_active == 'Да'
                                ? ReactHtmlParser(
                                    '<p>При выборе этой настройки данные сотрудника остаются в архиве. Выбирайте эту настройку если сотрудник уволился.</p>'
                                  )
                                : ReactHtmlParser(
                                    '<p>Выбирайте эту настройку если сотрудник обратно вернулся на работу.</p>'
                                  )}
                            </div>
                            {this.state.member.is_active == 'Да'
                              ? ReactHtmlParser(
                                  '<button type="button" class="btn btn-outline btn-primary btn-lg btn-block change_profile_button" data-toggle="modal" data-target="#shtat_modal">Убрать</button>'
                                )
                              : ReactHtmlParser(
                                  '<button type="button" class="btn btn-outline btn-primary btn-lg btn-block change_profile_button" data-toggle="modal" data-target="#shtat_modal">Добавить</button>'
                                )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <MainEdit member={this.state.member} />
              <PrivateEdit member={this.state.member} />
              <EduEdit member={this.state.member} />

              {/*<!-- Modal for Штат -->*/}
              <div
                className="modal fade"
                id="shtat_modal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        Внимание
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Закрыть"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-12">
                            {this.state.member.is_active == 'Да'
                              ? ReactHtmlParser(
                                  '<h4>Вы уверены, что хотите убрать сотрудника из штата?</h4>'
                                )
                              : ReactHtmlParser(
                                  '<h4>Вы уверены, что хотите добавить сотрудника в штат?</h4>'
                                )}
                            <form
                              role="form"
                              method="POST"
                              action="../editMemberShtat"
                              id="shtat_form"
                            >
                              <input
                                type="hidden"
                                name="member_id"
                                value={this.state.member._id}
                              />
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary btn-danger"
                        data-dismiss="modal"
                      >
                        Отмена
                      </button>
                      <button
                        type="submit"
                        form="shtat_form"
                        className="btn btn-primary"
                      >
                        Да
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="vertical-center col-centered col-md-1"
          style={{ display: this.state.show }}
        >
          <ReactLoading type="spin" color="#339BEB" height={100} width={100} />
        </div>
      );
    }
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
