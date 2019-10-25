import React, { useState } from 'react';
import { withAuth } from '8base-react-sdk';
import { withApollo, compose } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';

import { AUTH_PROFILE_ID } from '../authClient';

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    user {
      id
      email
    }
  }
`;

const USER_SIGN_UP_MUTATION = gql`
  mutation UserSignUp($user: UserCreateInput!, $authProfileId: ID) {
    userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
      id
      email
    }
  }
`;

let Auth = ({ auth, client }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logging, setLogging] = useState(false);

  const login = async (email, password) => {
    const token = await auth.authClient.login(email, password);

    const context = { headers: { authorization: `Bearer ${token}` } };

    await client.query({
      query: CURRENT_USER_QUERY,
      context,
    })
      .catch(() => client.mutate({
        mutation: USER_SIGN_UP_MUTATION,
        variables: {
          user: { email },
          authProfileId: AUTH_PROFILE_ID,
        },
        context,
      }));

    await auth.authClient.setState({
      token,
      email,
    });
  };

  const handleSubmit = (e) => {
    login(email, password);
    setLogging(true);

    e.preventDefault();
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  if (auth.isAuthorized) {
    return <Redirect to="/protected" />;
  }

  if (logging) {
    return <div>Logging in...</div>
  }

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <label>
          Email:
          <input value={ email } onChange={ handleChangeEmail } type="email" />
        </label>
        <label>
          Password:
          <input value={ password } onChange={ handleChangePassword } type="password" />
        </label>
        <button>
          Login
        </button>
      </form>
    </div>
  );
};

Auth = compose(withApollo, withAuth)(Auth);

export { Auth };
