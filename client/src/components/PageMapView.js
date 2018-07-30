import React, { Component } from 'react';
import HeaderNav from './HeaderNav';
import Header from './Header';
import { Helmet } from 'react-helmet';
import { ScriptInjector } from '../utils/scriptInjectorAdmin';
import conf from '../config/config';
import { instance as axios } from '../utils/axiosConf';
import ReactLoading from 'react-loading';

class PageMapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: '',
      show: 'flex',
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
      <div className="map_view_container">
        <Helmet>
          <title>Сотрудники</title>
        </Helmet>

        <div
          className="vertical-center col-centered col-md-1"
          style={{ display: this.state.show }}
        >
          <ReactLoading type="spin" color="#339BEB" height={100} width={100} />
        </div>
        <iframe
          class="map_view_large"
          style={{ display: this.state.show_iframe }}
          src={conf.SERVER_ADRESS + '/map?key=' + this.state.key}
        />
      </div>
    );
  }
}

export default PageMapView;
