import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css']
})
export class TableContainerComponent {

  @Input() dataSource: any;
  @Input() displayedColumns: any[] = [];
  @Input() totalRows: number = 0;
  
  @Output() openDialogEmitter = new EventEmitter<any>();
  @Output() pageIndexEmitter = new EventEmitter<PageEvent>();
  @Output() sortEmitter = new EventEmitter<Sort>();
  @Output() changeStatusEmitter = new EventEmitter<any>();

  openDialog(data: any){
    this.openDialogEmitter.emit(data);
  }

  get displayColumns() {
    return this.displayedColumns;
  }

  getColumnDefName(item: any): string {
    return item?.name?.toString();
  }

  getColumsToDisplay() {
    let columns: string[] = [];
    this.displayedColumns.forEach( (value) => {
      columns.push(value.name);
    })
    return columns;
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageIndexEmitter.emit(pageEvent)
  }

  applySort(sortState: Sort){
    this.sortEmitter.emit(sortState);
  }

  changeStatus(id: string, status: boolean) {
    this.changeStatusEmitter.emit({id, status});
 }

}
