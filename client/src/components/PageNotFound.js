import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class PageNotFound extends Component {
  render() {
    return (
      <div id="not-found-page">
        <Helmet>
          <title>Ошибка доступа или страница не найдена</title>
        </Helmet>
        <div
          style={{
            minHeight: '100%',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div
            className="alert alert-warning"
            role="alert"
            style={{ margin: 'auto' }}
          >
            Страница не доступна или у вас нет прав на просмотр этого ресурса
          </div>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
