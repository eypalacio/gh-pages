import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repair } from '../interface/conteo-repair.model';
import { ConteoT24 } from '../interface/conteo.t24.model';
import { MT299 } from '../interface/conteo-mt299.model';
import { MT206SLBTR } from '../interface/conteo-mt206.model';
import { Slbtr } from '../interface/conteo-slbtr.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GlobalAppService {

  constructor(private http: HttpClient) { }

  getConteoT24SLBTR(): Observable<Slbtr[]> {
    return this.http.get<Slbtr[]>(`${environment.apiURL}ConteoT24SLBTR`);
  }

  getMensajeSLBTR(): Observable<Slbtr[]> {
    return this.http.get<Slbtr[]>(`${environment.apiURL}mensajesSLBTR`);
  }

  getConteoSLBTR() {
    return this.http.get<Slbtr[]>(`${environment.apiURL}conteoSLBTR`);
  }

  ejecutarEtlSLBTR() {
    return this.http.get(`${environment.execETL}ejecutarConteoSlbtr`);
  }

  getConteo(): Observable<ConteoT24[]> {
    return this.http.get<ConteoT24[]>(`${environment.apiURL}mensajesT24`);
  }

  // buscarConteoT24(tipo: number = 0, fecha: string = '', hora: string = ''): Observable<ConteoT24[]> {
  //   let dir = `${environment.apiURL}buscarConteoT24s`;
  //   return this.http.get<ConteoT24[]>(dir, { params: { 'tipo': tipo, 'fecha': fecha, 'hora': hora } });
  // }

  buscarMensaje(tipo: number = 0, fecha: string = '', hora: string = ''): Observable<ConteoT24[]> {
    let dir = `${environment.apiURL}buscarMensajes`;
    return this.http.get<ConteoT24[]>(dir, { params: { 'tipo': tipo, 'fecha': fecha, 'hora': hora } });
  }

  selectHoras(fecha: string = ''): Observable<string[]> {
    let dir = `${environment.apiURL}mostrarHoras`;
    return this.http.get<string[]>(dir, { params: { 'fecha': fecha } });
  }

  ejecutarEtlConteoT24() {
    return this.http.get(`${environment.execETL}ejecutarConteoT24`);
  }

  getRepair(): Observable<Repair[]> {
    return this.http.get<Repair[]>(`${environment.apiURL}repair`);
  }

  setEstado(id: number) {
    let dir = `${environment.apiURL}setEstado`;
    return this.http.put(dir, { id: id });
  }

  getMT299(): Observable<MT299[]> {
    return this.http.get<MT299[]>(`${environment.apiURL}mt299`);
  }

  getMT206SLBTR(): Observable<MT206SLBTR[]> {
    return this.http.get<MT206SLBTR[]>(`${environment.apiURL}mt206slbtr`);
  }

  ejecutarETLMT299() {
    return this.http.get(`${environment.apiURL}ejecutarMT299`);
  }

}
