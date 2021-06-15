<template>
  <div class="container">
    <h1 class="page-title mb-6">プラン</h1>

    <div class="product-items">
      <template v-for="(item, index) in productItems">
        <div class="product-item" :key="index">
          <div class="has-text-weight-bold mb-3">{{ item.product.name }}</div>
          <template v-for="(price, priceIndex) in item.prices">
            <div
              class="product-item-price"
              :key="`price_${priceIndex}`"
              :data-priceId="priceIndex"
            >
              <div>価格: {{ price.unit_amount }}円</div>
              <b-button
                type="is-accent"
                size="is-small"
                rounded
                outlined
                :loading="loadingBuy"
                @click="onClickBuy(priceIndex)"
                >購入する
              </b-button>
            </div>
          </template>
        </div>
      </template>
    </div>

    <b-loading :active="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { ProductItem, productUseCase } from "~/src/ProductUseCase";

@Component({ middleware: ["authed"] })
export default class PlanPage extends Vue {
  private productItems: ProductItem[] = [];
  private loading: boolean = true;
  private loadingBuy: boolean = false;

  mounted() {
    this.$nextTick(() => this.fetchProducts().then());
  }
  // ****************************************************
  // * computed
  // ****************************************************
  // ****************************************************
  // * methods
  // ****************************************************
  private async fetchProducts() {
    try {
      this.loading = true;
      this.productItems = await productUseCase.fetchAll();
    } finally {
      this.loading = false;
    }
  }

  private async onClickBuy(priceId: string) {
    try {
      this.loadingBuy = true;
      const uid = this.$auth.user?.uid;
      if (!uid) return;
      const url = window.location.origin;
      await productUseCase.buy(uid, priceId, url);
    } catch (error) {
      alert(`Error: ${!!error.message ? error.message : error}`);
    } finally {
      this.loadingBuy = false;
    }
  }
  // ****************************************************
  // * emit
  // ****************************************************
}
</script>

<style lang="scss" scoped>
.product-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  column-gap: 1rem;
}

.product-item {
  border: 1px solid rgba($grey, 0.4);
  padding: 0.5rem;
}

.product-item-price {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
}
</style>