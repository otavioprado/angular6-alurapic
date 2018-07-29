import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [  ];
  filter: string = '';

  constructor(private _photoService: PhotoService, private activatedRoute: ActivatedRoute) {  }

  ngOnInit(): void {
    const userName = this.activatedRoute.snapshot.params.userName;
    
    let observable: Observable<Photo[]> = this._photoService.listFromUser(userName);
    
    observable.subscribe(photos => {
      console.log(photos[0].description);
      this.photos = photos;
    });
  }

}
