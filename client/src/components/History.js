import React, { Component } from 'react';
import { instance as axios } from '../utils/axiosConf';
import ReactLoading from 'react-loading';
import ReactHtmlParser from 'react-html-parser';
import PageNotFound from './PageNotFound';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      show: 'flex'
    };
  }

  componentWillMount() {
    axios.get('/history').then(res => {
      const events = res.data.data;
      this.setState({ events, show: 'none', denied: 'false' });
    });
  }

  render() {
    if (!this.props.auth.user.permission.includes('general')) {
      return <PageNotFound />;
    }
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <i className="fa fa-bell fa-fw" /> Панель уведомлении
            </div>
            <div className="panel-body">
              <div
                className="vertical-center col-centered col-md-1"
                style={{ display: this.state.show }}
              >
                <ReactLoading
                  type="spin"
                  color="#339BEB"
                  height={100}
                  width={100}
                />
              </div>
              <div className="list-group">
                {this.state.events.map(function(event, i) {
                  if (i > 15) {
                    return '';
                  }
                  var date = new Date(event.timestamp);
                  var now = new Date();
                  var timeDiff = Math.abs(now.getTime() - date.getTime());
                  var diffMinutes = Math.ceil(timeDiff / (1000 * 60));
                  var time = '';
                  if (diffMinutes < 60) {
                    time = String(diffMinutes + ' минут назад');
                  } else if (
                    diffMinutes < 60 * 24 &&
                    now.getDate() === date.getDate()
                  ) {
                    var hours = date.getHours();
                    var mins = ('0' + date.getMinutes()).slice(-2);
                    time = String(hours + ':' + mins);
                  } else if (
                    diffMinutes < 60 * 24 * 2 &&
                    now.getDate() - date.getDate() === 1
                  ) {
                    hours = date.getHours();
                    mins = ('0' + date.getMinutes()).slice(-2);
                    time = String('вчера в ' + hours + ':' + mins);
                  } else {
                    hours = date.getHours();
                    mins = ('0' + date.getMinutes()).slice(-2);
                    var day = date.getDate();
                    var m = date.getMonth() + 1;
                    var y = date.getFullYear();
                    time = String(
                      hours + ':' + mins + ' ' + day + '.' + m + '.' + y
                    );
                  }

                  return (
                    <p className="list-group-item">
                      <i className="fa fa-edit fa-fw" />{' '}
                      {ReactHtmlParser(event.text)}
                      <span className="pull-right text-muted small">
                        <em>{time}</em>
                      </span>
                    </p>
                  );
                })}
              </div>
              <a
                href="../../admin/notifications"
                className="btn btn-default btn-block"
              >
                Все уведомления
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(History)
);
