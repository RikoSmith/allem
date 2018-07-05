import React, { Component } from 'react';

class MainTopButtons extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-3">
                  <i className="fa fa-users fa-5x" />
                </div>
                <div className="col-xs-9 text-right">
                  <div className="huge">72</div>
                  <div>Сотрудников</div>
                </div>
              </div>
            </div>
            <a href="../../admin/members">
              <div className="panel-footer">
                <span className="pull-left">Список сотрудников</span>
                <span className="pull-right">
                  <i className="fa fa-arrow-circle-right" />
                </span>
                <div className="clearfix" />
              </div>
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="panel panel-green">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-3">
                  <i className="fa fa-sitemap fa-5x" />
                </div>
                <div className="col-xs-9 text-right">
                  <div className="huge">6</div>
                  <div>Отделов</div>
                </div>
              </div>
            </div>
            <a href="../../admin/map">
              <div className="panel-footer">
                <span className="pull-left">Карта организации</span>
                <span className="pull-right">
                  <i className="fa fa-arrow-circle-right" />
                </span>
                <div className="clearfix" />
              </div>
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="panel panel-yellow">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-3">
                  <i className="fa fa-user fa-5x" />
                </div>
                <div className="col-xs-9 text-right">
                  <div className="huge">2</div>
                  <div>Новых сотрудника</div>
                </div>
              </div>
            </div>
            <a href="../../admin/addMember">
              <div className="panel-footer">
                <span className="pull-left">Добавить сотрудника</span>
                <span className="pull-right">
                  <i className="fa fa-arrow-circle-right" />
                </span>
                <div className="clearfix" />
              </div>
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="panel panel-red">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-3">
                  <i className="fa fa-cloud fa-5x" />
                </div>
                <div className="col-xs-9 text-right">
                  <div className="huge">999</div>
                  <div>МБ Файлов</div>
                </div>
              </div>
            </div>
            <a href="https://cloud.mail.ru/home/ALLEM/">
              <div className="panel-footer">
                <span className="pull-left">Перейти в облако</span>
                <span className="pull-right">
                  <i className="fa fa-arrow-circle-right" />
                </span>
                <div className="clearfix" />
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default MainTopButtons;
