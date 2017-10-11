import React, { Component } from 'react';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
class Header extends Component {
    signOut() {
        window.localStorage.removeItem('currentUser');
        browserHistory.replace('/signin');
    }
    render(){
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
