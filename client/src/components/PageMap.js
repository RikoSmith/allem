import React, { Component } from 'react';
import HeaderNav from './HeaderNav';
import Header from './Header';
import { Helmet } from 'react-helmet';
import { ScriptInjector } from '../utils/scriptInjectorAdmin';
import conf from '../config/config';
import { instance as axios } from '../utils/axiosConf';
import ReactLoading from 'react-loading';

class PageMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: '',
      show: 'block',
      show_iframe: 'none'
    };
  }

  componentDidMount() {
    axios.get('/mapGetKey').then(res => {
      var key = res.data;
      this.setState({ key, show: 'none', show_iframe: 'block' });
    });
    ScriptInjector();
  }

  render() {
    return (
      <div id="wrapper">
        <Helmet>
          <title>Сотрудники</title>
        </Helmet>
        <HeaderNav />
        <div id="page-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="page-header">
                  Карта организации{' '}
                  <a href="/admin/mapview">
                    <span className="map_full_button">[на полный экран]</span>
                  </a>
                </h1>
              </div>
              <div
                classNameName="vertical-center col-centered col-md-1"
                style={{ display: this.state.show }}
              >
                <ReactLoading
                  type="spin"
                  color="#339BEB"
                  height={100}
                  width={100}
                />
              </div>
              <iframe
                className="map_view"
                style={{ display: this.state.show_iframe }}
                src={conf.SERVER_ADRESS + '/map?key=' + this.state.key}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageMap;
