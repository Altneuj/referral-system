import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import logo from '../RS-logo-white.png';
import { bindActionCreators } from 'redux';
import {fetchUser, fetchAllOrgs, fetchTags} from '../actions'

class LoginHeader extends React.Component {
  render() {
    return <div></div>
  }
}

class OtherHeader extends React.Component {

  logOut = async() => {
    await axios.get(`/api/logout`);
    this.props.url.history.push('/')
  }

  render() {
    return (
      <div className="mb-h">
      <header className="mdc-top-app-bar mdc-top-app-bar--short app-nav-header ">
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <a href="/dashboard">
              <img className="shrine-logo-drawer ml-1" src={logo}/>
            </a>
          </section>
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end app-nav-header" role="toolbar">
            <a href="/my-org" className="mdc-top-app-bar__action-item action-margin">My Organization</a>

            <a onClick={this.logOut} className="mdc-top-app-bar__action-item action-margin">Logout</a>
          </section>
        </div>
      </header>
      </div>
    )
  }
}

class Header extends Component {

  componentDidMount = async() => {
    this.props.fetchTags()
    this.props.fetchAllOrgs()

    await this.props.fetchUser()
    if(!this.props.auth) {
      this.props.history.push('/')
    }}

  render() {
    return this.props.auth ? <OtherHeader url={this.props}/> : <LoginHeader />
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchUser, fetchAllOrgs, fetchTags}, dispatch)
  }

const mapStateToProps = ({auth}) => {
  return {auth};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
