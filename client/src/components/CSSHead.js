import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';

class CSSHead extends Component {
  render() {
    return (
      <MetaTags>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <link
          href="../../sb-admin/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="../../sb-admin/vendor/metisMenu/metisMenu.min.css"
          rel="stylesheet"
        />
        <link href="../../sb-admin/dist/css/sb-admin-2.css" rel="stylesheet" />
        <link
          href="../../sb-admin/vendor/morrisjs/morris.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
          integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
          crossOrigin="anonymous"
        />
      </MetaTags>
    );
  }
}

export default CSSHead;
