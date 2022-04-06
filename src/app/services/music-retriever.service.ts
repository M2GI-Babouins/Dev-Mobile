import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//https://github.com/youtubetomp3converterapi/Youtube-Converter-to-MP3-Json-Restful-Api#mp3-json-api

@Injectable({
  providedIn: 'root'
})
export class MusicRetrieverService {

  constructor(private http : HttpClient) { }

  readAPI(URL: string) {
    return this.http.get(URL);
  }

  getUrlFromYoutubeUrl(url : string){
    return url;
    //return this.callforMusic(this.youtube_parser(url));
  }

  callforMusic(id_video: string) : string{
     let urlmusic: "null";
    this.readAPI('https://api.download-lagu-mp3.com/@api/json/mp3/'+id_video)
      .subscribe((data) => {
        console.log(data);
        urlmusic = data['vidInfo']['0']['dloadUrl'];
      });
      return urlmusic;
  }


   youtube_parser(url){
     return url;
     /*
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
   /* var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;  */
    }
}
