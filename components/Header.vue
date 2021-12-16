<template>
  <section class="header">
    <img
      alt="logo"
      src="~/assets/img/star-wars-logo.png"
      class="header__img"
    >
    <h1 class="header__title">
      {{ $t('header.title') }}
    </h1>
    <div class="header__nav">
      <nuxt-link
        class="header__link"
        :to="PATH.ROOT"
      >
        {{ $t('header.home') }}
      </nuxt-link>
      <nuxt-link
        class="header__link"
        :to="PATH.FAVOURITE"
      >
        {{ $t('header.favourite') }}
      </nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import PATH from '~/types';

export default Vue.extend({
  data() {
    return {
      PATH,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__img {
    width: 240px;
    margin-bottom: 10px;
  }

  &__title {
    font-size: 40px;
    line-height: 48px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &__nav {
    display: flex;
    padding: 8px 0;
  }

  &__link {
    color: $white;
    text-decoration: none;
    margin: 0 16px;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
