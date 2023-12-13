import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Input() btnText: string = 'Add';
  @Input() placeholder: string = '';

  @Output() searchEmitter = new EventEmitter<string>();
  @Output() addEmitter = new EventEmitter<void>();

  search(value: string){
    this.searchEmitter.emit(value);
  }

  addItem() {
    this.addEmitter.emit();
  }
}
