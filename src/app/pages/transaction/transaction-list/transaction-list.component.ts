import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';

import { TransactionService } from '@shared/services/transaction.service';
import { PaymentMethodEnum } from '@shared/enums/payment-method.enum';
import { OperationEnum } from '@shared/enums/operation.enum';
import { StatusEnum } from '@shared/enums/status.enum';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: TransactionResponseModel[] = [];
  transactionsLoading: boolean;
  transactionListRequestModel: TransactionListRequestModel = {} as TransactionListRequestModel;

  statuses: any[] = [];
  operations: any[] = [];
  paymentMethods: any[] = [];

  pageIndex = 1;
  pageSize = 10;
  total = 1;

  dateFormat = 'yyyy/MM/dd';
  isAdvancedSearch: boolean;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.initSelectOptions();
  }

  listTransactions() {
    this.transactionsLoading = true;
    this.transactionService.listTransactions(this.transactionListRequestModel)
      .pipe(take(1))
      .subscribe((response: PaginationModel<TransactionResponseModel>) => {
        this.transactions = response.data;
        this.transactionsLoading = false;
      }, err => {
        this.transactionsLoading = false;
        console.log('fetch transaction list error', err);
      });
  }

  initSelectOptions() {
    // Emum to Array Object
    this.statuses = [];
    Object.keys(StatusEnum).map(key => {
      this.statuses.push({ key, label: StatusEnum[key] });
    });

    // Emum to Array Object,
    this.operations = [];
    Object.keys(OperationEnum).map(key => {
      this.operations.push({ key, label: OperationEnum[key] });
    });

    // Emum to Array Object,
    this.paymentMethods = [];
    Object.keys(PaymentMethodEnum).map(key => {
      this.paymentMethods.push({ key, label: PaymentMethodEnum[key] });
    });
  }

  onRangePickerChange(result: Date[]) {
    this.transactionListRequestModel.fromDate = result[0];
    this.transactionListRequestModel.toDate = result[1];
  }

  onAdvancedSearchChange(advancedForm: NgForm) {
    this.isAdvancedSearch = !this.isAdvancedSearch;
    if (!this.isAdvancedSearch) {
      advancedForm.reset();
    }
  }
}
