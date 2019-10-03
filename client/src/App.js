import React from 'react';
import { AppProvider } from '8base-react-sdk';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';
import { SubscribableDecorator } from '@8base/auth';

import { Routes } from './routes';
import { FirebaseAuthClient } from './authClient';

const API_ENDPOINT_URI = 'https://api.8base.com/ck1auj5kk00k101mqdfu55sg2';

var FIREBASE_CONFIGURATION = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

firebase.initializeApp(FIREBASE_CONFIGURATION);

const authClient = new FirebaseAuthClient(firebase);
const decoratedAuthClient = SubscribableDecorator.decorate(authClient);

const renderAppContent = ({ loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

const App = () => (
  <AppProvider uri={ API_ENDPOINT_URI } authClient={ decoratedAuthClient }>
    {renderAppContent}
  </AppProvider>
);

export { App };
