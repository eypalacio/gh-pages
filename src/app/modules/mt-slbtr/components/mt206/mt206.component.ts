import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';
import { TableModel } from 'src/app/core/interface/generic-table.model';
import { GlobalAppService } from 'src/app/core/services/global-app.service';

@Component({
  selector: 'app-mt206',
  templateUrl: './mt206.component.html',
  styleUrls: ['./mt206.component.scss']
})
export class Mt206Component implements OnInit {
  @Output() execETL: EventEmitter<boolean> = new EventEmitter<boolean>()
  table!: TableModel;
  loading: boolean = false;
  loadingMessages: boolean = false;
  isLoadingTable: boolean = false;

  constructor(private _apiService: GlobalAppService) { }

  ngOnInit(): void {
    this.getMT206Slbtr()
  }

  getMT206Slbtr() {
    this.generateTableMT206([]);
    this.isLoadingTable = true;
    this.loadingMessages = true;
    this._apiService.getMT206SLBTR().pipe(take(1)).subscribe({
      next: (response) => {
        this.generateTableMT206(response);
        this.loadingMessages = false;
        this.isLoadingTable = false
      },
      error: () => {
        this.loadingMessages = false;
        this.isLoadingTable = false;
      }
    })
  }
  
  executeETL() {
    this.loading = true;
    this._apiService.ejecutarETLMT299().pipe(take(1)).subscribe({
      next: () => { 
        this.getMT206Slbtr();
        this.execETL.emit(true);
        this.loading = false;
      },
      error: ()=> this.loading = false
    });
  }

  generateTableMT206(values: any) {
    this.table = {
      caption: 'MT206 SLBTR',
      showCant: true,
      textCenter: true,
      columns: [
        {
          field: 'REF_206_ENV',
          header: 'REF 206 ENV',
          type: 'string',
          pFrozenColumn: true
        }, {
          field: 'NUM_REFTRA',
          header: 'NUM REFTRA',
          type: 'string'
        }, {
          field: 'IMP_206_ENV',
          header: 'IMP 206 ENVIADOS',
          type: 'string'
        }, {
          field: 'FECHA_206_ENV',
          header: 'FECHA ENVIADOS',
          type: 'Date'
        }, {
          field: 'BANCO_LOCAL',
          header: 'BANCO LOCAL',
          type: 'string'
        }, {
          field: 'REF_910_RECIBIDO',
          header: 'REF 910 RECIBIDO',
          type: 'string'
        }, {
          field: 'REF_TRANSA',
          header: 'REF TRANSA',
          type: 'string'
        }, {
          field: 'REF_TRASOC',
          header: 'REF TRASOC',
          type: 'string'
        }, {
          field: 'MONEDA',
          header: 'MONEDA',
          type: 'string'
        }, {
          field: 'IMPORTE',
          header: 'IMPORTE',
          type: 'string'
        },
      ],
      values: values,
      button: {
        buttons: [
          {
            label: 'Ejecutar ETL',
            icon: 'bi-gear',
            style: 'btn-primary',
            loading: () => this.loading,
            function: () => this.executeETL()
          }
        ]
      },
      loading: ()=> this.isLoadingTable,
    }
  }

}
