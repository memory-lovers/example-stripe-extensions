<template>
  <div class="container">
    <h1 class="page-title">ログインページ</h1>

    <div class="has-text-centered mt-6">
      <b-button size="is-medium" :loading="isLoading" @click="onClickLogin"
        >ログイン
      </b-button>
    </div>

    <b-loading :active="loading" />
  </div>
</template>

<script lang="ts">
import { User as FirebaseAuthUser } from "@firebase/auth-types";
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { authUseCase } from "~/src/AuthUseCase";

@Component
export default class IndexPage extends Vue {
  private loading = false;

  private get isLoading() {
    return this.$auth.loading || this.loading;
  }

  private get isLogined() {
    return !!this.$auth.user;
  }

  private async onClickLogin() {
    if (!!this.isLoading) return;
    await authUseCase.loginWithRedirect();
  }

  @Watch("isLogined")
  private onChangeIsLogined(val: FirebaseAuthUser | null) {
    if (!val) return;
    this.$nextTick(() => {
      console.info(`onChangeIsLogined: val=${!!val}`);

      const next = this.$route.query["next"];
      if (!!next) {
        this.$router.replace(next as string);
      } else {
        this.$router.replace({ name: "mypage" });
      }
    });
  }
}
</script>
