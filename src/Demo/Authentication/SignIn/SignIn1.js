import React, {useState} from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { connect } from "react-redux";
import {login} from "../../../actions/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

function SignUp1() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const onChangeUsername = (e) => {
        setUserName(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(login(username, password))
            .then(() => {
                history.push("/dashboard/default");
                // window.location.reload();
            })
            .catch(() => {
                this.setState({
                    loading: false
                });
            });
    }

    return (
        <Aux>
            <Breadcrumb/>
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r"/>
                        <span className="r s"/>
                        <span className="r s"/>
                        <span className="r"/>
                    </div>
                    <div className="card">
                        <form onSubmit={handleLogin}>
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email" value={username}
                                           onChange={onChangeUsername}
                                           validations={[required]} />
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="password" value={password}
                                           onChange={onChangePassword}
                                           validations={[required]} />
                                </div>
                                {/*<div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1"/>
                                        <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                    </div>
                                </div>*/}
                                <button className="btn btn-primary shadow-2 mb-4">Login</button>
                                {/*<p className="mb-2 text-muted">Forgot password? <NavLink
                                    to="/auth/reset-password-1">Reset</NavLink></p>
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink
                                    to="/auth/signup-1">Signup</NavLink></p>*/}
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </Aux>
    );
}

function mapStateToProps(state) {
    const { isLoggedIn } = state;
    return {
        isLoggedIn
    };
}

export default withRouter(connect(mapStateToProps)(SignUp1));
