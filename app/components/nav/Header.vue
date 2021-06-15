<template>
  <nav
    class="navbar header is-primary is-mobile"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <span class="navbar-item has-text-weight-bold"
        >Example Stripe Extensions
      </span>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        @click="activeMenu = !activeMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': activeMenu }">
      <div class="navbar-end has-text-right">
        <div class="navbar-item" v-if="!!isLogin">
          <b-field>
            <p class="control">
              <b-button size="is-small" rounded outlined @click="onClickLogout"
                >ログアウト
              </b-button>
            </p>
          </b-field>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { authUseCase } from "~/src/AuthUseCase";

@Component
export default class Header extends Vue {
  private activeMenu: boolean = false;

  private get isLogin() {
    return !!this.$auth.user;
  }

  private async onClickLogout() {
    if (!this.$auth.user) return;
    await authUseCase.logout();
    this.$router.push({ name: "index" });
  }
}
</script>