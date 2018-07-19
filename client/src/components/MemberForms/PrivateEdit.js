import React, { Component } from 'react';

class PrivateEdit extends Component {
  render() {
    return (
      <div
        className="modal fade"
        id="lich_modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
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
                        value={this.props.member._id}
                      />
                      <div className="form-group">
                        <label>Пол</label>
                        <select className="form-control" name="sex" required>
                          <option
                            {...(this.props.member.sex === 'М'
                              ? 'selected="selected"'
                              : null)}
                          >
                            М
                          </option>
                          <option
                            {...(this.props.member.sex === 'Ж'
                              ? 'selected="selected"'
                              : null)}
                          >
                            Ж
                          </option>
                          <option
                            {...(this.props.member.sex === 'Другой'
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
                            this.props.member.id ? this.props.member.id : '-'
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
                            this.props.member.birthdate
                              ? this.props.member.birthdate
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
                            this.props.member.phone
                              ? this.props.member.phone
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
                            this.props.member.address
                              ? this.props.member.address
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
                            this.props.member.address_current
                              ? this.props.member.address_current
                              : '-'
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Семейное положение</label>
                        <select className="form-control" name="family_status">
                          <option
                            {...(this.props.member.family_status === 'Женат'
                              ? 'selected="selected"'
                              : null)}
                          >
                            {' '}
                            Женат
                          </option>
                          <option
                            {...(this.props.member.family_status === 'Замужем'
                              ? 'selected="selected"'
                              : null)}
                          >
                            Замужем
                          </option>
                          <option
                            {...(this.props.member.family_status === 'Нет'
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
                            this.props.member.children
                              ? this.props.member.children
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
                            this.props.member.children_18
                              ? this.props.member.children_18
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
    );
  }
}

export default PrivateEdit;
