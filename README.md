# Example Stripe Extensions

Example for Run Subscription Payments with Stripe in Firebase Extenstions.

- [Firebase Extensions | Run Subscription Payments with Stripe](https://firebase.google.com/products/extensions/firestore-stripe-subscriptions?hl=ja)

In this example you can try the following:

- Purchase products registered in Stripe
- Dispay purchased subscription and Custom Claim in Firebase Auth

## Setup Firebase Config / Stripe Public API Key

Please input your Firebase Config and Stripe Public API Key in nuxt.config.ts

```javascript
const config: NuxtConfig = {
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
  }
};
```

## Licence

[MIT](https://github.com/memory-lovers/example-stripe-extensions/blob/master/LICENSE)

## Author

Memory Lovers ([GitHub](https://github.com/memory-lovers) / [WebSite](https://memory-lovers.com/) / [Twitter](https://twitter.com/MemoryLoverz))
