import { createReducer, on } from "@ngrx/store";
import {LoadDetailBegin, LoadDetailSuccess, LoadDetailFailure}  from "./detail.actions";

export interface DetailState {
  detail: any;
  loading: boolean;
  error: any;
}

// Set initial state
export const initialState: DetailState = {
  detail: {},
  loading: false,
  error: null
};

const _detailReducer = createReducer(
    initialState,
    on(LoadDetailBegin, (state) => {
      return {
        ...state,
        loading: true,
        error: null
      };
    }),
    on(LoadDetailSuccess, (state, action) => {
      return {
        ...state,
        loading: false,
        detail: action.payload.data
      };
    }),
    on(LoadDetailFailure, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    })
  );

  export function detailReducer(state, action) {
    return _detailReducer(state, action);
  }
  

export const getDetail = (state: DetailState) => state.detail;