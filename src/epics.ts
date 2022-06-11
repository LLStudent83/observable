import { ofType } from 'redux-observable';
import { Action } from '@reduxjs/toolkit';
import { ajax } from 'rxjs/ajax';
import {
  debounceTime, filter, map, of, switchMap, catchError, Observable,
} from 'rxjs';
import { progressRequest, searchSuccess, searchFailure } from './features/search/searchSlice';

export const changeSearchEpic = (action$: Observable<Action>)
: Observable<Action> => action$.pipe(
  ofType('search/changeSearchField'),
  map((o: { payload: { search: string } }) => o.payload.search.trim()),
  debounceTime(1000),
  filter((o) => o !== ''),
  map((o) => progressRequest({ search: o })),

);

export const serchSkillsEpic = (action$: Observable<Action>)
: Observable<Action> => action$.pipe(
  ofType('search/progressRequest'),
  map((o: { payload: { search: string } }) => o.payload.search),

  map((o: string) => new URLSearchParams({ q: o })),
  switchMap((o) => ajax.getJSON(`${process.env.REACT_APP_BASE_URL}/api/search?${o}`).pipe(
    map((o) => searchSuccess({ skills: o })),
    catchError((e) => of(searchFailure(e))),
  )),
);
