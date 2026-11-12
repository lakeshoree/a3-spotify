import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://127.0.0.1:8888';

  constructor(private http:HttpClient) { }

  // Sends the GET request to the local express server
  private sendRequestToExpress(endpoint:string):Promise<any> {
    const uri:string = this.expressBaseUrl + endpoint;

    //firstValueFrom generates a Promise for whatever is returned first from the GET request.
    //You shouldn't need to update this part.
    return firstValueFrom(this.http.get(uri)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  // Encodes the search text so it can be used within the URL
  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    const endpoint = `/search/${category}/${encodeURIComponent(resource)}`;

    return this.sendRequestToExpress(endpoint).then((data) => {
      switch (category) { // Using switch case so we can convert results into models for each of the selected categories
        case 'artist':
          return data.artists.items.map((item: object) => new ArtistData(item));
        case 'album':
          return data.albums.items.map((item: object) => new AlbumData(item));
        case 'track':
          return data.tracks.items.map((item: object) => new TrackData(item));
        default:
          return [];
      } 
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    const endpoint = `/artist/${encodeURIComponent(artistId)}`;

    return this.sendRequestToExpress(endpoint).then((data) => {
      return new ArtistData(data);
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    const endpoint = `/artist-top-tracks/${encodeURIComponent(artistId)}`;

    return this.sendRequestToExpress(endpoint).then((data) => {
      return data.tracks.map((item: object) => new TrackData(item));
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    const endpoint = `/artist-albums/${encodeURIComponent(artistId)}`;

    return this.sendRequestToExpress(endpoint).then((data) => {
      return data.items.map((item: object) => new AlbumData(item));
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    const endpoint = `/album/${encodeURIComponent(albumId)}`;

    return this.sendRequestToExpress(endpoint).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    const endpoint = `/album-tracks/${encodeURIComponent(albumId)}`;

    return this.sendRequestToExpress(endpoint).then((data) => {
      return data.items.map((item: object) => new TrackData(item));
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    const endpoint = `/track/${encodeURIComponent(trackId)}`;

    return this.sendRequestToExpress(endpoint).then((data) => {
      return new TrackData(data);
    });
  }
}
