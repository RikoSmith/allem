import React from 'react';
import MetaTags from 'react-meta-tags';

const Denied = ({}) => (
  <div id="page-wrapper">
    <MetaTags>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="" />
      <meta name="author" content="" />
      <title>Панель администратора</title>
    </MetaTags>
    <div className="row">
      <div className="col-lg-12">
        <h1 className="page-header">Ошибка доступа</h1>
      </div>
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-red">
          <div className="panel-heading">Доступ запрещен!</div>
          <div className="panel-body">
            <p>
              Доступ вам к данной странице запрещен администратором. Привелегии
              доступа предоставляются администратором с разрешением директора
              (Бауржан Шарипович). Если вы считаете, что произошла ошибка, то
              обратитесь к администратору (каб. 448).
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Denied;
