import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { ClientService } from '@shared/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  transactionId: string;

  client: ClientResponseModel;
  clientLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transactionId = params['transactionId'];
      if (this.transactionId) {
        this.getClient({ transactionId: this.transactionId });
      }
    });
  }

  getClient(clientRequestModel: ClientRequestModel) {
    this.clientLoading = true;
    this.clientService.getClient(clientRequestModel)
      .pipe(take(1))
      .subscribe((response: ClientResponseModel) => {
        this.client = response;
        this.clientLoading = false;
      }, err => {
        this.clientLoading = false;
        console.log('fetch transaction error', err);
      });
  }
}
