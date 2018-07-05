import React, { Component } from 'react';
import Header from './Header';
import MainTopButtons from './MainTopButtons';

class PageMain extends Component {
  render() {
    return (
      <div id="page-wrapper">
        <Header />
        <MainTopButtons />
      </div>
    );
  }
}

export default PageMain;
