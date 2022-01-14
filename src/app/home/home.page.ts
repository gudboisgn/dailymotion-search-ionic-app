import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { DailymotionRestService } from '../services/dailymotion-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  searchText:string = "";
  videos = [];
  videoData = null;

  constructor(
    private restApi: DailymotionRestService,
    private router: Router
    ) {}

  /**
   * 
   * @param event 
   * 
   * Function called when searchbar text changes
   */
  search(event){
    setTimeout(() => {
      // Reset variables when search input value changes.
      this.videoData = null;
      this.videos = [];
    
      // this.searchText = event?.detail?.value;
      this.loadData(event);
    }, 500);
  }


  /**
   * 
   * @param event
   * 
   * Function called to load result based on the search Input.
   * Also, called by ionInfinite Scroll to load more data.
   */
  loadData(event){
    let searchString = this.searchText || null;
    let page = (this.videoData ? this.videoData.page + 1 : 1);
    if(searchString && searchString != " "){
      this.restApi.searchVideos(searchString, page).subscribe(
        response => {
          this.videoData = response;

          // videos data to display in list
          for (let i = 0; i < response.list.length; i++) {
            this.videos.push(response.list[i]);
          }

          if(event?.type == "ionInfinite"){
            setTimeout(() => {
              event.target.complete();
              
              // disable infinite scroll when no more data are left.
              if (!response.has_more) {
                event.target.disabled = true;
              }
            }, 500);
          }
        },error => {
          console.log(error);
        }
      )
    }else{
      this.videos = null;
    }
    
  }


  /**
   * 
   * @param videoId 
   * 
   * Redirect to video detail page,
   * if search result item is clicked.
   */
  getItemDetail(videoId){
    this.router.navigate(['/video-detail', videoId])
  }

}
