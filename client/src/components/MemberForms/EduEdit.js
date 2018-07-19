import React, { Component } from 'react';

class EduEdit extends Component {
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
                      action="../editMemberEdu"
                      id="edu_form"
                    >
                      <input
                        type="hidden"
                        name="member_id"
                        value={this.props.member._id}
                      />
                      <div className="form-group">
                        <label>Среднее образование</label>
                        <input
                          className="form-control"
                          name="s_ed"
                          value={
                            this.props.member.s_ed
                              ? this.props.member.s_ed
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
                            this.props.member.h_ed
                              ? this.props.member.h_ed
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
                            this.props.member.institute
                              ? this.props.member.institute
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
                            this.props.member.specialty
                              ? this.props.member.specialty
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
                            this.props.member.ed_finish
                              ? this.props.member.ed_finish
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
