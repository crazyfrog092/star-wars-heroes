import { MutationTree } from 'vuex';
import { IState } from './state';
import { Mutations, IHeroes } from './consts';

export interface IMutations<S = IState> {
  [Mutations.SET_HEROES](state: S, payload: IHeroes): void,
  [Mutations.SET_CURRENT_PAGE](state: S, payload: number): void,
  [Mutations.SET_SEARCH](state: S, payload: string): void,
}

const mutations: MutationTree<IState> & IMutations = {
  [Mutations.SET_HEROES]: (state, payload) => { state.heroes = payload; },
  [Mutations.SET_CURRENT_PAGE]: (state, payload) => { state.currentPage = payload; },
  [Mutations.SET_SEARCH]: (state, payload) => { state.search = payload; },
};

export default mutations;
