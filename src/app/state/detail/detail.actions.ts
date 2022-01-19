import { Action, createAction, props } from "@ngrx/store";

export enum ActionTypes {
  LoadDetailBegin = "[Video Detail] Load begin",
  LoadDetailSuccess = "[Video Detail] Load success",
  LoadDetailFailure = "[Video Detail] Load failure"
}

export const LoadDetailBegin = createAction(
  '[Video Detail] Load begin',
  props<{ videoId: string }>(),
)

export const LoadDetailSuccess = createAction(
  '[Video Detail] Load success',
  props<{payload: { data: any }}>()
)

export const LoadDetailFailure = createAction(
  '[Video Detail] Load failure',
  props<{payload: { error: any }}>(),
)