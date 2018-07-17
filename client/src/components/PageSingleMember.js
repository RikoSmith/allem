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
      member: {},
      show: 'flex'
    };
  }

  componentWillMount() {
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
          window.location.reload();
        });
    }
  }

  render() {
    if (this.state.show === 'none') {
      return (
        <div>
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
                    this.state.member.delo_url ? this.state.member.delo_url : ''
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
                            <td className="info_header">Семейное положение:</td>
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
                            <td className="info_header">Высшее образование:</td>
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
                              "Личные". После изменения данные сохраняются в БД
                              перезаписывая старые данные.
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
                              "Образование". После изменения данные сохраняются
                              в БД перезаписывая старые данные.
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
                              ? '<p>При выборе этой настройки данные сотрудника остаются в архиве. Выбирайте эту настройку если сотрудник уволился.</p>'
                              : '<p>Выбирайте эту настройку если сотрудник обратно вернулся на работу.</p>'}
                          </div>
                          {this.state.member.is_active == 'Да'
                            ? '<button type="button" className="btn btn-outline btn-primary btn-lg btn-block change_profile_button" data-toggle="modal" data-target="#shtat_modal">Убрать</button>'
                            : '<button type="button" className="btn btn-outline btn-primary btn-lg btn-block change_profile_button" data-toggle="modal" data-target="#shtat_modal">Добавить</button>'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<!-- /.panel -->
      <!-- MODALS -->
      <!-- Modal for Основные -->*/}
            <div
              className="modal fade"
              id="osnov_modal"
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
                      Основные данные
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
                          <form
                            role="form"
                            method="POST"
                            action="../editMember"
                            id="osnov_form"
                          >
                            <input
                              type="hidden"
                              name="member_id"
                              value={this.state.member._id}
                            />
                            <div className="form-group">
                              <label>Фамилия</label>
                              <input
                                className="form-control"
                                name="lastname"
                                value={this.state.member.lastname}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Имя</label>
                              <input
                                className="form-control"
                                name="name"
                                value={this.state.member.name}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Отчество</label>
                              <input
                                className="form-control"
                                name="middlename"
                                value={
                                  this.state.member.middlename
                                    ? this.state.member.middlename
                                    : '-'
                                }
                              />
                            </div>
                            <div className="form-group">
                              <label>Должность</label>
                              <input
                                className="form-control"
                                name="position"
                                value={
                                  this.state.member.position
                                    ? this.state.member.position
                                    : '-'
                                }
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Отдел</label>
                              <select
                                className="form-control"
                                name="department"
                                required
                              >
                                <option
                                  {...(this.state.member.dep_name === 'head'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  Административно-управленческий персонал
                                </option>
                                <option
                                  {...(this.state.member.dep_name ===
                                  'head_service'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  Административно – хозяйственная служба
                                </option>
                                <option
                                  {...(this.state.member.dep_name ===
                                  'prop_head'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  Административно – хозяйственный отдел
                                </option>
                                <option
                                  {...(this.state.member.dep_name === 'remont'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  Ремонтно – строительный отдел
                                </option>
                                <option
                                  {...(this.state.member.dep_name === 'supply'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  Отдел материально – технического снабжения
                                </option>
                                <option
                                  {...(this.state.member.dep_name === 'energy'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  Отдел энергетики
                                </option>
                                <option
                                  {...(this.state.member.dep_name === 'esystem'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  Отдел по эксплуатации инженерных систем
                                </option>
                                <option
                                  {...(this.state.member.dep_name === 'safety'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  Отдел ГО, ЧС, охраны труда и техники
                                  безопасности
                                </option>
                                <option
                                  {...(this.state.member.dep_name === 'security'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  Отдел безопасности
                                </option>
                                <option
                                  {...(this.state.member.dep_name === 'kipia'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  Отдел слаботочных систем и КИПиА
                                </option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label>Статус</label>
                              <select
                                className="form-control"
                                name="status"
                                id="status_select"
                                required
                                {...(this.state.member.status === 'В отпуске'
                                  ? 'disabled'
                                  : null)}
                              >
                                <option
                                  id="work"
                                  {...(this.state.member.status === 'На работе'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  На работе
                                </option>
                                ...this.state.member.status === 'В отпуске' ? '<option
                                  id="holiday"
                                  selected="selected"
                                >
                                  В отпуске
                                </option>' : null
                                <option
                                  id="dekret"
                                  {...(this.state.member.status === 'В декрете'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  В декрете
                                </option>
                                <option
                                  id="ill"
                                  {...(this.state.member.status ===
                                  'На больничных'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  На больничных
                                </option>
                                <option
                                  id="trip"
                                  {...(this.state.member.status ===
                                  'В командировке'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  В командировке
                                </option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label>Декрет/командировка/больничная до</label>
                              <input
                                id="status_end_date"
                                type="date"
                                className="form-control"
                                name="status_end_date"
                                value={
                                  this.state.member.status_end_date
                                    ? this.state.member.status_end_date
                                    : '-'
                                }
                                {...(this.state.member.status === 'На работе' ||
                                this.state.member.status === 'В отпуске'
                                  ? 'disabled'
                                  : null)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Отпуск с</label>
                              <input
                                type="date"
                                className="form-control"
                                name="holiday_start"
                                value={
                                  this.state.member.holiday_start
                                    ? this.state.member.holiday_start
                                    : '-'
                                }
                              />
                              <label>Отпуск до</label>
                              <input
                                type="date"
                                className="form-control"
                                name="holiday_end"
                                value={
                                  this.state.member.holiday_end
                                    ? this.state.member.holiday_end
                                    : '-'
                                }
                              />
                            </div>
                            <div className="form-group">
                              <label>Начало сотрудничества</label>
                              <input
                                type="date"
                                className="form-control"
                                name="start_date"
                                value={
                                  this.state.member.start_date
                                    ? this.state.member.start_date
                                    : '-'
                                }
                              />
                            </div>
                            <div className="form-group">
                              <label>Конец сотрудничества</label>
                              <input
                                type="date"
                                className="form-control"
                                name="end_date"
                                value={
                                  this.state.member.end_date
                                    ? this.state.member.end_date
                                    : '-'
                                }
                              />
                            </div>
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
                      form="osnov_form"
                      className="btn btn-primary"
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/*<!-- Modal for Личные -->*/}
            <div
              className="modal fade"
              id="lich_modal"
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
                      Личные данные
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
                          <form
                            role="form"
                            method="POST"
                            action="../editMemberPrivate"
                            id="lich_form"
                          >
                            <input
                              type="hidden"
                              name="member_id"
                              value={this.state.member._id}
                            />
                            <div className="form-group">
                              <label>Пол</label>
                              <select
                                className="form-control"
                                name="sex"
                                required
                              >
                                <option
                                  {...(this.state.member.sex === 'М'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  М
                                </option>
                                <option
                                  {...(this.state.member.sex === 'Ж'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  Ж
                                </option>
                                <option
                                  {...(this.state.member.sex === 'Другой'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  Другой
                                </option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label>ИИН</label>
                              <input
                                className="form-control"
                                type="number"
                                name="id"
                                value={
                                  this.state.member.id
                                    ? this.state.member.id
                                    : '-'
                                }
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Дата Рождения</label>
                              <input
                                className="form-control"
                                type="date"
                                name="birthdate"
                                value={
                                  this.state.member.birthdate
                                    ? this.state.member.birthdate
                                    : '-'
                                }
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Телефон</label>
                              <input
                                className="form-control"
                                name="phone"
                                value={
                                  this.state.member.phone
                                    ? this.state.member.phone
                                    : '-'
                                }
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Адрес прописки</label>
                              <input
                                className="form-control"
                                name="address"
                                value={
                                  this.state.member.address
                                    ? this.state.member.address
                                    : '-'
                                }
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Адрес проживания</label>
                              <input
                                className="form-control"
                                name="address_current"
                                value={
                                  this.state.member.address_current
                                    ? this.state.member.address_current
                                    : '-'
                                }
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Семейное положение</label>
                              <select
                                className="form-control"
                                name="family_status"
                              >
                                <option
                                  {...(this.state.member.family_status ===
                                  'Женат'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  {' '}
                                  >Женат
                                </option>
                                <option
                                  {...(this.state.member.family_status ===
                                  'Замужем'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  Замужем
                                </option>
                                <option
                                  {...(this.state.member.family_status === 'Нет'
                                    ? 'selected="selected"'
                                    : null)}
                                >
                                  Нет
                                </option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label>Наличие детей</label>
                              <input
                                className="form-control"
                                type="number"
                                name="children"
                                value={
                                  this.state.member.children
                                    ? this.state.member.children
                                    : '9999'
                                }
                              />
                            </div>
                            <div className="form-group">
                              <label>Дети младше 18</label>
                              <input
                                className="form-control"
                                type="number"
                                name="children_18"
                                value={
                                  this.state.member.children_18
                                    ? this.state.member.children_18
                                    : '9999'
                                }
                              />
                            </div>
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
                      form="lich_form"
                      className="btn btn-primary"
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/*<!-- Modal for Личные -->*/}
            <div
              className="modal fade"
              id="edu_modal"
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
                      Образование
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
                          <form
                            role="form"
                            method="POST"
                            action="../editMemberEdu"
                            id="edu_form"
                          >
                            <input
                              type="hidden"
                              name="member_id"
                              value={this.state.member._id}
                            />
                            <div className="form-group">
                              <label>Среднее образование</label>
                              <input
                                className="form-control"
                                name="s_ed"
                                value={
                                  this.state.member.s_ed
                                    ? this.state.member.s_ed
                                    : '-'
                                }
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Высшее образование</label>
                              <input
                                className="form-control"
                                name="h_ed"
                                value={
                                  this.state.member.h_ed
                                    ? this.state.member.h_ed
                                    : '-'
                                }
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>ВУЗ</label>
                              <input
                                className="form-control"
                                name="institute"
                                value={
                                  this.state.member.institute
                                    ? this.state.member.institute
                                    : '-'
                                }
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Специальность</label>
                              <input
                                className="form-control"
                                name="specialty"
                                value={
                                  this.state.member.specialty
                                    ? this.state.member.specialty
                                    : '-'
                                }
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Год окончания</label>
                              <input
                                className="form-control"
                                type="number"
                                name="ed_finish"
                                value={
                                  this.state.member.ed_finish
                                    ? this.state.member.ed_finish
                                    : '-'
                                }
                                required
                              />
                            </div>
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
                      form="edu_form"
                      className="btn btn-primary"
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
                      Образование
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
                            ? '<h4>Вы уверены, что хотите убрать сотрудника из штата?</h4>'
                            : '<h4>Вы уверены, что хотите добавить сотрудника в штат?</h4>'}
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
