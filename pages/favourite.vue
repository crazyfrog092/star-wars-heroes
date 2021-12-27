<template>
  <section class="favourite">
    <div
      v-if="favouriteHeroes.length"
      class="favourite__grid"
    >
      <Card
        v-for="(item, i) in favouriteHeroes"
        :id="item.id"
        :key="i"
        :img="item.img"
        :name="item.name"
        :homeworld="item.homeworld"
        :is-favourite="true"
      />
    </div>
    <div
      v-else
      class="favourite__empty"
    >
      {{ $t('empty') }}
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import Card from '@/components/Card.vue';

export default Vue.extend({
  components: {
    Card,
  },

  computed: {
    ...mapGetters({
      favouriteHeroes: 'getFavouriteHeroes',
    }),
  },

  created(): void {
    this.$store.dispatch('getFavouriteHeroes');
  },
});
</script>

<style lang="scss" scoped>
.favourite {
  display: grid;
  gap: 20px;

  &__grid {
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(4, 1fr);
  }

  &__empty {
    margin: 40px auto;
    font-size: 24px;
  }
}
</style>
