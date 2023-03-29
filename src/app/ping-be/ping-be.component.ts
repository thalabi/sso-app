import { Component, OnInit } from '@angular/core';
import { RestService } from '../service/rest.service';

@Component({
    selector: 'app-ping-be',
    templateUrl: './ping-be.component.html',
    styleUrls: ['./ping-be.component.css']
})
export class PingBeComponent implements OnInit {

    pingResponse: string = "";
    noBearerTokenPingResponse: string = "";

    constructor(private restService: RestService,) { }

    ngOnInit(): void {
        this.restService.getPing()
            .subscribe((data: any) => {
                this.pingResponse = data;
                console.log('ping response', this.pingResponse);
            })
        //getPingNoBearerToken
        this.restService.getNoBearerTokenPing()
            .subscribe((data: any) => {
                this.noBearerTokenPingResponse = data;
                console.log('noBearerTokenPing response', this.noBearerTokenPingResponse);
            })
    }


}
