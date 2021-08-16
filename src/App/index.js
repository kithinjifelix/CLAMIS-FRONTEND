import React, {Component, Suspense} from 'react';
import { connect } from "react-redux";
import {Redirect, Route, withRouter} from 'react-router-dom';
import { Switch } from 'react-router';
import Loadable from 'react-loadable';
import 'semantic-ui-css/semantic.min.css';

import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";

import { logout } from "../actions/auth";
import PrivateRoute from "./PrivateRoute";

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined
        };
    }

    componentDidMount() {
        const user = this.props.user;

        if (user) {
            this.setState({
                currentUser: user
            });
        }
    }

    logOut() {
        this.props.dispatch(logout());
    }

    render() {
        const menu = routes.map((route, index) => {
            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        <route.component {...props} />
                    )}/>
            ) : (null);
        });

        return (
            <Aux>
                <ScrollToTop>
                    <Suspense fallback={<Loader/>}>
                        <Switch>
                            {menu}
                            <PrivateRoute path="/" component={AdminLayout} {...this.props} />
                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Aux>
        );
    }
}

function mapStateToProps(state) {
    const { user, isLoggedIn } = state;
    return {
        user,
        isLoggedIn
    };
}

export default connect(mapStateToProps)(App);
