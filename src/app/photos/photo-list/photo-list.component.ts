import { PhotoService } from './../photo/photo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';

import { Photo } from '../photo/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[] = [  ];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private photoService: PhotoService) {  }

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    // pega o photos configurado como resolver no app.routing.module.ts e atribui à propriedade photos
    this.photos = this.activatedRoute.snapshot.data.photos;

    // usando debounce é possível aguardar 300ms antes de realizar novamente a operação
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.filter = filter);
  }

  ngOnDestroy(): void {
    // quando sair do photo list component vai destruir o debounce
    this.debounce.unsubscribe();
  }

  load() {
    this.photoService.listFromUserPaginated(this.userName, ++this.currentPage)
    .subscribe(photos => {
      this.photos = this.photos.concat(photos);
      if(!photos.length) {
        this.hasMore = false;
      }
    });
  }

}
