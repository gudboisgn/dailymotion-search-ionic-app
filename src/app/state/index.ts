import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from "@ngrx/store";

import { environment } from "../../environments/environment";

import * as fromData from "./app.reducer";
import * as fromDetailData from "./detail/detail.reducer";

import { DataEffects } from "./app.effects";
import { DetailEffects } from "./detail/detail.effects";

export const effects: any[] = [DataEffects, DetailEffects];

// App State
export interface AppState {
  data: fromData.DataState;
  detail: fromDetailData.DetailState;
}

// App Reducer
export const reducers: ActionReducerMap<AppState> = {
  data: fromData.appReducer,
  detail: fromDetailData.detailReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];

  
export const getDataState = (state: AppState) => state.data;
export const getDetailState = (state: AppState) => state.detail;

export const getAllItems = createSelector(
  getDataState,
  fromData.getItems
);