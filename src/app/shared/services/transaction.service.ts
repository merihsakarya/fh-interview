import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SharedModule } from '@shared/shared.module';
import { environment } from '@env/environment';

const apiUrl = `${environment.API_URL}/${environment.API_VERSION}`;

@Injectable({
  providedIn: SharedModule
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  listTransactionReports(reportRequestModel: ReportRequestModel): Observable<StatusResponseModel<ReportResponseModel>> {
    // Because of CORS problem I used Mock data. We directly geting data from JSON object.
    return this.http.get<StatusResponseModel<ReportResponseModel>>('./assets/mock/report.json');

    // Note: Ask for why Post method used intead of Get method.
    // return this.http.post<ReportResponseModel[]>(`${apiUrl}/transactions/report`, reportRequestModel);
  }

  listTransactions(transactionListRequestModel: TransactionListRequestModel): Observable<PaginationModel<TransactionResponseModel>> {
    // Because of CORS problem I used Mock data. We directly geting data from JSON object.
    return this.http.get<PaginationModel<TransactionResponseModel>>('./assets/mock/transaction-list.json');

    // Note: Ask for why Post method used intead of Get method. '/transactions'
    // return this.http.post<TransactionResponseModel[]>(`${apiUrl}/transaction/list`, transactionListRequestModel);
  }

  getTransaction(transactionRequestModel: TransactionRequestModel): Observable<TransactionResponseModel> {
    // Because of CORS problem I used Mock data. We directly geting data from JSON object.
    return this.http.get<TransactionResponseModel>('./assets/mock/transaction.json');

    // Note: Ask for why Post method used intead of Get method. 'transactions/{transactionId}'
    // return this.http.post<TransactionResponseModel>(`${apiUrl}/transaction`, transactionRequestModel);
  }

}
