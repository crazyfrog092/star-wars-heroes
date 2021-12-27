import { ActionTree, Commit, Dispatch } from 'vuex';
import { IState } from './state';
import { Mutations, IFetchHeroesPayload, IHero } from './consts';

export interface IActions<C = Commit, D = Dispatch>{
  fetchHeroes({ commit, dispatch }: { commit: C, dispatch: D }, payload: IFetchHeroesPayload): Promise<void>,
  fetchHeroHomeworld(_: any, { url, item }: { url: string, item: IHero }): Promise<void>,
  setCurrentPage({ commit }: { commit: C }, payload: number): void,
  setSearch({ commit }: { commit: C }, payload: string): void,
  addToFavourite({ commit }: { commit: C }, payload: IHero): void,
  getFavouriteHeroes({ commit }: { commit: C }): void,
  deleteFromFavourite({ commit }: { commit: C }, id: number): void,
}

const actions: ActionTree<IState, IState> & IActions = {
  async fetchHeroes({ commit, dispatch }, payload) {
    try {
      const response = await this.$axios.get('/people/', {
        params: payload,
      });
      const apiRows = response.data.results;
      const parseRows = [];
      const promises = [];
      for (let i = 0; i < apiRows.length; i += 1) {
        const id = parseInt(apiRows[i].url.match(/\d+/), 10);
        parseRows.push({
          id,
          name: apiRows[i].name,
          img: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
        });
        promises.push(dispatch('fetchHeroHomeworld', { url: apiRows[i].homeworld, item: parseRows[i] }));
      }
      await Promise.allSettled(promises);
      const result = {
        rows: parseRows,
        count: response.data.count,
      };
      commit(Mutations.SET_HEROES, result);
    } catch (e) {
      setTimeout(() => {
        dispatch('fetchHeroes', payload);
      }, 5000);
    }
  },

  async fetchHeroHomeworld(_, { url, item }) {
    try {
      const response = await this.$axios.get(url);
      item.homeworld = response.data.name;
    } catch (e) {
      item.homeworld = 'api error';
    }
  },

  setCurrentPage({ commit }, payload) {
    commit(Mutations.SET_CURRENT_PAGE, payload);
  },

  setSearch({ commit }, payload) {
    commit(Mutations.SET_SEARCH, payload);
  },

  addToFavourite({ commit }, payload) {
    let heroes: Array<IHero> = [];
    const heroesJson: string | null = localStorage.getItem('heroes');
    if (heroesJson) heroes = JSON.parse(heroesJson);
    heroes.push(payload);
    localStorage.setItem('heroes', JSON.stringify(heroes));
    commit(Mutations.SET_FAVOURITE_HEROES, heroes);
  },

  getFavouriteHeroes({ commit }) {
    let heroes: Array<IHero> = [];
    const heroesJson: string | null = localStorage.getItem('heroes');
    if (heroesJson) {
      heroes = JSON.parse(heroesJson);
      commit(Mutations.SET_FAVOURITE_HEROES, heroes);
    }
  },

  deleteFromFavourite({ commit }, id) {
    let heroes: Array<IHero> = [];
    const heroesJson: string | null = localStorage.getItem('heroes');
    if (heroesJson) heroes = JSON.parse(heroesJson);
    heroes = heroes.filter((hero: IHero) => hero.id !== id);
    localStorage.setItem('heroes', JSON.stringify(heroes));
    commit(Mutations.SET_FAVOURITE_HEROES, heroes);
  },
};

export default actions;
