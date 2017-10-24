import React, { Component } from 'react';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backspaceRemoves: true,
            multi: true,
            creatable: false
        }
        this.logChange = this.logChange.bind(this);
    }
    signOut() {
        window.localStorage.removeItem('currentUser');
        browserHistory.replace('/signin');
    }
    logChange (value) {
        this.setState({
            value: value,
        });
    }
    switchToMulti () {
        this.setState({
            multi: true,
            value: [this.state.value],
        });
    }
    switchToSingle () {
        this.setState({
            multi: false,
            value: this.state.value ? this.state.value[0] : null
        });
    }
    getUsers (input) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }
        return fetch(`http://localhost:3001/users?search=${input}`, {
            headers: {
                'Content-Type': 'application/json','Authorization': window.localStorage.getItem('access_token')}
            })
            .then((response) => response.json())
            .then((json) => {
                return { options: json };
            });
    }

    gotoUser (value, event) {
        window.open(value.html_url);
    }
    toggleBackspaceRemoves () {
        this.setState({
            backspaceRemoves: !this.state.backspaceRemoves
        });
    }
    toggleCreatable () {
        this.setState({
            creatable: !this.state.creatable
        });
    }
    render(){
        const AsyncComponent = this.state.creatable
            ? Select.AsyncCreatable
            : Select.Async;
        return (
            <div className="header">
                <div className="container">
                    {/*<!-- Logo -->*/}
                    <a className="logo" href="http://www.csquareonline.com/">
                        <img src="http://www.csquareonline.com/wp-content/themes/creative_v5/images/logo.svg" alt="Logo" />
                    </a>
                    {/*<!-- End Logo -->*/}

                    {/*<!-- Topbar -->*/}
                    <div className="topbar">
                        <ul className="loginbar pull-right">
                            <li><a href="page_faq.html">Help</a></li>
                            <li className="topbar-devider"></li>
                            <li><a onClick={() => this.signOut()}>{this.props.current_user? 'Logout' : 'Login'}</a></li>
                            <li className="topbar-devider"></li>
                            {
                                this.props.current_user ?
                                    <span>
                                        <Link className="update-profile-link" to={"/update-profile"}>Profile</Link>
                                    </span>
                                : null

                            }
                        </ul>
                    </div>
                    {/*<!-- End Topbar -->*/}

                    {/*<!-- Toggle get grouped for better mobile display -->*/}
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="fa fa-bars"></span>
                    </button>
                    {/*<!-- End Toggle -->*/}
                </div>
                {/*<!--/end container-->*/}

                {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
                <div className="collapse navbar-collapse mega-menu navbar-responsive-collapse">
                    <div className="container">
                        <ul className="nav navbar-nav">
                            {/*<!-- Home -->*/}
                            <li className="dropdown">
                                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown">
                                    Home
                                </a>
                            </li>
                            <li>
                                <i className="search fa fa-search search-btn"></i>
                                <div className="search-open">
                                    <div className="animated fadeInDown">
                                        <AsyncComponent multi={this.state.multi} value={this.state.value} onChange={this.logChange} onValueClick={this.gotoUser} valueKey="id" labelKey="name" loadOptions={this.getUsers} backspaceRemoves={this.state.backspaceRemoves} />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/*<!--/end container-->*/}
                </div>
                {/*<!--/navbar-collapse-->*/}
            </div>
            // <!--=== End Header ===-->
            )
    }
}

export default Header;
