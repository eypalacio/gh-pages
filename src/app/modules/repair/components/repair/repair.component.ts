import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { take } from 'rxjs';
import { TableModel } from 'src/app/core/interface/generic-table.model';
import { SearchTablePipe } from 'src/app/core/pipes/search-table.pipe';
import { GlobalAppService } from 'src/app/core/services/global-app.service';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.scss']
})
export class RepairComponent implements OnInit {
  table!: TableModel;
  value: string = '';
  response: any[] = []
  isLoadingTable: boolean = false;

  constructor(
    private _apiService: GlobalAppService,
    private _searchTablePipe: SearchTablePipe
  ) { }

  ngOnInit(): void {
    this.loadRepairMessages();
  }

  loadRepairMessages() {
    this.isLoadingTable = true;
    this.generateTableRepair([]);
    this._apiService.getRepair().pipe(take(1)).subscribe({
      next: (response) => {
        this.response = response
        this.filterTable();
      },
      error: () => {
        this.isLoadingTable = false;
      }
    })
  }

  filterTable() {
    this.generateTableRepair(this._searchTablePipe.transform(this.response.map((e) => {
      e.actual_time = moment.utc(e.actual_time).format('HH:mm:ss') === 'Invalid date'?e.actual_time:moment.utc(e.actual_time).format('HH:mm:ss');
      return e
    }), this.value));
   this.isLoadingTable = false

  }

  generateTableRepair(values: any[]) {
    this.table = {
      caption: 'Repair',
      columns: [
        {
          field: 'RECID',
          header: 'RECID',
          type: 'string',
          pFrozenColumn: true
        },
        {
          field: 'actual_time',
          header: 'Hora',
          type: 'string',
        },
        {
          field: 'message_type',
          header: 'Tipo de Mensaje',
          type: 'string',
        },
        {
          field: 'error_code',
          header: 'Error',
          type: 'string',
        },
        {
          field: 'tipo_entrada',
          header: 'Tipo de Entrada',
          type: 'string',
        },
        {
          field: 'referencia',
          header: 'Referencia',
          type: 'string',
        },
      ],
      values: values,
      cellCheck: () => true,
      loading: () => this.isLoadingTable,
      clickCheck: (id: number) => {
        this.setEstado(id)
      },
      rowChecked: (value: any) => {
        return value.nuevo == 'x';
      },
    }
  }

  setEstado(id: number) {
    // document.querySelectorAll();
    this._apiService.setEstado(id).pipe(take(1)).subscribe({
      next: () => {
        this.loadRepairMessages();
      }
    })
  }


}
