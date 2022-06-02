import { ofType, ActionsObservable } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
  debounceTime, filter, map, of, switchMap, catchError,
} from 'rxjs';
import { progressRequest, searchSuccess, searchFailure } from './features/search/searchSlice';

export const changeSearchEpic = (action$: ActionsObservable<any>): void => action$.pipe(
  ofType('search/changeSearchField'),
  map((o: { payload: { search: string } }) => o.payload.search.trim()),
  debounceTime(1000),
  filter((o) => o !== ''),
  map((o) => progressRequest({ search: o })),

);

type Skill = {
  id: number,
  name: string,
};

export const serchSkillsApic = (action$: ActionsObservable<any>):void => action$.pipe(
  ofType('search/progressRequest'),
  map((o: { payload: { search: string } }) => o.payload.search),

  map((o) => new URLSearchParams({ q: o })),
  switchMap((o) => ajax.getJSON(`${process.env.REACT_APP_BASE_URL}/api/search?${o}`).pipe(
    map((o: { skills: Skill[] }) => searchSuccess({ skills: o })),
    catchError((e) => of(searchFailure(e))),
  )),
);
