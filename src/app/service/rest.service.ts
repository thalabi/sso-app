import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(private http: HttpClient) { }

    getPing() {
        return this.http.get('http://localhost:8080/ping');
    }
    getNoBearerTokenPing() {
        return this.http.get('http://localhost:8080/noBearerTokenPing');
    }
}
