import { Component, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModel } from '../../interface/generic-table.model';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule, ButtonComponent, TableModule, PaginatorModule, FormsModule, ProgressSpinnerModule],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {
  @Input() table!: TableModel;
  table_sm: string = '';
  anchoPantalla: number = window.innerWidth;
  altoPantalla: number = window.innerHeight;
  alto: number = window.innerHeight - 400;

  ngOnInit(): void {
    this.changeTableMode()
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.anchoPantalla = window.innerWidth;
    this.altoPantalla = window.innerHeight;
    this.alto = window.innerHeight - 400;
    this.changeTableMode()
  }

  changeTableMode() {
    if (this.altoPantalla < 800) {
      this.table_sm = 'p-datatable-sm'
    } else {
      this.table_sm = ''
    }
  }

  cellCheckTable(fun: Function, value: any) {
    return fun(value);
  }

  clickCheckTable(fun: Function, id: number) {
    fun(id);
  }

  rowCheckedTable(fun: Function, value: any): boolean {
    return fun(value);
  }  
  
  loadingTable(fun: Function): boolean {
    return fun();
  }
}
