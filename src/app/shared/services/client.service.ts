import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SharedModule } from '@shared/shared.module';
import { environment } from '@env/environment';

const apiUrl = `${environment.API_URL}/${environment.API_VERSION}`;

@Injectable({
  providedIn: SharedModule
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClient(clientRequestModel: ClientRequestModel): Observable<ClientResponseModel> {
    // Because of CORS problem I used Mock data. We directly geting data from JSON object.
    return this.http.get<ClientResponseModel>('./assets/mock/client.json');

    // Note: Ask for why Post method used intead of Get method.
    // return this.http.post<ClientResponseModel>(`${apiUrl}/client`, clientRequestModel);
  }

}
