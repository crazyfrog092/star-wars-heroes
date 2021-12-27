import { IHeroes, IHero } from './consts';

export interface IState {
  heroes: IHeroes,
  favouriteHeroes: Array<IHero>,
  currentPage: number,
  search: string,
}

export const state = (): IState => ({
  heroes: {
    rows: [],
    count: 0,
  },
  favouriteHeroes: [],
  currentPage: 1,
  search: '',
});

export default state;
