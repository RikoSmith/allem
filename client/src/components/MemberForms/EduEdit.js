import React, { Component } from 'react';
import { instance as axios } from '../../utils/axiosConf';
import ReactHtmlParser from 'react-html-parser';

class EduEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      res: 'none',
      res_message: '',
      res_type: 'alert ',
      _id: this.props.member._id,
      s_ed: this.props.member.s_ed,
      h_ed: this.props.member.h_ed,
      institute: this.props.member.institute,
      specialty: this.props.member.specialty,
      ed_finish: this.props.member.ed_finish
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
      .post('/editEdu', {
        member_id: this.state._id,
        s_ed: this.state.s_ed,
        h_ed: this.state.h_ed,
        institute: this.state.institute,
        specialty: this.state.specialty,
        ed_finish: this.state.ed_finish
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
        id="edu_modal"
        tabindex="-1"
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
                      id="edu_form"
                      onSubmit={this.onSubmit}
                    >
                      <input
                        type="hidden"
                        name="member_id"
                        value={this.state._id}
                        onChange={this.onChange}
                      />
                      <div className="form-group">
                        <label>Среднее образование</label>
                        <input
                          className="form-control"
                          name="s_ed"
                          value={this.state.s_ed}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Высшее образование</label>
                        <input
                          className="form-control"
                          name="h_ed"
                          value={this.state.h_ed}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>ВУЗ</label>
                        <input
                          className="form-control"
                          name="institute"
                          value={this.state.institute}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Специальность</label>
                        <input
                          className="form-control"
                          name="specialty"
                          value={this.state.specialty}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Год окончания</label>
                        <input
                          className="form-control"
                          type="number"
                          name="ed_finish"
                          value={this.state.ed_finish}
                          onChange={this.onChange}
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
              <button type="submit" form="edu_form" className="btn btn-primary">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EduEdit;
