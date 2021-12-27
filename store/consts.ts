export enum Mutations {
  SET_HEROES = 'SET_HEROES',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_SEARCH = 'SET_SEARCH',
  SET_FAVOURITE_HEROES = 'SET_FAVOURITE_HEROES',
}

export interface IFetchHeroesPayload {
  page: string,
  search?: string,
}

export interface IHero {
  id: number,
  name: string,
  img: string,
  homeworld: string,
}

export interface IHeroes {
  rows: Array<IHero>,
  count: number,
}
