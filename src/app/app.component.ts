import { Component, OnInit } from '@angular/core';
import { Observable } from '../../node_modules/rxjs/internal/Observable';

import { PhotoService } from './photos/photo/photo.service';
import { Photo } from './photos/photo/photo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  photos: any[] = [  ];

  constructor(private _photoService: PhotoService) {  }

  ngOnInit(): void {
    let observable: Observable<Photo[]> = this._photoService.listFromUser('flavio');

    observable.subscribe(photos => {
      console.log(photos[0].description);
      this.photos = photos;
    });
  }

}
