<template>
  <section class="primary">
    <Header class="primary__header" />
    <div class="primary__content">
      <nuxt />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '~/components/Header.vue';

export default Vue.extend({
  components: {
    Header,
  },
});
</script>

<style lang="scss" scoped>
.primary {

  &__header {
    margin-bottom: 20px;
  }
}
</style>
