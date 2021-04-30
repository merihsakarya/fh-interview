import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { IconsProviderModule } from './icons-provider.module';
import { httpInterceptorProviders } from '@core/interceptors';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from './layout/layout.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    LayoutModule,
    IconsProviderModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    ...httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
