import { StorageAPI } from '@8base/utils';

export const AUTH_PROFILE_ID = 'ck1avlbrg001w01jmgds1370t';

const AUTH_LOCALSTORAGE_KEY = 'auth';

export class FirebaseAuthClient {
  constructor(firebase) {
    this.storageAPI = new StorageAPI(window.localStorage, AUTH_LOCALSTORAGE_KEY);
    this.firebaseAuth = firebase.auth();
  }

  setState(state) {
    this.storageAPI.setState(state);
  }

  getState() {
    return this.storageAPI.getState();
  }

  purgeState() {
    this.storageAPI.purgeState();
  }

  checkIsAuthorized() {
    const { token } = this.getState();

    return token !== '' && token !== null && token !== undefined;
  }

  login(email, password) {
    return this.firebaseAuth.signInWithEmailAndPassword(
      email,
      password,
    )
      .then(() => this.firebaseAuth.currentUser.getIdToken())
      .then((token) => {
        return token;
      });
  }

  logout(options: object = {}): void {
    window.addEventListener('unload', () => {
      this.purgeState();
    });

    window.location.href = '/';
  }
}

