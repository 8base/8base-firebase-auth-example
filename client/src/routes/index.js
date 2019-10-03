import React, { useContext } from 'react';
import { Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import { withAuth, AuthContext } from '8base-react-sdk';
import { compose } from 'react-apollo';

import { ProtectedRoute } from '../ProtectedRoute';
import { Auth } from './auth';
import { Public } from './public';
import { Protected } from './protected';

let Routes = ({ auth, history }) => {
  const { isAuthorized } = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route>
        <Link to="/public">Public</Link>
        { isAuthorized && <Link to="/protected">Protected</Link> }
        {
          isAuthorized
          ?
          <button type="button" onClick={() => auth.authClient.logout()}>Logout</button>
          :
          <button type="button" onClick={() => history.push('/auth')}>Login</button>
        }
        <Switch>
          <Route path="/public" component={Public} />
          <ProtectedRoute path="/protected" component={Protected} />
          <Redirect to="/public" />
        </Switch>
      </Route>
    </Switch>
  );
};

Routes = compose(withAuth, withRouter)(Routes);

export { Routes };
