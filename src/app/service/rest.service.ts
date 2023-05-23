import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(private http: HttpClient) { }

    getNoBearerTokenPing() {
        console.log('getNoBearerTokenPing')
        return this.http.get(environment.beRestServiceUrl + '/sandboxController/noBearerTokenPing');
    }
}
