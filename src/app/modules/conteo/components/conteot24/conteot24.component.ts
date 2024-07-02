import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription, take } from 'rxjs';
import { TableModel } from 'src/app/core/interface/generic-table.model';
import { GlobalAppService } from 'src/app/core/services/global-app.service';
import { deleteOldNotification } from 'src/app/share/state/actions/notifications.action';
import { selectNotification } from 'src/app/share/state/selectors/notifications.selector';


@Component({
  selector: 'app-conteot24',
  templateUrl: './conteot24.component.html',
  styleUrls: ['./conteot24.component.scss']
})
export class Conteot24Component implements OnInit {
  table!: TableModel;
  loading: boolean = false;
  loadingMessages: boolean = false;
  isLoadingTable: boolean = false;
  itemID: number[] = [];
  maxDate = new Date();
  horas: { name: string, code: string }[] = [];
  tipoMensajeList: { name: number, code: number }[] = [
    { name: 102, code: 102 },
    { name: 103, code: 103 },
    { name: 104, code: 104 },
    { name: 190, code: 190 },
    { name: 206, code: 206 },
    { name: 299, code: 299 },
    { name: 900, code: 900 },
    { name: 910, code: 910 }
  ];
  formGroup: FormGroup = this.fb.group({
    tipoMensaje: [undefined],
    hora: [],
    date: []
  });
  notificationsSub$: any

  constructor(private _apiService: GlobalAppService, private fb: FormBuilder, private store: Store) {
    this.notificationsSub$ = store.select(selectNotification);
  }

  ngOnInit(): void {
    this.getConteoT24();
    this.selectHoras();
    this.onChange();

    setInterval(() => {
      if (!this.loadingMessages) {
        this.getConteoT24();
      }
    }, 360000)
  }

  onChange() {
    this.formGroup.valueChanges.subscribe(value => {
      if (value.tipoMensaje === null && value.date === null && value.hora === null) { this.getConteoT24() }
      else {
        this._apiService.buscarMensaje(value.tipoMensaje ? value.tipoMensaje : -1, value.date !== null ? moment(value.date).format('YYYY/MM/DD') : moment().format('YYYY/MM/DD'), value.hora ?? '').subscribe({
          next: (result) => this.generateTable(result),
          error: (err) => this.generateTable([])
        })
      }
    });
  }

  selectHoras() {
    this.formGroup.controls['date'].valueChanges.subscribe(value => {
      this._apiService.selectHoras(value != null ? moment(value).format('YYYY/MM/DD') : moment().format('YYYY/MM/DD')).subscribe((result) => {
        this.horas = result.map((e: any) => { return { code: e.hora, name: e.hora } });
      })
    })
  }

  getConteoT24() {
    this.generateTable([]);
    this.isLoadingTable = true;
    this.getCheckedId();
    let prov: any = [];
    this._apiService.getConteo().pipe(take(1)).subscribe({
      next: (response) => {
        this.generateTable(response.filter(e => {
          if (prov.indexOf(e.tipoM) == -1) {
            prov.push(e.tipoM);
            // e.checked = false;
            return e;
          } else return;
        }).map((item: any) => {
          item.totalRecibido = item.totalRecibido == 0 ? '-' : item.totalRecibido;
          item.totalOpe = item.tipoM == 900 || item.tipoM == 103 || item.tipoM == 190 || item.tipoM == 910 ? '' : item.totalOpe == 0 ? '-' : item.totalOpe;
          item.remesasAceptadas = item.tipoM == 900 || item.tipoM == 103 || item.tipoM == 190 || item.tipoM == 910 ? '' : item.remesasAceptadas == 0 ? '-' : item.remesasAceptadas;
          item.ftINAU = item.ftINAU == 0 ? '-' : item.ftINAU;
          item.ftAutorizadas = item.ftAutorizadas == 0 ? '-' : item.ftAutorizadas
          return item
        }));
        this.selectHoras();
        this.loadingMessages = false;
        this.isLoadingTable = false;
      },
      error: () => {
        this.loadingMessages = false;
        this.loading = false;
        this.isLoadingTable = false;
      }
    })
  }

  getCheckedId() {
    this.itemID = localStorage.getItem('checkedId') ? localStorage.getItem('checkedId')!.split(',').map(e => Number(e)) : [];
  }

  compararSuma(item: any) {
    return (((item.tipoM == '102') && (item.ftAutorizadas + item.ftINAU) != (item.totalOpe + item.remesasAceptadas)))
  }

  comparar103(item: any) {
    return ((item.tipoM == '103') && (item.ftAutorizadas + item.ftINAU) != (item.totalRecibido))
  }

  checked(id: any) {
    return this.itemID.filter(e => e === id).length > 0;
  }

  executeETL() {
    this._apiService.ejecutarEtlConteoT24().pipe(take(1)).subscribe({
      next: () => {
        this.getConteoT24();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    })
  }

  generateTable(values: any) {
    this.table = {
      loading: () => this.isLoadingTable,
      caption: 'Conteo T24',
      columns: [
        {
          field: 'tipoM',
          header: 'Tipo Mensaje',
          type: 'number',
          pFrozenColumn: true,
        },
        {
          field: 'totalRecibido',
          header: 'Total Recibido',
          type: 'number'
        },
        {
          field: 'ftAutorizadas',
          header: 'FT Aut',
          type: 'number'
        },
        {
          field: 'ftINAU',
          header: 'FT INAU',
          type: 'number'
        },
        {
          field: 'remesasAceptadas',
          header: 'Remesas Aceptadas',
          type: 'number'
        },
        {
          field: 'totalOpe',
          header: 'Total Operaciones',
          type: 'number'
        },
        {
          field: 'hora',
          header: 'Hora',
          type: 'string'
        },
        {
          field: 'fecha',
          header: 'Fecha',
          type: 'string'
        },
      ],
      actions: {
        buttons: [
          {
            style: 'btn-check',
            function: () => ''
          }
        ]
      },
      button: {
        buttons: [
          {
            label: 'Refrescar',
            icon: 'bi-arrow-counterclockwise',
            style: 'btn-primary',
            loading: () => this.loadingMessages,
            function: () => {
              this.loadingMessages = true
              this.formGroup.reset()
              this.getConteoT24()
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
      values: values,
      cellCheck: (value: any) => {
        return ((this.compararSuma(value)) || this.comparar103(value));
      },
      clickCheck: (id: number) => {
        this.itemID.push(id);
        localStorage.setItem('checkedId', this.itemID.toString());
        this.store.dispatch(deleteOldNotification({ id: id }))
      },
      rowChecked: (value: any) => {
        return this.checked(value.id);
      },
      cellCond: (value: any, header: string) => {
        switch (header) {
          case 'ftAutorizadas':
          case 'ftINAU':
            return (this.compararSuma(value) || this.comparar103(value)) && !this.checked(value.id) ? 'text-red-500 font-bold' : '';
          case 'totalOpe':
          case 'remesasAceptadas':
            return this.compararSuma(value) && !this.checked(value.id) ? 'text-blue-500 font-bold' : '';
        }
        return '';
      }
    }
  }

}
