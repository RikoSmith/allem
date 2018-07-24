import React, { Component } from 'react';
import { instance as axios } from '../../utils/axiosConf';
import ReactHtmlParser from 'react-html-parser';

class PrivateEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      res: 'none',
      res_message: '',
      res_type: 'alert ',
      _id: this.props.member._id,
      sex: this.props.member.sex,
      id: this.props.member.id,
      birthdate: this.props.member.birthdate,
      phone: this.props.member.phone,
      address: this.props.member.address,
      address_current: this.props.member.address_current,
      family_status: this.props.member.family_status,
      children: this.props.member.children,
      children_18: this.props.member.children_18
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {});
  }

  onSubmit(e) {
    e.preventDefault();
    axios
      .post('/editPrivate', {
        member_id: this.state._id,
        sex: this.state.sex,
        id: this.state.id,
        birthdate: this.state.birthdate,
        phone: this.state.phone,
        address: this.state.address,
        address_current: this.state.address_current,
        family_status: this.state.family_status,
        children: this.state.children,
        children_18: this.state.children_18
      })
      .then(res => {
        this.setState({
          res_type: 'alert alert-success',
          res_message: res.data,
          res: 'block'
        });
        console.log(res.data);
      })
      .catch(err => {
        this.setState({
          res_type: 'alert alert-danger',
          res_message: err.response.data,
          res: 'block'
        });
        console.log('Error: ' + err);
      });
    console.log(this.state);
  }

  render() {
    return (
      <div
        className="modal fade"
        id="lich_modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="result_message" style={{ display: this.state.res }}>
          <div className={this.state.res_type} role="alert">
            {ReactHtmlParser(this.state.res_message)}
          </div>
        </div>
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
                      id="lich_form"
                      onSubmit={this.onSubmit}
                    >
                      <input
                        type="hidden"
                        name="member_id"
                        value={this.state._id}
                      />
                      <div className="form-group">
                        <label>Пол</label>
                        <select
                          className="form-control"
                          value={this.state.sex}
                          name="sex"
                          onChange={this.onChange}
                          required
                        >
                          <option>М</option>
                          <option>Ж</option>
                          <option>Другой</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>ИИН</label>
                        <input
                          className="form-control"
                          type="number"
                          name="id"
                          value={this.state.id}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Дата Рождения</label>
                        <input
                          className="form-control"
                          type="date"
                          name="birthdate"
                          value={this.state.birthdate}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Телефон</label>
                        <input
                          className="form-control"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Адрес прописки</label>
                        <input
                          className="form-control"
                          name="address"
                          value={this.state.address}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Адрес проживания</label>
                        <input
                          className="form-control"
                          name="address_current"
                          value={this.state.address_current}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Семейное положение</label>
                        <select
                          className="form-control"
                          name="family_status"
                          value={this.state.family_status}
                          onChange={this.onChange}
                        >
                          <option>Женат</option>
                          <option>Замужем</option>
                          <option>Нет</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Наличие детей</label>
                        <input
                          className="form-control"
                          type="number"
                          name="children"
                          value={this.state.children}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Дети младше 18</label>
                        <input
                          className="form-control"
                          type="number"
                          name="children_18"
                          value={this.state.children_18}
                          onChange={this.onChange}
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
