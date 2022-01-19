import { Action, createAction, props } from "@ngrx/store";

export enum ActionTypes {
  LoadDataBegin = "[Data] Load data begin",
  LoadDataSuccess = "[Data] Load data success",
  LoadDataFailure = "[Data] Load data failure"
}

export const LoadDataBegin = createAction(
  '[Data] Load data begin',
  props<{ searchString: string, page: number }>(),
)

export const LoadDataSuccess = createAction(
  '[Data] Load data success',
  props<{payload: { data: any }}>()
)

export const LoadDataFailure = createAction(
  '[Data] Load data failure',
  props<{payload: { error: any }}>(),
)

export const ResetSearchEvent = createAction('[Data] Reset Search Event')