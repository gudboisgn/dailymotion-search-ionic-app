import { createReducer, on } from "@ngrx/store";
import {LoadDataBegin, LoadDataSuccess, LoadDataFailure, ResetSearchEvent}  from "./app.actions";

export interface DataState {
  items: any;
  loading: boolean;
  error: any;
}

// Set initial state
export const initialState: DataState = {
  items: {},
  loading: false,
  error: null
};

const _appReducer = createReducer(
    initialState,
    on(LoadDataBegin, (state) => {
      return {
        ...state,
        loading: true,
        error: null
      };
    }),
    on(LoadDataSuccess, (state, action) => {
      return {
        ...state,
        loading: false,
        items: action.payload.data
      };
    }),
    on(LoadDataFailure, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    }),
    on(ResetSearchEvent, (state) => {
      return Object.assign({}, initialState);
    })
  );

  export function appReducer(state, action) {
    return _appReducer(state, action);
  }
  

export const getItems = (state: DataState) => state.items;