import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DailymotionRestService } from '../services/dailymotion-rest.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.page.html',
  styleUrls: ['./video-detail.page.scss'],
})
export class VideoDetailPage implements OnInit {

  id:string;
  videoDetail:any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restApi: DailymotionRestService,
    ) { }

  ngOnInit() {
    // Get the video Id from the route param
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getVideoDetail(this.id);
  }

  /**
   * 
   * @param id 
   * 
   * Load Video detail by video id.
   */
  getVideoDetail(id){
    this.restApi.getVideoDetail(id).subscribe(
      response => {
        this.videoDetail = response;
        // console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }


}
