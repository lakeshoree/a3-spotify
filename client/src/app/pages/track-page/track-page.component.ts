import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-track-page',
    templateUrl: './track-page.component.html',
    styleUrls: ['./track-page.component.css'],
    standalone: false
})
  export class TrackPageComponent implements OnInit {
    trackId: string = '';
    track: TrackData | null = null;

    constructor(
      private route: ActivatedRoute,
      private spotifyService: SpotifyService
    ) { }

    // Reads the track ID from the URL
    ngOnInit(): void {
      const trackId = this.route.snapshot.paramMap.get('id');
      if (trackId === null) {
        return;
      }

      this.trackId = trackId;

      // Storing fetched track so the template is able to display
      this.spotifyService.getTrack(trackId).then((track) => {
        this.track = track;
      });
  }

}
