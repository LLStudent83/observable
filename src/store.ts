import { configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import searchSliceReducer from './features/search/searchSlice';
import { changeSearchEpic, serchSkillsEpic } from './epics';

const epicMiddleware = createEpicMiddleware();
const rootEpic = combineEpics(changeSearchEpic, serchSkillsEpic);

export const store = configureStore({
  reducer: {
    searchSliceReducer,
  },
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
