import { NuxtConfig } from "@nuxt/types";
import * as fs from "fs";

const SITE_NAME = "Example Stripe Extensions";
const SITE_DESC =
  "Example For Run Subscription Payments with Stripe in Firebase Extensions";
const COPYRIGHT = "Memory Lovers, LLC.";

const LOADING_COLOR = "#ff99a3";

const readdirRecursively = (dir: string, dirs: string[] = []) => {
  dirs.push(dir);
  fs.readdirSync(dir).forEach(file => {
    const dirPath = `${dir}/${file}`;
    if (fs.statSync(dirPath).isDirectory()) {
      readdirRecursively(dirPath, dirs);
    }
  });

  return dirs;
};

const components = readdirRecursively("./app/components").map(v =>
  v.replace("./app/components", "~/components")
);
console.info(`components=${JSON.stringify(components, null, 2)}`);

const config: NuxtConfig = {
  srcDir: "app",
  ssr: false,
  target: "server",
  components: components,

  env: {
    // Firebase Config
    API_KEY: "...",
    AUTH_DOMAIN: "...",
    PROJECT_ID: "...",
    STORAGE_BUCKET: "...",
    MESSAGING_SENDER_ID: "...",
    APP_ID: "...",

    // Stripe Public API Key
    STRIPE_API_KEY: "..."
  },

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/style-resources"],

  /*
   ** Headers of the page
   */
  head: {
    title: SITE_NAME,
    htmlAttrs: {
      lang: "ja"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: COPYRIGHT },
      { name: "copyright", content: COPYRIGHT },
      {
        name: "format-detection",
        content: "telephone=no,email=no,address=no"
      },

      // For SEO
      { hid: "description", name: "description", content: SITE_DESC },
      { name: "robots", content: "noindex" }
    ],
    link: [
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  loadingIndicator: {
    color: LOADING_COLOR,
    background: "white"
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/css/buefy.scss"],

  styleResources: {
    scss: ["~/assets/css/_colors.scss"]
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/authPlugin"],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    "nuxt-buefy"
  ],

  /*
   ** Router configuration
   */
  router: {
    middleware: [],
    linkExactActiveClass: "is-active"
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },

  /**
   * nuxt-buefy
   * Doc: https://github.com/buefy/nuxt-buefy
   * Doc: https://buefy.org/documentation/constructor-options
   */
  buefy: {
    css: false
  },

  /*
   ** Build configuration
   */
  build: {
    publicPath: "/assets/",
    extractCSS: true,

    terser: {
      terserOptions: {
        compress: { drop_console: process.env.NODE_ENV === "production" }
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  generate: {
    dir: "public",
    fallback: true // '404.html' を使用したい場合
  },

  server: {
    port: 3000, // デフォルト: 3000
    host: "localhost" // デフォルト: localhost
  }
};

export default config;
