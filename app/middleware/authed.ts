import { Middleware } from "@nuxt/types";

const authedMiddleware: Middleware = ({ route, redirect, $auth }) => {
  try {
    if (!$auth.user) {
      return redirect({ name: "index", query: { next: route.path } });
    }
  } catch (e) {
    console.error(`Error in authed: ${e}`, e);
  }
  return;
};

export default authedMiddleware;
