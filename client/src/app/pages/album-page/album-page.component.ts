import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';


@Component({
    selector: 'app-album-page',
    templateUrl: './album-page.component.html',
    styleUrls: ['./album-page.component.css'],
    standalone: false
})

export class AlbumPageComponent implements OnInit {
  albumId: string = '';
  album: AlbumData | null = null;
  tracks: TrackData[] = [];

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    // Album idea from URL
    const albumId = this.route.snapshot.paramMap.get('id');
    if (albumId === null) {
      return;
    }

    this.albumId = albumId;

    // Loading album details and tracks
    //TODO: inject spotifyService and use it to get the album data and the tracks for the album
    this.spotifyService.getAlbum(albumId).then((album) => {
      this.album = album;
    });

    this.spotifyService.getTracksForAlbum(albumId).then((tracks) => {
      this.tracks = tracks;
    });
  }

}
