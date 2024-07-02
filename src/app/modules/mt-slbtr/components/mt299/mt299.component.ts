import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { take } from 'rxjs';
import { MT299 } from 'src/app/core/interface/conteo-mt299.model';
import { TableModel } from 'src/app/core/interface/generic-table.model';
import { GlobalAppService } from 'src/app/core/services/global-app.service';

@Component({
  selector: 'app-mt299',
  templateUrl: './mt299.component.html',
  styleUrls: ['./mt299.component.scss']
})
export class Mt299Component implements OnChanges {
  table!: TableModel;
  @Input() execETL: boolean = false;
  loading: boolean = false;
  isLoadingTable: boolean = false;

  constructor(private _apiService: GlobalAppService) { }
  ngOnChanges(): void {
    this.getMT299()
  }
  getMT299() {
    this.generateTable([]);
    this.loading = true;
    this.isLoadingTable = true;
    this._apiService.getMT299().pipe(take(1)).subscribe({
      next: (result) => {
        this.generateTable(result);
        this.loading = false;
        this.isLoadingTable = false;
      },
      error: () => {
        this.isLoadingTable = false;
        this.loading = false;
      }
    })
  }

  generateTable(value: MT299[]) {
    this.table = {
      caption: 'MT299 Salida T24',
      showCant: true,
      textCenter: true,
      columns: [
        {
          field: 'RECID',
          header: 'RECID',
          type: 'string',
          pFrozenColumn: true
        },
        {
          field: 'sucursal',
          header: 'Sucursal',
          type: 'number'
        }, {
          field: 'message_type',
          header: 'Tipo Mensaje',
          type: 'number'
        }, {
          field: 'department',
          header: 'Department',
          type: 'number'
        }, {
          field: 'transaction_ref',
          header: 'Trans_Ref',
          type: 'string'
        }, {
          field: 'carrier_addr_no',
          header: 'Carrier Addr No',
          type: 'string'
        }, {
          field: 'msg_disposition',
          header: 'MSG Disposition',
          type: 'string'
        }, {
          field: 'sent_stamp',
          header: 'Sent_stamp',
          type: 'string'
        },
      ],
      values: value,
      loading: ()=> this.isLoadingTable,
    }
  }
}
