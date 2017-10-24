import React, { Component } from 'react';

class Footer extends Component {

    render(){
        return(
            <div className="footer-v1">
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 md-margin-bottom-40">
                                <a href="index.html"><img id="logo-footer" className="footer-logo" src="http://www.csquareonline.com/wp-content/themes/creative_v5/images/logo.svg" alt="" /></a>
                                <p>About Unify dolor sit amet, consectetur adipiscing elit. Maecenas eget nisl id libero tincidunt sodales.</p>
                                <p>Duis eleifend fermentum ante ut aliquam. Cras mi risus, dignissim sed adipiscing ut, placerat non arcu.</p>
                            </div>
                            <div className="col-md-3 md-margin-bottom-40">
                                <div className="posts">
                                    <div className="headline"><h2>Latest Posts</h2></div>
                                    <ul className="list-unstyled latest-list">
                                        <li>
                                            <a href="#">Incredible content</a>
                                            <small>May 8, 2014</small>
                                        </li>
                                        <li>
                                            <a href="#">Best shoots</a>
                                            <small>June 23, 2014</small>
                                        </li>
                                        <li>
                                            <a href="#">New Terms and Conditions</a>
                                            <small>September 15, 2014</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 md-margin-bottom-40">
                                <div className="headline"><h2>Useful Links</h2></div>
                                <ul className="list-unstyled link-list">
                                    <li><a href="#">About us</a><i className="fa fa-angle-right"></i></li>
                                    <li><a href="#">Portfolio</a><i className="fa fa-angle-right"></i></li>
                                    <li><a href="#">Latest jobs</a><i className="fa fa-angle-right"></i></li>
                                    <li><a href="#">Community</a><i className="fa fa-angle-right"></i></li>
                                    <li><a href="#">Contact us</a><i className="fa fa-angle-right"></i></li>
                                </ul>
                            </div>
                            <div className="col-md-3 map-img md-margin-bottom-40">
                                <div className="headline"><h2>Contact Us</h2></div>
                                <address className="md-margin-bottom-40">
                                    25, Lorem Lis Street, Orange <br />
                                    California, US <br />
                                    Phone: 800 123 3456 <br />
                                    Fax: 800 123 3456 <br />
                                    Email: <a href="mailto:info@anybiz.com" className="">info@anybiz.com</a>
                                </address>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <p>
                                    2015 &copy; All Rights Reserved.
                                    <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
                                </p>
                            </div>

                            {/*<!-- Social Links -->*/}
                            <div className="col-md-6">
                                <ul className="footer-socials list-inline">
                                    <li>
                                        <a href="#" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Skype">
                                            <i className="fa fa-skype"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Google Plus">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Linkedin">
                                            <i className="fa fa-linkedin"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Pinterest">
                                            <i className="fa fa-pinterest"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="Dribbble">
                                            <i className="fa fa-dribbble"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/*<!-- End Social Links -->*/}
                        </div>
                    </div>
                </div>
                {/*<!--/copyright-->*/}
            </div>
            )
    }
}

export default Footer;