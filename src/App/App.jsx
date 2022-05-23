import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { NewLoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
function App() {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="jumbotron2">

            {alert.message &&

                < Snackbar open={true} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}>
                    <Alert severity="error">{alert.message}</Alert>
                </Snackbar>

            }

            {
                alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history}>
                <Switch>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <Route path="/login" component={NewLoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </div >
    );
}

export { App };