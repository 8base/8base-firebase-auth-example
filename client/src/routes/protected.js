import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    user {
      id
      email
    }
  }
`;

export const Protected = () => (
  <Query query={ CURRENT_USER_QUERY }>
    { ({ loading, data }) => {
      if (loading) {
        return <div>Loading...</div>
      }

      return (
        <div>
          Protected route, your email: {data && data.user && data.user.email}!
        </div>
      );
    } }
  </Query>
);
