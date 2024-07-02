import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchTablePipe } from './core/pipes/search-table.pipe';
import { GlobalInterceptor } from './core/interceptors/global.interceptor';
import { DialogService } from 'primeng/dynamicdialog';
import { Error500Component } from './core/pages/error-500/error-500.component';
import { ButtonComponent } from './core/components/button/button.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCER } from './share/state/app.state';
import { SplashScreenComponent } from './core/pages/splash-screen/splash-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchTablePipe,
    Error500Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonComponent,
    ToastModule,
    SplashScreenComponent,
    StoreModule.forRoot(ROOT_REDUCER)
  ],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true }], DialogService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
