import Stripe from "stripe";
import interfaces from "./stripeInterface";

// /customers/{uid}/
export type CustomerDoc = {
  email: string;
  stripeId: string;
  stripeLink: string;
};

// /customers/{uid}/checkout_sessions/{id}
export type CheckoutSessionDoc = {
  mode?: "subscription" | "payment" | string; // default: 'subscription'
  price?: string;
  success_url: string;
  cancel_url: string;
  quantity?: number; // default: 1
  payment_method_types?: Stripe.Checkout.SessionCreateParams.PaymentMethodType[]; // default: ['card']
  metadata?: Stripe.Checkout.SessionCreateParams.SubscriptionData; // default: {}
  tax_rates?: Array<string>; // default: []
  allow_promotion_codes?: boolean; // default: false
  trial_from_plan?: boolean; // default: true
  line_items?: Stripe.Checkout.SessionCreateParams.LineItem[];
  billing_address_collection?: Stripe.Checkout.SessionCreateParams.BillingAddressCollection; // default: 'required',
  collect_shipping_address?: boolean; // default: false,
  locale?: Stripe.Checkout.SessionCreateParams.Locale; // default: 'auto',
  promotion_code?: string;
  client_reference_id?: string;
  sessionId?: string;
  error?: {
    message: string;
  };
};

// /customers/{uid}/subscriptions/{id}
export type SubscriptionDoc = interfaces.Subscription;

// /customers/{uid}/payments/{id}
export type PaymentDoc = Stripe.PaymentIntent;

// /customers/{uid}/subscriptions/{id}/invoices/{id}
// /customers/{uid}/payments/{id}/invoices/{id}
export type InvoiceDoc = Stripe.Invoice;

// /products/{id}
export type ProductDoc = interfaces.Product;

// /products/{id}/prices/{id}
export type PriceDoc = interfaces.Price;

// /products/tax_rates/tax_rates/{id}
export type TaxRateDoc = interfaces.TaxRate;
