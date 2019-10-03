# 8base app with Firebase authorization

## Set up

```
# Install dependencies
yarn install

# Start development server
yarn run start
```

## Important concepts

This application relies on the *AppProvider* component available in the `8base-react-sdk` npm package. The *AppProvider* accepts an *authClient* and *uri* property, from which it is able to handle in app authentication flows. 

### URI
`uri` is simply the endpoint of an 8base workspace. 

### authClient (`openid-app/src/authClient.js`)

The `authClient` is a JavaScript class that encapsulates authentication and authorization logic. Each function handles a discrete respensibility for managing requirements of the auth lifecycle.

*Note: The following functions are controlled fully by the front-end developer. The choice of whether to use the AppProvider is completely up to them. Authentication and authorization can still be implimented using custom logic and components.*

##### login
This function gets id token from firebase api. 
```javascript
login(email, password) {
  return this.firebaseAuth.signInWithEmailAndPassword(
    email,
    password,
  )
    .then(() => this.firebaseAuth.currentUser.getIdToken())
    .then((token) => {
      // document.location = `${document.location.origin}/auth?token=${token}`;
      return token;
    });
}
```

##### getState
Fetches the current auth state from the browsers `localStorage` object.

##### setState
Updates the auth state in `localStorage` by merging it with an updated auth payload. 

##### purgeState
Delete auth state persisted in local storage while optionally forcing logout redirect.

##### logout
Reloads application at root path and clears storage.

##### checkIsAuthorized
Determines whether the current user is authorized based the existence of a token in `localStorage`.

