import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { DailymotionRestService as DataService } from "../services/dailymotion-rest.service";
import { LoadDataBegin, LoadDataSuccess, LoadDataFailure } from "./app.actions";

@Injectable()
export class DataEffects {
  constructor(private actions: Actions, private dataService: DataService) {}

  @Effect()
  searchVideos = this.actions.pipe(
    ofType(LoadDataBegin),
    switchMap((action) => {
      return this.dataService.searchVideos(action.searchString, action.page).pipe(
        map(data => ({ type: '[Data] Load data success', payload:{data:data}})),
        catchError(error =>
          of(LoadDataFailure({payload:{ error: error }}))
        )
      );
    })
  );

  
}