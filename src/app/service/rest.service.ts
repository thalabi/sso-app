import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserInfo } from './auth-and-idle.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(private http: HttpClient) { }

    getUserInfo(): Observable<UserInfo> {
        console.log('getUserInfo')
        return this.http.get<UserInfo>(environment.beRestServiceUrl + '/protected/sandboxController/getUserInfo');
    }
    getNoBearerTokenPing() {
        console.log('getNoBearerTokenPing')
        return this.http.get(environment.beRestServiceUrl + '/sandboxController/noBearerTokenPing');
    }
}
