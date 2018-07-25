import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

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
