import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import ReactLoading from 'react-loading';
import ReactHtmlParser from 'react-html-parser';
import { ScriptInjector } from '../utils/scriptInjector';
import { instance } from '../utils/axiosConf';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class PageLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: {},
      loaded: false,
      name: '',
      email: '',
      message: '',
      color: 'red',
      success: 'none',
      form: 'block'
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {});
  }

  onSubmit(e) {
    e.preventDefault();

    const instanceB = axios.create({
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    instanceB
      .post(
        'https://script.google.com/macros/s/AKfycbzTpALEOLNTTA4gBKChuxgCSzeyV6TRYsmawag3t97D0p_d6iLj/exec',
        {
          name: this.state.name,
          email: this.state.email,
          color: this.state.color,
          message: this.state.message
        }
      )
      .then(res => {
        this.setState({ success: 'display', form: 'none' });
      });
  }

  componentWillMount() {
    var ll = 'ru';
    if (this.props.lang) ll = this.props.lang;
    instance({
      method: 'get',
      url: '/lang?lang=' + ll,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        //console.log('Res: ' + JSON.stringify(res));
        ScriptInjector();
        this.setState({ loaded: true, lang: res.data.data });

        //console.log('State: ' + JSON.stringify(this.state.lang));
      })
      .catch(err => {
        throw err;
      });

    instance.get('/update');
  }

  render() {
    if (this.state.loaded) {
      //console.log('State: ' + JSON.stringify(this.state.lang));
      return (
        <div
          style={{
            height: '100%',
            width: '100%',
            position: 'relative',
            fontSize: '15px',
            color: '#333333',
            backgroundColor: '#0000'
          }}
        >
          <MetaTags>
            <title>{this.state.lang.fields.html_title}</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta name="yandex-verification" content="1f99fa0fe11f2ce4" />
            <link rel="shortcut icon" href="images/favicon.ico" />
            <link
              href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700,300&amp;subset=latin,latin-ext"
              rel="stylesheet"
              type="text/css"
            />
            <link
              href="http://fonts.googleapis.com/css?family=Raleway:700,400,300"
              rel="stylesheet"
              type="text/css"
            />
            <link href="bootstrap/css/bootstrap.css" rel="stylesheet" />
            <link
              rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
              integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
              crossOrigin="anonymous"
            />
            <link href="css/animations.css" rel="stylesheet" />
            <link href="css/style.css" rel="stylesheet" />
            <link href="css/jquery.lightbox.css" rel="stylesheet" />
            <link rel="stylesheet" type="text/css" href="slick/slick.css" />
            <link
              rel="stylesheet"
              type="text/css"
              href="slick/slick-theme.css"
            />
            <link href="css/custom.css" rel="stylesheet" />
          </MetaTags>
          <video autoPlay muted loop id="myVideo">
            <source src="video/webbg.mp4" type="video/mp4" />
          </video>
          <div className="scrollToTop">
            <i className="icon-up-open-big" />
          </div>

          {/* <!-- header start -->
        <!-- ================ -->*/}
          <header className="header fixed clearfix navbar navbar-fixed-top">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  {/*<!-- header-left start -->
                <!-- ================ -->*/}
                  <div className="header-left clearfix">
                    {/*<!-- logo -->*/}
                    <div className="logo smooth-scroll">
                      <a href="#banner">
                        <img
                          id="logo"
                          src="images/logo.png"
                          alt=""
                          style={{ height: '60px' }}
                        />
                      </a>
                    </div>

                    {/*<!-- name-and-slogan -->*/}
                    <div className="site-name-and-slogan smooth-scroll">
                      <p className="lang_select">
                        <a href="../kz">қаз</a> |
                        <a href="../ru">рус</a> |
                        <a href="../en">eng</a>
                      </p>
                    </div>
                  </div>
                  {/*<!-- header-left end -->*/}
                </div>
                <div className="col-md-8">
                  {/*<!-- header-right start -->
                <!-- ================ -->*/}
                  <div className="header-right clearfix">
                    {/*<!-- main-navigation start -->
                  <!-- ================ -->*/}
                    <div className="main-navigation animated">
                      {/*<!-- navbar start -->
                    <!-- ================ -->*/}
                      <div className="navbar navbar-default" role="navigation">
                        <div className="container-fluid">
                          {/*<!-- Toggle get grouped for better mobile display -->*/}
                          <div className="navbar-header">
                            <button
                              type="button"
                              className="navbar-toggle"
                              data-toggle="collapse"
                              data-target="#navbar-collapse-1"
                            >
                              <span className="sr-only">Toggle navigation</span>
                              <span className="icon-bar" />
                              <span className="icon-bar" />
                              <span className="icon-bar" />
                            </button>
                          </div>

                          {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
                          <div
                            className="collapse navbar-collapse scrollspy smooth-scroll"
                            id="navbar-collapse-1"
                          >
                            <ul className="nav navbar-nav navbar-right">
                              <li className="active">
                                <a href="#banner">
                                  {this.state.lang.fields.menu.main}
                                </a>
                              </li>
                              <li>
                                <a href="#about">
                                  {this.state.lang.fields.menu.about}
                                </a>
                              </li>
                              <li>
                                <a href="#services">
                                  {this.state.lang.fields.menu.services}
                                </a>
                              </li>
                              <li>
                                <a href="#partners">
                                  {this.state.lang.fields.menu.feedback}
                                </a>
                              </li>
                              <li>
                                <a href="#contact">
                                  {this.state.lang.fields.menu.contacts}
                                </a>
                              </li>
                              <li>
                                <a
                                  className="login-button"
                                  href="http://mail.allem.kz"
                                >
                                  {this.state.lang.fields.sign_in}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/*<!-- navbar end -->*/}
                    </div>
                    {/*<!-- main-navigation end -->*/}
                  </div>
                  {/*<!-- header-right end -->*/}
                </div>
              </div>
            </div>
          </header>
          {/*<!-- header end -->*/}

          {/*<!-- banner start -->
        <!-- ================ -->*/}
          <div id="banner" className="banner">
            <div className="banner-image" />
            <div className="banner-caption">
              <div className="container">
                <div className="row">
                  <div
                    className="col-md-8 col-md-offset-2 object-non-visible"
                    data-animation-effect="fadeIn"
                  >
                    <h1 className="text-center">
                      {ReactHtmlParser(this.state.lang.fields.main_header)}
                    </h1>
                    <p className="lead text-center">
                      {ReactHtmlParser(this.state.lang.fields.main_header_sub)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- banner end -->

        <!-- section start -->
        <!-- ================ -->*/}
          <div
            className="section clearfix object-non-visible"
            data-animation-effect="fadeIn"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 id="about" className="title text-center">
                    {this.state.lang.fields.about_header}
                  </h1>
                  <p className="lead text-center">
                    {this.state.lang.fields.about_header_sub}
                  </p>
                  <div className="space" />
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        className="section-image"
                        src="images/section-image-1.png"
                        alt=""
                      />
                      <div className="space" />
                    </div>
                    <div className="col-md-6">
                      <p>{this.state.lang.fields.about_text_1}</p>
                      <p>{this.state.lang.fields.about_list_header}</p>
                      <ul className="list-unstyled">
                        <li>
                          <i className="fa fa-caret-right pr-10 text-colored" />{' '}
                          {ReactHtmlParser(
                            this.state.lang.fields.about_list.item_1
                          )}
                        </li>
                        <li>
                          <i className="fa fa-caret-right pr-10 text-colored" />{' '}
                          {ReactHtmlParser(
                            this.state.lang.fields.about_list.item_2
                          )}
                        </li>
                        <li>
                          <i className="fa fa-caret-right pr-10 text-colored" />{' '}
                          {ReactHtmlParser(
                            this.state.lang.fields.about_list.item_3
                          )}
                        </li>
                        <li>
                          <i className="fa fa-caret-right pr-10 text-colored" />{' '}
                          {ReactHtmlParser(
                            this.state.lang.fields.about_list.item_4
                          )}
                        </li>
                        <li>
                          <i className="fa fa-caret-right pr-10 text-colored" />{' '}
                          {ReactHtmlParser(
                            this.state.lang.fields.about_list.item_5
                          )}
                        </li>
                        <li>
                          <i className="fa fa-caret-right pr-10 text-colored" />{' '}
                          {ReactHtmlParser(
                            this.state.lang.fields.about_list.item_6
                          )}
                        </li>
                        <li>
                          <i className="fa fa-caret-right pr-10 text-colored" />{' '}
                          {ReactHtmlParser(
                            this.state.lang.fields.about_list.item_7
                          )}
                        </li>
                        <li>
                          <i className="fa fa-caret-right pr-10 text-colored" />{' '}
                          {ReactHtmlParser(
                            this.state.lang.fields.about_list.item_8
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="space" />
                  <div className="row">
                    <div className="col-md-6">
                      <h2>{this.state.lang.fields.about_text_2_header}</h2>
                      <p>{this.state.lang.fields.about_text_2}</p>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="panel-group"
                        id="accordion"
                        role="tablist"
                        aria-multiselectable="true"
                      >
                        <div className="panel panel-default">
                          <div
                            className="panel-heading"
                            role="tab"
                            id="headingOne"
                          >
                            <h4 className="panel-title">
                              <a
                                data-toggle="collapse"
                                data-parent="#accordion"
                                href="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                {this.state.lang.fields.about_qestion_1}
                              </a>
                            </h4>
                          </div>
                          <div
                            id="collapseOne"
                            className="panel-collapse collapse in"
                            role="tabpanel"
                            aria-labelledby="headingOne"
                          >
                            <div className="panel-body">
                              {this.state.lang.fields.about_answer_1}
                            </div>
                          </div>
                        </div>
                        <div className="panel panel-default">
                          <div
                            className="panel-heading"
                            role="tab"
                            id="headingTwo"
                          >
                            <h4 className="panel-title">
                              <a
                                className="collapsed"
                                data-toggle="collapse"
                                data-parent="#accordion"
                                href="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                {this.state.lang.fields.about_qestion_2}
                              </a>
                            </h4>
                          </div>
                          <div
                            id="collapseTwo"
                            className="panel-collapse collapse"
                            role="tabpanel"
                            aria-labelledby="headingTwo"
                          >
                            <div className="panel-body">
                              {ReactHtmlParser(
                                this.state.lang.fields.about_answer_2
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="panel panel-default">
                          <div
                            className="panel-heading"
                            role="tab"
                            id="headingThree"
                          >
                            <h4 className="panel-title">
                              <a
                                className="collapsed"
                                data-toggle="collapse"
                                data-parent="#accordion"
                                href="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                {this.state.lang.fields.about_qestion_3}
                              </a>
                            </h4>
                          </div>
                          <div
                            id="collapseThree"
                            className="panel-collapse collapse"
                            role="tabpanel"
                            aria-labelledby="headingThree"
                          >
                            <div className="panel-body">
                              {this.state.lang.fields.about_answer_3}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- section end -->

        <!-- section start -->
        <!-- ================ -->*/}
          <div className="section translucent-bg bg-image-1 blue">
            <div
              className="container object-non-visible"
              data-animation-effect="fadeIn"
            >
              <h1 id="services" className="text-center title">
                {ReactHtmlParser(this.state.lang.fields.services_header)}
              </h1>
              <div className="space" />
              <div className="row">
                <div className="col-sm-6">
                  <div className="media" id="slabotok">
                    <div className="media-body text-right">
                      <h4 className="media-heading">
                        {ReactHtmlParser(
                          this.state.lang.fields.services_1_header
                        )}
                      </h4>
                      <p>
                        {ReactHtmlParser(this.state.lang.fields.services_1)}
                      </p>
                      <a className="more_service" href="#contact">
                        {this.state.lang.fields.order_service}
                      </a>
                    </div>
                    <div className="media-right">
                      <i className="fa fa-desktop" />
                    </div>
                  </div>
                  <div className="media" id="kipia">
                    <div className="media-body text-right">
                      <h4 className="media-heading">
                        {ReactHtmlParser(
                          this.state.lang.fields.services_2_header
                        )}
                      </h4>
                      <p>
                        {ReactHtmlParser(this.state.lang.fields.services_2)}
                      </p>
                      <a className="more_service" href="#contact">
                        {this.state.lang.fields.order_service}
                      </a>
                    </div>
                    <div className="media-right">
                      <i className="fa fa-sitemap" />
                    </div>
                  </div>
                  <div className="media" id="remont">
                    <div className="media-body text-right">
                      <h4 className="media-heading">
                        {ReactHtmlParser(
                          this.state.lang.fields.services_3_header
                        )}
                      </h4>
                      <p>
                        {ReactHtmlParser(this.state.lang.fields.services_3)}
                      </p>
                      <a className="more_service" href="#contact">
                        {this.state.lang.fields.order_service}
                      </a>
                    </div>
                    <div className="media-right">
                      <i className="fa fa-cogs" />
                    </div>
                  </div>
                  <div className="media" id="cleaning">
                    <div className="media-body text-right">
                      <h4 className="media-heading">
                        {ReactHtmlParser(
                          this.state.lang.fields.services_4_header
                        )}
                      </h4>
                      <p>
                        {ReactHtmlParser(this.state.lang.fields.services_4)}
                      </p>
                      <a className="more_service" href="#contact">
                        {this.state.lang.fields.order_service}
                      </a>
                    </div>
                    <div className="media-right">
                      <i className="fa fa-paint-brush" />
                    </div>
                  </div>
                </div>
                <div className="space visible-xs" />
                <div className="col-sm-6">
                  <div className="media" id="esystem">
                    <div className="media-left">
                      <i className="fa fa-plug" />
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">
                        {ReactHtmlParser(
                          this.state.lang.fields.services_6_header
                        )}
                      </h4>
                      <p>
                        {ReactHtmlParser(this.state.lang.fields.services_6)}
                      </p>
                      <a className="more_service" href="#contact">
                        {this.state.lang.fields.order_service}
                      </a>
                    </div>
                  </div>
                  <div className="media" id="energy">
                    <div className="media-left">
                      <i className="fa fa-bolt" />
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">
                        {ReactHtmlParser(
                          this.state.lang.fields.services_7_header
                        )}
                      </h4>
                      <p>
                        {ReactHtmlParser(this.state.lang.fields.services_7)}
                      </p>
                      <a className="more_service" href="#contact">
                        {this.state.lang.fields.order_service}
                      </a>
                    </div>
                  </div>
                  <div className="media" id="safety">
                    <div className="media-left">
                      <i className="fa fa-shield-alt" />
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">
                        {ReactHtmlParser(
                          this.state.lang.fields.services_8_header
                        )}
                      </h4>
                      <p>
                        {ReactHtmlParser(this.state.lang.fields.services_8)}
                      </p>
                      <a className="more_service" href="#contact">
                        {this.state.lang.fields.order_service}
                      </a>
                    </div>
                  </div>
                  <div className="media" id="finance">
                    <div className="media-body text-right">
                      <h4 className="media-heading">
                        {ReactHtmlParser(
                          this.state.lang.fields.services_5_header
                        )}
                      </h4>
                      <p>
                        {ReactHtmlParser(this.state.lang.fields.services_5)}
                      </p>
                      <a className="more_service" href="#contact">
                        {this.state.lang.fields.order_service}
                      </a>
                    </div>
                    <div className="media-right">
                      <i className="fa fa-paperclip" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- section end -->*/}

          <div className="section translucent-bg bg-image-2 pb-clear">
            <div
              className="container object-non-visible"
              data-animation-effect="fadeIn"
            >
              <h1 id="partners" className="text-center title">
                {this.state.lang.fields.feedback_header}
              </h1>
              <div className="space" />
              <div className="row">
                <div className="gallery">
                  <div>
                    <a href="/images/civil.jpg" title="Image 1">
                      <img alt="" src="/images/civil.jpg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*<!-- footer start -->
        <!-- ================ -->*/}
          <footer id="footer">
            {/*<!-- .footer start -->
          <!-- ================ -->*/}
            <div className="footer section">
              <div className="container">
                <h1 className="title text-center" id="contact">
                  {this.state.lang.fields.contact_header}
                </h1>
                <div className="space" />
                <div className="row">
                  <div className="col-sm-6">
                    <div className="footer-content">
                      <p className="large">
                        {this.state.lang.fields.contact_text}
                      </p>
                      <ul className="list-icons">
                        <li>
                          <i className="fa fa-building pr-10" />
                          {this.state.lang.fields.contact_company}
                        </li>
                        <li>
                          <i className="fa fa-map-marker pr-10" />
                          {this.state.lang.fields.contact_address}
                        </li>
                        <li>
                          <i className="fa fa-phone pr-10" />
                          {this.state.lang.fields.contact_phone}
                        </li>
                        <li>
                          <i className="fas fa-envelope-open pr-10" />
                          {this.state.lang.fields.contact_mail}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="footer-content">
                      <div
                        className="email-success"
                        style={{ display: this.state.success }}
                      >
                        <p>Сообщение принято.</p>
                      </div>
                      <form
                        style={{ display: this.state.form }}
                        role="form"
                        id="gform"
                        method="POST"
                        target="_self"
                        onSubmit={this.onSubmit}
                        action="https://script.google.com/macros/s/AKfycbzTpALEOLNTTA4gBKChuxgCSzeyV6TRYsmawag3t97D0p_d6iLj/exec"
                      >
                        <div className="form-group has-feedback">
                          <label className="sr-only" htmlFor="name2">
                            {this.state.lang.fields.message_name}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name2"
                            placeholder={this.state.lang.fields.message_name}
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            required
                          />
                          <i className="fa fa-user form-control-feedback" />
                        </div>
                        <div className="form-group has-feedback">
                          <label className="sr-only" htmlFor="email2">
                            {this.state.lang.fields.message_email}
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email2"
                            placeholder={this.state.lang.fields.message_email}
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            required
                          />
                          <i className="fa fa-envelope form-control-feedback" />
                        </div>
                        <div className="form-group has-feedback">
                          <label className="sr-only" htmlFor="message2">
                            {this.state.lang.fields.message_text}
                          </label>
                          <textarea
                            className="form-control"
                            rows="8"
                            id="message2"
                            placeholder={this.state.lang.fields.message_text}
                            name="message"
                            value={this.state.message}
                            onChange={this.onChange}
                            required
                          />
                          <i className="fa fa-pencil form-control-feedback" />
                        </div>
                        <input
                          type="text"
                          name="color"
                          value="red"
                          onChange={this.onChange}
                          style={{ display: 'none' }}
                        />
                        <input
                          type="submit"
                          value={this.state.lang.fields.message_send}
                          className="btn btn-default email-submit"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<!-- .footer end -->*/}

            {/*<!-- .subfooter start -->
          <!-- ================ -->*/}
            <div className="subfooter">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <p className="text-center">Copyright © 2018 ТОО "Allem"</p>
                  </div>
                </div>
              </div>
            </div>
            {/*<!-- .subfooter end -->*/}
          </footer>
          {/*  <!-- footer end -->

        <!-- JavaScript files placed at the end of the document so the pages load faster
        ================================================== -->
        <!-- Jquery and Bootstap core js files -->*/}
        </div>
      );
    }

    //Before fetch
    return (
      <div>
        <MetaTags>
          <title>Загрузка...</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="yandex-verification" content="1f99fa0fe11f2ce4" />
          <link rel="shortcut icon" href="images/favicon.ico" />
          <link
            href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700,300&amp;subset=latin,latin-ext"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="http://fonts.googleapis.com/css?family=Raleway:700,400,300"
            rel="stylesheet"
            type="text/css"
          />
          <link href="bootstrap/css/bootstrap.css" rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
            integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
            crossOrigin="anonymous"
          />
          <link href="css/animations.css" rel="stylesheet" />
          <link href="css/style.css" rel="stylesheet" />
          <link href="css/jquery.lightbox.css" rel="stylesheet" />
          <link rel="stylesheet" type="text/css" href="slick/slick.css" />
          <link rel="stylesheet" type="text/css" href="slick/slick-theme.css" />
          <link href="css/custom.css" rel="stylesheet" />
        </MetaTags>
        <div className="vertical-center col-centered col-md-1">
          <ReactLoading type="spin" color="#339BEB" height={100} width={100} />
        </div>
      </div>
    );
  }
}

export default withRouter(PageLanding);
