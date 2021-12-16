<template>
  <section class="card">
    <div
      v-if="!isFavourite"
      class="card__like"
      @click="addToFavourite(id)"
    >
      ❤️
    </div>
    <!-- TODO del-event -->
    <div
      v-else
      class="card__like"
      @click="deleteFromFavourite(id), $emit('del-event')"
    >
      💔
    </div>
    <img
      class="card__img"
      :src="img"
    >
    <div class="card__text">
      {{ $t('hero-card.name') }} {{ name }}
    </div>
    <div class="card__text">
      {{ $t('hero-card.homeworld') }} {{ homeworld }}
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    homeworld: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    addToFavourite(id: number): void {
      const heroData = {
        id,
        name: this.name,
        img: this.img,
        homeworld: this.homeworld,
      };
      this.$store.dispatch('add', heroData); // TODO
    },
    deleteFromFavourite(id: number): void {
      this.$store.dispatch('del', id); // TODO
    },
  },
});
</script>

<style lang="scss" scoped>
.card {
  background-color: $yellow;
  position: relative;
  border-radius: 7px;

  &__like {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    user-select: none;
    transition: all .2s ease-in-out;
    &:hover {
      transform: scale(1.3);
    }
    &:active {
      transition: all 0s ease-in-out;
      transform: scale(2.5);
    }
  }

  &__img {
    width: 100%;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }

  &__text {
    padding: 5px 15px;
  }
}
</style>
