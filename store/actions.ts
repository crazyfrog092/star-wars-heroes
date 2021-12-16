import { ActionTree, Commit, Dispatch } from 'vuex';
import { IState } from './state';
import { Mutations, IFetchHeroesPayload, IHero } from './consts';

export interface IActions<C = Commit, D = Dispatch>{
  fetchHeroes({ commit, dispatch }: { commit: C, dispatch: D }, payload: IFetchHeroesPayload): Promise<void>,
  fetchHeroHomeworld(_: any, { url, item }: { url: string, item: IHero }): Promise<void>,
  setCurrentPage({ commit }: { commit: C }, payload: number): void,
  setSearch({ commit }: { commit: C }, payload: string): void,
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
};

export default actions;
