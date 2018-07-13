import React, { Component } from 'react';
import Header from './Header';
import MainTopButtons from './MainTopButtons';
import MetaTags from 'react-meta-tags';
import { withRouter } from 'react-router-dom';

class PageMain extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="page-wrapper">
        <MetaTags>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="" />
          <meta name="author" content="" />
          <title>Панель администратора</title>
        </MetaTags>
        <Header />
        <MainTopButtons />
      </div>
    );
  }
}

export default withRouter(PageMain);
