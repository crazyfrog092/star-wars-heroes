import { IHeroes } from './consts';

export interface IState {
  heroes: IHeroes,
  currentPage: number,
  search: string,
}

export const state = (): IState => ({
  heroes: {
    rows: [],
    count: 0,
  },
  currentPage: 1,
  search: '',
});

export default state;
