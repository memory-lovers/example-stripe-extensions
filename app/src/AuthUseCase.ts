import authState from "~/plugins/authState";
import firebase from "~/plugins/firebase";

export type AuthType = "twitter" | "google";
class AuthUseCase {
  private auth: firebase.auth.Auth;

  constructor() {
    this.auth = firebase.auth();
  }

  // ****************************
  // * LOGIN with redirect
  // ****************************
  async loginWithRedirect() {
    const providor = new firebase.auth.GoogleAuthProvider();
    await this.auth.signInWithRedirect(providor);
  }

  async logout() {
    const firebaseUser = await authState();
    if (!firebaseUser) return null;
    await this.auth.signOut();
  }

  // ****************************
  // * 更新
  // ****************************
}

export const authUseCase = new AuthUseCase();
