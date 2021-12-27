import { GetterTree } from 'vuex';
import { IState } from './state';
import { IHeroes, IHero } from './consts';

export interface IGetters<S = IState> {
  getHeroes(state: S): IHeroes,
  getFavouriteHeroes(state: S): Array<IHero>,
  getCurrentPage(state: S): number,
  getSearch(state: S): string,
}

const getters: GetterTree<IState, IState> & IGetters = {
  getHeroes: (state) => state.heroes,
  getFavouriteHeroes: (state) => state.favouriteHeroes,
  getCurrentPage: (state) => state.currentPage,
  getSearch: (state) => state.search,
};

export default getters;
