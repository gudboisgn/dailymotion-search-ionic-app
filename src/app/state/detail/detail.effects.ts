import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { DailymotionRestService as DataService } from "../../services/dailymotion-rest.service";
import { LoadDetailBegin, LoadDetailSuccess, LoadDetailFailure } from "./detail.actions";

@Injectable()
export class DetailEffects {
  constructor(private actions: Actions, private dataService: DataService) {}

  @Effect()
  getVideoDetail = this.actions.pipe(
    ofType(LoadDetailBegin),
    switchMap((action) => {
      return this.dataService.getVideoDetail(action.videoId).pipe(
        map(data => ({ type: '[Video Detail] Load success', payload:{data:data}})),
        catchError(error =>
          of(LoadDetailFailure({payload:{ error: error }}))
        )
      );
    })
  );

  
}