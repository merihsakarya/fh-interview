import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';

const routes: Routes = [
  {
    path: ':transactionId',
    component: ClientComponent
  }
];

@NgModule({
  declarations: [ClientComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class ClientModule { }
