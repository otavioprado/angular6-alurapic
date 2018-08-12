import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

    @Output() onTyping = new EventEmitter<string>();
    @Input() value: string = ''
    debounce: Subject<string> = new Subject<string>();

    ngOnInit(): void {
        // usando debounce é possível aguardar 300ms antes de realizar novamente a operação
        this.debounce
        .pipe(debounceTime(300))
        .subscribe(filter => this.onTyping.emit(filter));
    }

    ngOnDestroy(): void {
        // quando sair do photo list component vai destruir o debounce
        this.debounce.unsubscribe();
      }
    
}