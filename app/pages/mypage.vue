<template>
  <div class="container">
    <h1 class="page-title">マイページ</h1>
    <div class="has-text-centered mt-6">
      <b-button size="is-medium" tag="nuxt-link" :to="{ name: 'plans' }"
        >購入ページへ
      </b-button>

      <b-button size="is-medium" tag="a" :href="url" :disabled="!url"
        >カスタマーポータルへ
      </b-button>
    </div>

    <div>
      <h2 class="page-subtitle mt-6 mb-4">カスタムクレーム</h2>
      <div>claim: {{ token }}</div>

      <h2 class="page-subtitle mt-6 mb-4">決済情報</h2>
      <template v-for="({ product, subscription, price }, index) in items">
        <div class="subscrition-item" :key="index">
          <div>
            <span>Product: </span>
            <span>{{ product.name }}</span>
            <span>({{ subscription.product.id }})</span>
          </div>
          <div>
            <span>Price: </span>
            <span>{{ price.unit_amount }}円 / {{ price.interval }}</span>
            <span>({{ subscription.price.id }})</span>
          </div>
          <div>
            <span>STATUS: </span>
            <span>{{ subscription.status }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { SubscriptionDoc } from "types";
import { productUseCase, SubscriptionItem } from "~/src/ProductUseCase";

@Component({ middleware: ["authed"] })
export default class MyPage extends Vue {
  private token: string = "";
  private items: SubscriptionItem[] = [];
  private url: string = "";
  private loading: boolean = false;

  async mounted() {
    try {
      this.loading = true;
      await this.fetchToken();
      this.getSubscription();
      await this.getCustomerURL();
    } finally {
      this.loading = false;
    }
  }
  // ****************************************************
  // * computed
  // ****************************************************

  // ****************************************************
  // * methods
  // ****************************************************
  private async fetchToken() {
    if (!this.$auth.user) {
      this.token = "no login";
    } else {
      const result = await this.$auth.user.getIdTokenResult(true);
      this.token = result.claims["stripeRole"] || "none";
    }
  }

  private getSubscription() {
    if (!this.$auth.user) return;
    const uid = this.$auth.user.uid;
    productUseCase.fetchSubscription(uid).onSnapshot(async (snapshot) => {
      snapshot.forEach((doc) => console.log(doc.id, " => ", doc.data()));
      this.items = await Promise.all(
        snapshot.docs.map(
          async (doc) =>
            await productUseCase.joinSubscription(doc.data() as SubscriptionDoc)
        )
      );
    });
  }

  private async getCustomerURL() {
    this.url = await productUseCase.getCustomerURL();
  }

  private toJson(v: any) {
    return JSON.stringify(v, null, 2);
  }
  // ****************************************************
  // * emit
  // ****************************************************
}
</script>

<style lang="scss" scoped>
.subscrition-item {
  box-shadow: 2px 2px 4px rgba($text-color, 0.5);
  background: hsl(0, 0%, 93%);
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem;
}
</style>