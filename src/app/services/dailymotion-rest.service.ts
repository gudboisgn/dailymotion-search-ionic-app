import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { LoadDataBegin } from "../state/app.actions";
import { AppState, getAllItems, getDataState } from "../state";

@Injectable({
  providedIn: 'root'
})
export class DailymotionRestService {

  constructor(
    private store: Store<AppState>,
    private http: HttpClient) { }

  searchVideos(searchString, page){
    console.log(page);
    const params = new HttpParams()
      .set('limit', '15')
      .set('page', page)
    return this.http.get<any>(`https://api.dailymotion.com/videos?search=${searchString}`, {params});
  }


  getVideoDetail(videoId){
    return this.http.get<any>(`https://api.dailymotion.com/video/${videoId}?fields=published%2Cthumbnail_480_url%2Clikes_total%2Cdescription%2Cduration%2Cchannel%2Ctitle%2Cviews_total`);
  }

  getData() {
    return this.store.select(getDataState);
  }

  getItems() {
    return this.store.select(getAllItems);
  }

}
