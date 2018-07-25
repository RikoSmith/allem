import React, { Component } from 'react';
import { instance as axios } from '../utils/axiosConf';
import HeaderNav from './HeaderNav';
import Header from './Header';
import { Helmet } from 'react-helmet';
import { ScriptInjector } from '../utils/scriptInjectorAdmin';
import ReactLoading from 'react-loading';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class PageDepartments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deps: [],
      heads: [],
      show: 'block'
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuth) {
      this.props.history.push('/login');
    } else {
      axios
        .get('/departments/')
        .then(res => {
          const deps = res.data.data;
          this.setState({ deps, show: 'none' });
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
    return (
      <div id="wrapper">
        <Helmet>
          <title>Отделы</title>
        </Helmet>
        <HeaderNav />
        <div id="page-wrapper">
          <Header page="Отделы" />
          <div className="row">
            <div className="col-lg-12">
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
              <div class="panel-group" id="accordion">
                {this.state.deps.map(function(item, i) {
                  return (
                    <div class="panel panel-primary">
                      <div class="panel-heading dep_name">
                        <h4 class="panel-title">
                          <a
                            data-toggle="collapse"
                            data-parent="#accordion"
                            href={'#collapse_' + item.dep_name}
                            aria-expanded="false"
                            class="collapsed"
                          >
                            {item.name}
                          </a>
                        </h4>
                      </div>
                      <div
                        id={'collapse_' + item.dep_name}
                        class={
                          'panel-collapse collapse ' + (i == 0 ? 'in' : ' ')
                        }
                      >
                        <div class="panel-body">
                          <div class="row">
                            <div class="col-md-3">
                              <div class="panel panel-default">
                                <div class="panel-body">
                                  <img
                                    class="dep_image"
                                    alt=""
                                    src={
                                      '/images/departments/' +
                                      item.image +
                                      '.png'
                                    }
                                  />
                                </div>
                                <div class="panel-footer">{item.dep_name}</div>
                              </div>
                            </div>
                            <div class="col-md-9">
                              <h4>Данные отдела:</h4>
                              <div class="table-responsive dep_table">
                                <table class="table table-hover">
                                  <tbody>
                                    <tr>
                                      <td class="info_header">
                                        Название отдела:
                                      </td>
                                      <td>{item.name}</td>
                                    </tr>
                                    <tr>
                                      <td class="info_header">Руководитель:</td>
                                      <img
                                        class="dep_head_image"
                                        alt=""
                                        src={
                                          item.head_info.image
                                            ? '/images/members_small/' +
                                              item.head_info.image +
                                              '.jpg'
                                            : 'http://via.placeholder.com/250x300'
                                        }
                                      />
                                      <a
                                        href={
                                          '../../admin/member/' + item.head_id
                                        }
                                      >
                                        {item.head_info
                                          ? item.head_info.name +
                                            ' ' +
                                            item.head_info.lastname
                                          : 'Noname Noname'}
                                      </a>
                                    </tr>
                                    <tr>
                                      <td class="info_header">Штат:</td>
                                      <td>
                                        <a
                                          href={
                                            '../../admin/members?filter=' +
                                            item.dep_name
                                          }
                                        >
                                          {item.member_count + ' сотрудников'}
                                        </a>{' '}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="info_header">Кабинет:</td>
                                      <td>{item.room ? item.room : '-'}</td>
                                    </tr>
                                    <tr>
                                      <td class="info_header">
                                        Внутренний номер:
                                      </td>
                                      <td>
                                        {item.internal_phone
                                          ? item.internal_phone
                                          : '-'}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="info_header">
                                        Городской номер:
                                      </td>
                                      <td>
                                        {item.external_phone
                                          ? item.external_phone
                                          : '-'}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <a
                                  href={
                                    item.folder_url_dep
                                      ? item.folder_url_dep
                                      : '-'
                                  }
                                >
                                  {' '}
                                  <button
                                    type="button"
                                    class="btn btn-outline btn-primary btn-lg dep_button"
                                  >
                                    Файлы отдела
                                  </button>
                                </a>
                                <a
                                  href={
                                    item.folder_url_members
                                      ? item.folder_url_members
                                      : '-'
                                  }
                                >
                                  <button
                                    type="button"
                                    class="btn btn-outline btn-primary btn-lg dep_button"
                                  >
                                    Файлы сотрудиков отдела
                                  </button>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
  )(PageDepartments)
);
