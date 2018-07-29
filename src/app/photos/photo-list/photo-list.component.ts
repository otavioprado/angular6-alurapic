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

  constructor(private activatedRoute: ActivatedRoute) {  }

  ngOnInit(): void {
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

}
