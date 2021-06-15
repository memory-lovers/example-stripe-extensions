<template>
  <footer class="footer is-fluid has-text-centered">
    <HrefLink
      href="https://memory-lovers.com"
      class="has-text-white has-underline"
    >
      <span>&copy; Memory Lovers, LLC.</span>
    </HrefLink>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Footer extends Vue {
  private fotterItems = [
    {
      title: "About Us",
      href: "https://memory-lovers.com",
    },
    {
      title: "Twitter",
      href: "https://twitter.com/MemoryLoverz",
    },
    {
      title: "GitHub",
      href: "https://github.com/memory-lovers/example-stripe-extensions",
    },
  ];
}
</script>

<style lang="scss">
.footer {
  padding-top: 0.2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.2rem;
}
</style>