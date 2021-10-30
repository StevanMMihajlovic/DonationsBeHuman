import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() actualPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() collectionSize: number = 0;

  @Output() pagechange: EventEmitter<number> = new EventEmitter();

  pages: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.pages = [];
  }

  ngOnChanges():void{
    this.pages = [];
    for(let i=1; i<= this.getNoPages(); i++){
      this.pages.push(i);
    }
  }

  getNoPages():number{
    return Math.ceil(this.collectionSize/this.pageSize);
  }

  changePage(newPage: number):void{
    this.pagechange.emit(newPage);
  }

}