import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DailymotionRestService } from '../services/dailymotion-rest.service';
import { AppState } from '../state';
import { LoadDetailBegin } from '../state/detail/detail.actions';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.page.html',
  styleUrls: ['./video-detail.page.scss'],
})
export class VideoDetailPage implements OnInit {

  id:string;
  videoDetail:any = null;
  loading:boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: DailymotionRestService,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    // Get the video Id from the route param
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getVideoDetail(this.id);

    // Load data from AppState
    this.apiService.getDetail().subscribe(
      data => {
      // console.log(data);
      this.loading = data.loading;
      this.videoDetail = data.detail || null;
      }
    );
  }

  /**
   * 
   * @param id 
   * 
   * Load Video detail by video id.
   */
  getVideoDetail(id){
    //dispatch LoadDetailBegin Action to load video detail
    this.store.dispatch(LoadDetailBegin({ videoId: id }));
  }


}
