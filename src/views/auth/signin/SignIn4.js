import React from "react";
import { NavLink } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import lock from '../../../assets/images/user/lock.png';
import DataFILogo from '../../../assets/images/Data FI Logo.png';
import USAIDLogo from '../../../assets/images/USAID_Logo.png';

import JWTLogin from './JWTLogin';
import FirebaseLogin from './FirebaseLogin';

const Signin4 = () => {
    return (
        <React.Fragment>
            <Breadcrumb/>
            <div className="auth-wrapper">
                <div className="auth-content subscribe">
                    <div className="card">
                        <div className="row no-gutters">
                            <div className="col-md-4 col-lg-6 d-none d-md-flex d-lg-flex theme-bg align-items-center justify-content-center">
                                <img src={lock} alt="lock images" className="img-fluid" />
                            </div>
                            <div className="col-md-8 col-lg-6">
                                <div className="card-body text-center">
                                    <div className="row justify-content-center">
                                        <div className="col-sm-10">
                                            <h3 className="mb-4">Login to the LAMIS Portal</h3>
                                            <JWTLogin />
                                            {/*<div className="input-group mb-3">
                                                <input type="email" className="form-control" autoComplete="new-password" placeholder="Email"/>
                                            </div>
                                            <div className="input-group mb-4">
                                                <input type="password" className="form-control" autoComplete="new-password" placeholder="password"/>
                                            </div>
                                            <div className="form-group text-left">
                                                <div className="checkbox checkbox-fill d-inline">
                                                    <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                                        <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                                </div>
                                            </div>
                                            <button className="btn btn-primary shadow-2 mb-4">Login</button>*/}
                                            {/*<p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-4">Reset</NavLink></p>
                                            <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-4">Signup</NavLink></p>*/}
                                        </div>
                                        <div className="col-sm-10">
                                            <div className="column">
                                                <img src={USAIDLogo} />
                                            </div>
                                            <div className="column">
                                                <img src={DataFILogo} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Signin4;
