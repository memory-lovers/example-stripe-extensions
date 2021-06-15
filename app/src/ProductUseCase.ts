import { loadStripe } from "@stripe/stripe-js";
import {
  CheckoutSessionDoc,
  PriceDoc,
  ProductDoc,
  SubscriptionDoc
} from "types";
import { firestore as db, functions } from "~/plugins/firebase";

export type ProductItem = {
  product: ProductDoc;
  prices: { [key: string]: PriceDoc };
};

export type SubscriptionItem = {
  subscription: SubscriptionDoc;
  product: ProductDoc;
  price: PriceDoc;
};

class ProductUseCase {
  // ****************************
  // * 参照
  // ****************************
  async fetchAll(): Promise<ProductItem[]> {
    // Productを取得
    const productQuery = db.collection("products").where("active", "==", true);
    const productSnapshot = await productQuery.get();

    return await Promise.all(
      productSnapshot.docs.map(async doc => {
        // ProductのPriceを取得
        const priceRef = doc.ref.collection("prices");
        const priceSnapshot = await priceRef.where("active", "==", true).get();
        const priceMap = priceSnapshot.docs.reduce((acc, v) => {
          acc[v.id] = v.data() as PriceDoc;
          return acc;
        }, {});

        const productItem: ProductItem = {
          product: doc.data() as ProductDoc,
          prices: priceMap
        };
        return productItem;
      })
    );
  }

  fetchSubscription(uid: string) {
    return db
      .collection("customers")
      .doc(uid)
      .collection("subscriptions")
      .where("status", "in", ["trialing", "active"]);
  }

  async joinSubscription(doc: SubscriptionDoc): Promise<SubscriptionItem> {
    const productDoc = (await doc.product.get()).data() as ProductDoc;
    const priceDoc = (await doc.price.get()).data() as PriceDoc;

    return {
      subscription: doc,
      product: productDoc,
      price: priceDoc
    };
  }

  // ****************************
  // * 更新
  // ****************************
  async buy(uid: string, priceId: string, url: string) {
    return new Promise(async (resolve, reject) => {
      const docRef = await db
        .collection("customers")
        .doc(uid)
        .collection("checkout_sessions")
        .add({
          price: priceId,
          success_url: url,
          cancel_url: url
        });

      docRef.onSnapshot(async snap => {
        const { error, sessionId } = snap.data() as CheckoutSessionDoc;
        if (error) return reject(error);

        if (!!sessionId) {
          const stripe = await loadStripe(process.env.STRIPE_API_KEY || "");
          if (!stripe) return reject();
          stripe.redirectToCheckout({ sessionId });
          return resolve(undefined);
        }
      });
    });
  }

  // ****************************
  // * function
  // ****************************
  async getCustomerURL() {
    const functionRef = functions.httpsCallable(
      "ext-firestore-stripe-subscriptions-createPortalLink"
    );
    const { data } = await functionRef({ returnUrl: window.location.origin });
    return data.url;
  }
}

export const productUseCase = new ProductUseCase();
