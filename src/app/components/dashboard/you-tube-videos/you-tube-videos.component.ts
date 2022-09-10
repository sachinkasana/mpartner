import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { YoutubeService } from 'src/app/core/services/youtube/youtube.service';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-you-tube-videos',
  templateUrl: './you-tube-videos.component.html',
  styleUrls: ['./you-tube-videos.component.css']
})
export class YouTubeVideosComponent implements OnInit {

  constructor(private userService: UserService, private youTubeService: YoutubeService) { }
  videos: any[];
  nextPageToken='';
  ids='';
  idArray:any[];
  private unsubscribe$: Subject<any> = new Subject();
  ngOnInit(): void {
    this.videos = [];
    this.ids="";
    this.idArray=[];
   this.getYouTubeVideos();
  }

  getYouTubeVideos(){
    this.idArray=[];
    this.youTubeService
      .getVideosForChanel(this.nextPageToken)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((lista: any) => {
        this.nextPageToken=lista.nextPageToken;
        for (let element of lista['items']) {
          this.idArray.push(element.contentDetails.videoId);
          this.ids=this.idArray.join(',')
        //  var postedVideoTime= this.timeDifference(new Date(), new Date(element.contentDetails.videoPublishedAt))
        //  element.postedVideoTime=postedVideoTime;
        //  this.videos.push(element)
        }
        this.getVideoDetails(this.ids);

      });
  }

  getVideoDetails(ids:string){
    this.youTubeService.getVideosDetails(ids)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((lista: any) => {
      for (let element of lista['items']) {
       var postedVideoTime= this.timeDifference(new Date(), new Date(element.snippet.publishedAt))
       element.postedVideoTime=postedVideoTime;
       this.videos.push(element)
      }

    });
  }

  timeDifference(current: any, previous: any) {
    let postedTime="";
    let suffix=" Ago"
    var msPerSecond = 1000;
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    let second = elapsed / msPerSecond;
    let minute = elapsed / msPerMinute;
    let hr = elapsed / msPerHour;
    let day = elapsed / msPerDay;
    if (second < 60) {
      postedTime= Math.round(second) + ' seconds ago ' + suffix;
    } else if (minute < 60) {
      postedTime=  Math.round(minute) + ' minutes ago ' + suffix;
    } else if (hr < 24) {
      postedTime=  Math.round(hr) + ' Hours ago '+ suffix;
    } else if (day >= 7) {
      if (day > 360) {
        postedTime=   Math.round(day / 360) + " Years " + suffix;
      }
      else if (day > 30) {
        postedTime=   Math.round(day / 30) + " Months " + suffix;
      } else {
        postedTime=   Math.round(day / 7) + " Week " + suffix;
      }
    }
    else if (day < 7) {
      postedTime=   Math.round(day) + " Days " + suffix;;
    }
    return postedTime;
  }

  onScrollDown(){
    console.log('scroll down');
    this.getYouTubeVideos();
  }
  onUp(){
    console.log('scroll up')
  }
}
