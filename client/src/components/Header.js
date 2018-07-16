import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">{this.props.page}</h1>
        </div>
      </div>
    );
  }
}

export default Header;
