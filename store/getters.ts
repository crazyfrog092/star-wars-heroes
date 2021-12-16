import { GetterTree } from 'vuex';
import { IState } from './state';
import { IHeroes } from './consts';

export interface IGetters<S = IState> {
  getHeroes(state: S): IHeroes,
  getCurrentPage(state: S): number,
  getSearch(state: S): string,
}

const getters: GetterTree<IState, IState> & IGetters = {
  getHeroes: (state) => state.heroes,
  getCurrentPage: (state) => state.currentPage,
  getSearch: (state) => state.search,
};

export default getters;
