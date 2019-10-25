import React from 'react';
import { AppProvider } from '8base-react-sdk';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';
import { Auth, AUTH_STRATEGIES } from '@8base/auth';

import { Routes } from './routes';

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

const firebaseAuth = firebase.initializeApp(FIREBASE_CONFIGURATION).auth();

const authClient = Auth.createClient({
  strategy: AUTH_STRATEGIES.WEB_OAUTH,
  subscribable: true,
}, {
  authorize (email, password) {
    return firebaseAuth.signInWithEmailAndPassword(
      email,
      password,
    )
      .then(() => firebaseAuth.currentUser.getIdToken())
      .then((token) => {
        return token;
      })
  },
  logout() {
    window.addEventListener('unload', () => {
      this.purgeState();
    });

    window.location.href = '/';
  }
});

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
  <AppProvider uri={ API_ENDPOINT_URI } authClient={ authClient }>
    {renderAppContent}
  </AppProvider>
);

export { App };
