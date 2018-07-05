import React, { Component } from 'react';

class FooterScripts extends Component {
  render() {
    return (
      <div>
        {/*jQuery*/}
        <script src="/sb-admin/vendor/jquery/jquery.min.js" />

        {/*Bootstrap Core JavaScript*/}
        <script src="/sb-admin/vendor/bootstrap/js/bootstrap.min.js" />

        {/*Metis Menu Plugin JavaScript*/}
        <script src="/sb-admin/vendor/metisMenu/metisMenu.min.js" />

        {/*Morris Charts JavaScript*/}
        <script src="/sb-admin/vendor/raphael/raphael.min.js" />
        <script src="/sb-admin/vendor/morrisjs/morris.min.js" />
        <script src="/sb-admin/data/morris-data.js" />

        {/*Custom Theme JavaScript*/}
        <script src="/sb-admin/dist/js/sb-admin-2.js" />
      </div>
    );
  }
}

export default FooterScripts;
