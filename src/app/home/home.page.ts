import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { DailymotionRestService } from '../services/dailymotion-rest.service';
import { LoadDataBegin, ResetSearchEvent } from '../state/app.actions';
import { AppState } from '../state';

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
    private apiService: DailymotionRestService,
    private router: Router,
    private store: Store<AppState>
    ) {}


    ngOnInit() {
      // Get data from AppState
      this.apiService.getData().subscribe(data => {
        // console.log(data);
        if(data && data.items && data.items?.list){
          this.videoData = data;
          for (let i = 0; i < data.items?.list?.length; i++) {
            this.videos.push(data.items.list[i]);
          }

          // Disable Infinite Scroll when no more data.
          setTimeout(() => {
            this.infiniteScroll.disabled = !this.videoData?.items?.has_more;
          }, 500);
        
        }

      });
    }



  /**
   * 
   * @param event 
   * 
   * Function called when searchbar text changes
   */
  search(event){

    // Reset variables and state when search input value changes.
    this.videoData = null;
    this.videos = [];
    this.store.dispatch(ResetSearchEvent());

    setTimeout(() => {
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
    // set the current page number
    let page:number = 1;
    if(this.videoData?.items?.has_more){
      page = this.videoData?.items?.page + 1;
    }

    if(event?.type == "ionInfinite"){
      setTimeout(() => {
        event.target.complete();
      }, 500);
    }

    // Dispatch LoadDataBegin action either when the search input is entered or when InfiniteScroll to load more data
    this.store.dispatch(LoadDataBegin({ searchString: this.searchText, page: page }));
    
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
