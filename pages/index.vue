<template>
  <section class="home">
    <div class="home__search">
      <b-form-input
        :value="search"
        @input="setSearch"
        @keyup.enter="initFetchHeroes"
      />
    </div>
    <div class="home__grid">
      <Card
        v-for="(item, i) in heroes.rows"
        :id="item.id"
        :key="i"
        :img="item.img"
        :name="item.name"
        :homeworld="item.homeworld"
        :is-favourite="false"
      />
    </div>
    <div class="home__pagination">
      <b-pagination
        v-model="currentPage"
        :per-page="10"
        :total-rows="heroes.count"
        class="pagination-dark"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import Card from '@/components/Card.vue';
import { IFetchHeroesPayload } from '@/store/consts';

export default Vue.extend({
  components: {
    Card,
  },

  data() {
    return {
      timer: null,
    };
  },

  computed: {
    ...mapGetters({
      heroes: 'getHeroes',
      currentPage: 'getCurrentPage',
      search: 'getSearch',
    }),
  },

  created(): void {
    this.fetchHeroes();
  },

  methods: {
    async fetchHeroes(): Promise<void> {
      this.clearTimer();
      const payload: IFetchHeroesPayload = {
        page: this.currentPage,
      };
      if (this.search) payload.search = this.search;
      await this.$store.dispatch('fetchHeroes', payload);
    },

    initFetchHeroes(): void {
      if (this.currentPage === 1) {
        this.fetchHeroes();
      } else {
        this.setCurrentPage(1);
      }
    },

    createTimer(): void {
      this.clearTimer();
      this.timer = setTimeout(() => {
        this.fetchHeroes();
      }, 1500);
    },

    clearTimer(): void {
      clearTimeout(this.timer);
    },

    setCurrentPage(page: number): void {
      this.$store.dispatch('setCurrentPage', page);
    },

    setSearch(value: string): void {
      this.createTimer();
      this.$store.dispatch('setSearch', value);
    },
  },
});
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  gap: 20px;

  &__grid {
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(4, 1fr);
  }

  &__pagination {
    display: flex;
    justify-content: flex-end;
  }

  &__search {
    max-width: 200px;
    width: 100%;
    margin-left: auto;
  }
}
</style>

<style lang="scss">
.pagination-dark .page-item .page-link {
  background-color: #343a40 !important;
  border-color: #6c757d !important;
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(108, 117, 125,.25) !important;
  }
}

.form-control:focus {
  border-color: #6c757d !important;
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125,.25) !important;
}
</style>
