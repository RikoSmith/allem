import React, { Component } from 'react';
import dateFormat from '../../utils/formatDate';
import { instance as axios } from '../../utils/axiosConf';
import ReactHtmlParser from 'react-html-parser';

class MainEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: 'none',
      res_message: '',
      res_type: 'alert ',
      holiday_edit: 'disabled',
      dates_edit: 'disabled',
      _id: this.props.member._id,
      name: this.props.member.name,
      lastname: this.props.member.lastname,
      middlename: this.props.member.middlename,
      position: this.props.member.position,
      department: this.props.member.department,
      dep_name: this.props.member.dep_name,
      start_date: this.props.member.start_date,
      end_date: this.props.member.end_date,
      member_id: this.props.member.member_id,
      status: this.props.member.status,
      status_end_date: this.props.member.status_end_date,
      holiday_start: this.props.member.holiday_start,
      holiday_end: this.props.member.holiday_end
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.depMap = {
      head: 'Административно-управленческий персонал',
      safety: 'Отдел ГО, ЧС, охраны труда и техники безопасности',
      supply: 'Отдел материально–технического снабжения',
      energy: 'Отдел энергетики',
      head_service: 'Административно-хозяйственная служба',
      prop_head: 'Административно-хозяйственный отдел',
      remont: 'Ремонтно-строительный отдел',
      esystem: 'Отдел по эксплуатации инженерных систем',
      security: 'Отдел безопасности',
      kipia: 'Отдел слаботочных систем и КИПиА'
    };
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState({ department: this.depMap[this.state.dep_name] }, () => {
        if (
          this.state.status === 'На работе' ||
          this.state.status === 'В отпуске'
        ) {
          this.setState({
            holiday_edit: 'disabled',
            status_end_date: '-'
          });
        } else {
          this.setState({ holiday_edit: '' });
        }

        if (this.state.status === 'В отпуске') {
          this.setState({ dates_edit: '' });
        } else {
          this.setState({
            dates_edit: 'disabled',
            holiday_start: '-',
            holiday_end: '-'
          });
        }
      });
    });
  }

  onSubmit(e) {
    e.preventDefault();
    axios
      .post('/editMain', {
        member_id: this.state._id,
        name: this.state.name,
        lastname: this.state.lastname,
        middlename: this.state.middlename,
        position: this.state.position,
        department: this.state.department,
        dep_name: this.state.dep_name,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        status: this.state.status,
        status_end_date: this.state.status_end_date,
        holiday_start: this.state.holiday_start,
        holiday_end: this.state.holiday_end
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
  }
  render() {
    return (
      <div
        className="modal fade"
        id="osnov_modal"
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
                      onSubmit={this.onSubmit}
                      method="POST"
                      id="osnov_form"
                    >
                      <input
                        type="hidden"
                        name="member_id"
                        value={this.state._id}
                      />
                      <div className="form-group">
                        <label>Фамилия</label>
                        <input
                          className="form-control"
                          name="lastname"
                          value={this.state.lastname}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Имя</label>
                        <input
                          className="form-control"
                          name="name"
                          value={this.state.name}
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
                            this.state.middlename ? this.state.middlename : '-'
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
                            this.state.position ? this.state.position : '-'
                          }
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Отдел</label>
                        <select
                          className="form-control"
                          name="dep_name"
                          value={this.state.dep_name}
                          onChange={this.onChange}
                          required
                        >
                          <option value="head">{this.depMap.head}</option>
                          <option value="head_service">
                            {this.depMap.head_service}
                          </option>
                          <option value="prop_head">
                            {this.depMap.prop_head}
                          </option>
                          <option value="remont">{this.depMap.remont}</option>
                          <option value="supply">{this.depMap.supply}</option>
                          <option value="energy">{this.depMap.energy}</option>
                          <option value="esystem">{this.depMap.esystem}</option>
                          <option value="safety">{this.depMap.safety}</option>
                          <option value="security">
                            {this.depMap.security}
                          </option>
                          <option value="kipia">{this.depMap.kipia}</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Статус</label>
                        <select
                          className="form-control"
                          name="status"
                          id="status_select"
                          value={this.state.status}
                          required
                          onChange={this.onChange}
                        >
                          <option id="work">На работе</option>
                          <option id="holiday">В отпуске</option>
                          <option id="dekret">В декрете</option>
                          <option id="ill">На больничных</option>
                          <option id="trip">В командировке</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Декрет/командировка/больничная до</label>
                        <input
                          id="status_end_date"
                          type="date"
                          className="form-control"
                          name="status_end_date"
                          value={this.state.status_end_date}
                          disabled={this.state.holiday_edit}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Отпуск с</label>
                        <input
                          type="date"
                          className="form-control"
                          name="holiday_start"
                          value={this.state.holiday_start}
                          disabled={this.state.dates_edit}
                          onChange={this.onChange}
                        />
                        <label>Отпуск до</label>
                        <input
                          type="date"
                          className="form-control"
                          name="holiday_end"
                          value={this.state.holiday_end}
                          disabled={this.state.dates_edit}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Начало сотрудничества</label>
                        <input
                          type="date"
                          className="form-control"
                          name="start_date"
                          value={this.state.start_date}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Конец сотрудничества</label>
                        <input
                          type="date"
                          className="form-control"
                          name="end_date"
                          value={this.state.end_date}
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
