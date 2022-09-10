import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey : string = 'AIzaSyDEko6cU1YDNYoerVUifzJ9HibTDFkg5_E';
  private httpClient: HttpClient;

  constructor(public handler: HttpBackend) { 
    this.httpClient = new HttpClient(handler);
  }

  getVideosForChanel(nextToken:string): Observable<Object> {
    let token =nextToken || 'EAAaBlBUOkNESQ';
    //let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&part=snippet &type=video,id&maxResults=' + maxResults
    let url=`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status,contentDetails&maxResults=50&playlistId=UUw6k_Tm3O0MI23ah2SBYB3Q&key=AIzaSyDEko6cU1YDNYoerVUifzJ9HibTDFkg5_E&pageToken=${token}`
    return this.httpClient.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }

  getVideosDetails(ids:string): Observable<Object> {
    //let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&part=snippet &type=video,id&maxResults=' + maxResults
    let url=`https://www.googleapis.com/youtube/v3/videos?part=contentDetails%2C+snippet%2C+statistics&id=${ids}&key=AIzaSyDEko6cU1YDNYoerVUifzJ9HibTDFkg5_E`
    return this.httpClient.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }
}