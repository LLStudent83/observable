import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Skill = {
  id: number,
  name: string,
};

type InitialState = {
  skills: Skill[],
  loading: boolean,
  error: null | string,
  search: string,
};

const initialState: InitialState = {
  skills: [],
  loading: false,
  error: null,
  search: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    progressRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    searchFailure: (state, action: PayloadAction<{ message: string }>) => {
      const { message } = action.payload;
      state.loading = true;
      state.error = message;
    },

    searchSuccess: (state, action: PayloadAction<InitialState>) => {
      const { skills } = action.payload;
      state.loading = false;
      state.error = null;
      state.skills = skills;
    },

    changeSearchField: (state, action: PayloadAction<InitialState>) => {
      const { search } = action.payload;
      if (search !== '') {
        state.search = search;
      }
      state.search = search;
      state.skills = [];
    },
  },
});

export const {
  progressRequest, searchFailure, searchSuccess, changeSearchField,
} = searchSlice.actions;

export default searchSlice.reducer;
