import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authService } from '../../services/authService';

// Used to redirect to login page when not connected
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
);

export default PrivateRoute