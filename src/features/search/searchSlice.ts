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
    progressRequest: (state) => ({
      ...state, loading: true, error: null,
    }),

    searchFailure: (state, action: PayloadAction<InitialState>) => {
      const { message } = action.payload;
      return { ...state, loading: false, error: message };
    },

    searchSuccess: (state, action:PayloadAction<InitialState>) => {
      const { skills } = action.payload;
      return {
        ...state, skills, loading: false, error: null,
      };
    },

    changeSearchField: (state, action: PayloadAction<InitialState>) => {
      const { search } = action.payload;
      if (search !== '') {
        return { ...state, search };
      }
      return { ...state, search, skills: [] };
    },

    default: (state) => {
      state;
    },
  },
});

export const {
  progressRequest, searchFailure, searchSuccess, changeSearchField, clearField,
} = searchSlice.actions;

export default searchSlice.reducer;
