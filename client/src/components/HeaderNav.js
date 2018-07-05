import React, { Component } from 'react';

class HeaderNav extends Component {
  render() {
    return (
      <div
        className="navbar navbar-default navbar-static-top"
        role="navigation"
      >
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="/">
            Панель Allem
          </a>
        </div>
        <div className="navbar-right logout_div">
          <p>
            Вы вошли как <b>[USERNAME] |</b>{' '}
            <a className="logout_button" href="../logout">
              <i className="fa fa-user fa-fw" />Выход
            </a>
          </p>
        </div>

        <div className="navbar-default sidebar" role="navigation">
          <div className="sidebar-nav navbar-collapse">
            <ul className="nav" id="side-menu">
              <li>
                <a href="../../admin">
                  <i className="fa fa-home fa-fw" /> Общее (мониторинг)
                </a>
              </li>
              <li>
                <a href="../../admin/members">
                  <i className="fa fa-user fa-fw" /> Сотрудники
                </a>
              </li>
              <li>
                <a href="../../admin/departments">
                  <i className="fa fa-chart-pie fa-fw" /> Отделы
                </a>
              </li>
              <li>
                <a href="../../admin/map">
                  <i className="fa fa-sitemap fa-fw" /> Карта организации
                </a>
              </li>
              <li>
                <a href="https://cloud.mail.ru/home/">
                  <i className="fa fa-folder fa-fw" /> Файлы
                </a>
              </li>
              <li>
                <a href="../../admin/handbook">
                  <i className="fa fa-question fa-fw" /> Справочник
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderNav;
