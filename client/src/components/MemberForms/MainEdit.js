import React, { Component } from 'react';

class MainEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      lastname: this.props.user.lastname,
      middlename: this.props.user.middlename,
      position: this.props.user.position,
      department: this.props.user.department,
      start_date: this.props.user.start_date,
      end_date: this.props.user.end_date,
      member_id: this.props.user.member_id,
      status: this.props.user.status,
      status_end_date: this.props.user.status_end_date,
      holiday_start: this.props.user.holiday_start,
      holiday_end: this.props.user.holiday_end
    };
  }
  render() {
    return (
      <div
        className="modal fade"
        id="osnov_modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
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
                        value={this.props.member._id}
                      />
                      <div className="form-group">
                        <label>Фамилия</label>
                        <input
                          className="form-control"
                          name="lastname"
                          value={this.props.member.lastname}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Имя</label>
                        <input
                          className="form-control"
                          name="name"
                          value={this.props.member.name}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Отчество</label>
                        <input
                          className="form-control"
                          name="middlename"
                          value={
                            this.props.member.middlename
                              ? this.props.member.middlename
                              : '-'
                          }
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Должность</label>
                        <input
                          className="form-control"
                          name="position"
                          value={
                            this.props.member.position
                              ? this.props.member.position
                              : '-'
                          }
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Отдел</label>
                        <select
                          className="form-control"
                          name="department"
                          onChange={this.onChange}
                          required
                        >
                          <option
                            {...(this.props.member.dep_name === 'head'
                              ? 'selected="selected"'
                              : null)}
                          >
                            Административно-управленческий персонал
                          </option>
                          <option
                            {...(this.props.member.dep_name === 'head_service'
                              ? 'selected="selected"'
                              : null)}
                          >
                            Административно – хозяйственная служба
                          </option>
                          <option
                            {...(this.props.member.dep_name === 'prop_head'
                              ? 'selected="selected"'
                              : null)}
                          >
                            Административно – хозяйственный отдел
                          </option>
                          <option
                            {...(this.props.member.dep_name === 'remont'
                              ? 'selected="selected"'
                              : null)}
                          >
                            Ремонтно – строительный отдел
                          </option>
                          <option
                            {...(this.props.member.dep_name === 'supply'
                              ? 'selected="selected"'
                              : null)}
                          >
                            Отдел материально – технического снабжения
                          </option>
                          <option
                            {...(this.props.member.dep_name === 'energy'
                              ? 'selected="selected"'
                              : null)}
                          >
                            Отдел энергетики
                          </option>
                          <option
                            {...(this.props.member.dep_name === 'esystem'
                              ? 'selected="selected"'
                              : null)}
                          >
                            Отдел по эксплуатации инженерных систем
                          </option>
                          <option
                            {...(this.props.member.dep_name === 'safety'
                              ? 'selected="selected"'
                              : null)}
                          >
                            Отдел ГО, ЧС, охраны труда и техники безопасности
                          </option>
                          <option
                            {...(this.props.member.dep_name === 'security'
                              ? 'selected="selected"'
                              : null)}
                          >
                            Отдел безопасности
                          </option>
                          <option
                            {...(this.props.member.dep_name === 'kipia'
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
                          {...(this.props.member.status === 'В отпуске'
                            ? 'disabled'
                            : null)}
                          onChange={this.onChange}
                        >
                          <option
                            id="work"
                            {...(this.props.member.status === 'На работе'
                              ? 'selected="selected"'
                              : null)}
                          >
                            На работе
                          </option>
                          ...this.props.member.status === 'В отпуске' ? '<option
                            id="holiday"
                            selected="selected"
                          >
                            В отпуске
                          </option>' : null
                          <option
                            id="dekret"
                            {...(this.props.member.status === 'В декрете'
                              ? 'selected="selected"'
                              : null)}
                          >
                            В декрете
                          </option>
                          <option
                            id="ill"
                            {...(this.props.member.status === 'На больничных'
                              ? 'selected="selected"'
                              : null)}
                          >
                            На больничных
                          </option>
                          <option
                            id="trip"
                            {...(this.props.member.status === 'В командировке'
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
                            this.props.member.status_end_date
                              ? this.props.member.status_end_date
                              : '-'
                          }
                          {...(this.props.member.status === 'На работе' ||
                          this.props.member.status === 'В отпуске'
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
                            this.props.member.holiday_start
                              ? this.props.member.holiday_start
                              : '-'
                          }
                        />
                        <label>Отпуск до</label>
                        <input
                          type="date"
                          className="form-control"
                          name="holiday_end"
                          value={
                            this.props.member.holiday_end
                              ? this.props.member.holiday_end
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
                            this.props.member.start_date
                              ? this.props.member.start_date
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
                            this.props.member.end_date
                              ? this.props.member.end_date
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
    );
  }
}

export default MainEdit;
