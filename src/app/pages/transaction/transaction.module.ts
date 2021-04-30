import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionListComponent
  },
  {
    path: ':id',
    component: TransactionDetailComponent
  }
];

@NgModule({
  declarations: [TransactionListComponent, TransactionDetailComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class TransactionModule { }
