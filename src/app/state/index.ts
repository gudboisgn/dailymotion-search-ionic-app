import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from "@ngrx/store";

import { environment } from "../../environments/environment";
import * as fromData from "./app.reducer";
import { DataEffects } from "./app.effects";

export const effects: any[] = [DataEffects];

// App State
export interface AppState {
  data: fromData.DataState;
}

// App Reducer
export const reducers: ActionReducerMap<AppState> = {
  data: fromData.appReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];

  
export const getDataState = (state: AppState) => state.data;

export const getAllItems = createSelector(
  getDataState,
  fromData.getItems
);