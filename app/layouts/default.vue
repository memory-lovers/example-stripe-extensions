<template>
  <div class="main-container">
    <Header />

    <section class="main-content">
      <nuxt />
    </section>

    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss">
.main-container {
  min-height: 100vh;

  position: relative;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 1.5rem 0 3rem;
}
</style>