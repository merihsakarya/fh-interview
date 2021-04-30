import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { TransactionService } from '@shared/services/transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  transactionId: string;
  transaction: TransactionResponseModel;
  transactionLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService) { }

  ngOnInit() {
    // NOTE: After Angular 7.2 the router gains a new feature allowing to pass data
    // to the component you want to navigate to, without adding them into the URL.
    // So if the Transaction data exactly same in Transaciton list. We can pass the data from TransactionList page
    // and get it here usins 'extras.state' like code 'this.router.getCurrentNavigation().extras.state.transaction'
    // So in that way we don't need to call API again or store the data in shared service.

    this.route.params.subscribe(params => {
      this.transactionId = params['id'];
      if (this.transactionId) {
        this.getTransaction({ transactionId: this.transactionId });
      }
    });
  }

  getTransaction(transactionRequestModel: TransactionRequestModel) {
    this.transactionLoading = true;
    this.transactionService.getTransaction(transactionRequestModel)
      .pipe(take(1))
      .subscribe((response: TransactionResponseModel) => {
        this.transaction = response;
        this.transactionLoading = false;
      }, err => {
        this.transactionLoading = false;
        console.log('fetch transaction error', err);
      });
  }

}
