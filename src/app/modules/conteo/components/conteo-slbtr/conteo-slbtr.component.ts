import { Component, OnInit } from '@angular/core';
import { forkJoin, take } from 'rxjs';
import { Slbtr } from 'src/app/core/interface/conteo-slbtr.model';
import { TableModel } from 'src/app/core/interface/generic-table.model';
import { GlobalAppService } from 'src/app/core/services/global-app.service';

@Component({
  selector: 'app-conteo-slbtr',
  templateUrl: './conteo-slbtr.component.html',
  styleUrls: ['./conteo-slbtr.component.scss']
})
export class ConteoSlbtrComponent implements OnInit {
  table!: TableModel;
  loading: boolean = false;
  loadingMessages: boolean = false;
  isLoadingTable: boolean = false;

  constructor(private _apiService: GlobalAppService) { }
  ngOnInit(): void {
    this.getMensajes();
    setInterval(() => {
      if (this.loadingMessages != true) {
        this.getMensajes();
      }
    }, 360000);
  }

  async getMensajes() {
    this.generateTableSLBTR([], []);
    this.isLoadingTable = true;
    const conteo = await this.getConteoSLBTR();
    const mensajeSLBTR = await this.getMessagesSLBTR();
    this.loading = false;
    this.loadingMessages = false;
    this.isLoadingTable = false;
    this.generateTableSLBTR(mensajeSLBTR, conteo);
  }

  getMessagesSLBTR() {
    return new Promise((resolve, reject) => {
      this._apiService.getMensajeSLBTR().pipe(take(1)).subscribe({
        next: (result) => {
          resolve(result)
        },
        error: () => {
          resolve([])
        }
      });
    })
  }

  async getConteoSLBTR() {
    return new Promise((resolve, reject) => {
      this._apiService.getConteoSLBTR().pipe(take(1)).subscribe({
        next: (result) => {
          resolve(result.map((e) => { return { ...e, totales: 'Totales' } }));
        },
        error: () => {
          resolve([])
        }
      })
    });
  }

  executeETL() {
    this._apiService.ejecutarEtlSLBTR().pipe(take(1)).subscribe({
      next: () => {
        this.getMensajes()
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  generateTableSLBTR(values: any, value2: any) {
    this.table = {
      loading: () => this.isLoadingTable,
      caption: 'Conteo SLBTR',
      columns: [
        {
          field: 'fecha',
          header: 'Fecha',
          type: 'Date',
          pFrozenColumn: true,
        }, {
          field: 'hora',
          header: 'Hora',
          type: 'Hour',
          pFrozenColumn: true,
        }, {
          field: 'MT_102',
          header: 'MT_102',
          type: 'number'
        }, {
          field: 'transf_102',
          header: 'T_102',
          type: 'number'
        }, {
          field: 'Mt_103',
          header: 'MT_103',
          type: 'number'
        }, {
          field: 'MT_104',
          header: 'MT_104',
          type: 'number'
        }, {
          field: 'transf_104',
          header: 'T_104',
          type: 'number'
        }, {
          field: 'MT_190',
          header: 'MT_190',
          type: 'number'
        }, {
          field: 'MT_206',
          header: 'MT_206',
          type: 'number'
        }, {
          field: 'transf_206',
          header: 'T_206',
          type: 'number'
        }, {
          field: 'MT_900',
          header: 'MT_900',
          type: 'number'
        }, {
          field: 'MT_910',
          header: 'MT_910',
          type: 'number'
        }, {
          field: 'MT_950',
          header: 'MT_950',
          type: 'number'
        },
      ],
      values: values,
      footerHeader: [
        {
          field: 'fecha',
          header: 'Fecha',
          type: 'Date',
          pFrozenColumn: true
        }, {
          field: 'totales',
          header: 'All',
          type: 'string',
          pFrozenColumn: true
        }, {
          field: 'MT_102',
          header: 'MT_102',
          type: 'number'
        }, {
          field: 'transf_102',
          header: 'T_102',
          type: 'number'
        }, {
          field: 'Mt_103',
          header: 'MT_103',
          type: 'number'
        }, {
          field: 'MT_104',
          header: 'MT_104',
          type: 'number'
        }, {
          field: 'transf_104',
          header: 'T_104',
          type: 'number'
        }, {
          field: 'MT_190',
          header: 'MT_190',
          type: 'number'
        }, {
          field: 'MT_206',
          header: 'MT_206',
          type: 'number'
        }, {
          field: 'transf_206',
          header: 'T_206',
          type: 'number'
        }, {
          field: 'MT_900',
          header: 'MT_900',
          type: 'number'
        }, {
          field: 'MT_910',
          header: 'MT_910',
          type: 'number'
        }, {
          field: 'MT_950',
          header: 'MT_950',
          type: 'number'
        },
      ],
      footerValue: value2,
      button: {
        buttons: [
          {
            label: 'Refrescar',
            icon: 'bi-arrow-counterclockwise',
            style: 'btn-primary',
            loading: () => this.loadingMessages,
            function: () => {
              this.loadingMessages = true
              this.getMensajes()
            }
          },
          {
            label: 'Ejecutar ETL',
            icon: 'bi-gear',
            style: 'btn-primary',
            loading: () => this.loading,
            function: () => {
              this.loading = true;
              this.executeETL()
            }
          },
        ]
      },
    }

  }

}
