import { User as FirebaseAuthUser } from "@firebase/auth-types";
import "@nuxtjs/axios/types";
import { Store } from "vuex";

type AuthPlugin = { user: FirebaseAuthUser | null; loading: boolean };

declare module "vuex/types/index" {
  interface Store<S> {
    $auth: AuthPlugin;
  }
}

declare module "@nuxt/vue-app" {
  interface Context {
    $auth: AuthPlugin;
  }
  interface NuxtAppOptions {
    $auth: AuthPlugin;
  }
}

// Nuxt 2.9+
declare module "@nuxt/types" {
  interface Context {
    $auth: AuthPlugin;
  }
  interface NuxtAppOptions {
    $auth: AuthPlugin;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $auth: AuthPlugin;
  }
}

declare module "vuex-module-decorators/dist/types" {
  interface VuexModule<S> {
    store: Store<S>;
  }
}
