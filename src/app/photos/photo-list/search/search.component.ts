import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

    debounce: Subject<string> = new Subject<string>();

    ngOnInit(): void {
        // usando debounce é possível aguardar 300ms antes de realizar novamente a operação
        this.debounce
        .pipe(debounceTime(300));
    }

    ngOnDestroy(): void {
        // quando sair do photo list component vai destruir o debounce
        this.debounce.unsubscribe();
      }
    
}