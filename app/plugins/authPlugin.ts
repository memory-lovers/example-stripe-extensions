import { Plugin } from "@nuxt/types";
import Vue from "vue";
import { auth } from "~/plugins/firebase";

const _auth: { _vm?: Vue; __defineGetter__?: any } = {};

if (!_auth._vm) {
  _auth._vm = new Vue({
    data() {
      const user = auth.currentUser !== null ? auth.currentUser : null;
      console.info(`** _auth._vm.data: `, user);
      return {
        currentUser: user,
        loading: true
      };
    },
    created() {
      console.info(`** _auth._vm.created`);
      this.loading = true;
      auth.onAuthStateChanged(user => {
        console.info(`** onAuthStateChanged:`, user);
        this.loading = false;
        this.currentUser = user || null;
      });
    }
  });
  _auth.__defineGetter__("user", () => _auth._vm?.$data.currentUser || null);
  _auth.__defineGetter__("loading", () => _auth._vm?.$data.loading || false);
}

const FirebasePlugin: Plugin = (_context, inject) => {
  inject("auth", _auth);
};

export default FirebasePlugin;
