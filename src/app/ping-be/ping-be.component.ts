import { Component, OnInit } from '@angular/core';
import { RestService } from '../service/rest.service';
import { AuthAndIdleService, UserInfo } from '../auth/auth-and-idle.service';

@Component({
    selector: 'app-ping-be',
    templateUrl: './ping-be.component.html',
    styleUrls: ['./ping-be.component.css']
})
export class PingBeComponent implements OnInit {

    userInfo: UserInfo = {} as UserInfo;
    noBearerTokenPingResponse: string = "";
    timestamp: Date = {} as Date;


    constructor(private restService: RestService, private authService: AuthAndIdleService) { }

    ngOnInit(): void {
        this.authService.getUserInfo()
            .subscribe((userInfo: UserInfo) => {
                this.userInfo = userInfo;
                console.log('userInfo', this.userInfo);
            })
        //getPingNoBearerToken
        this.restService.getNoBearerTokenPing()
            .subscribe((data: any) => {
                this.noBearerTokenPingResponse = data;
                console.log('noBearerTokenPing response', this.noBearerTokenPingResponse);
            })
        this.timestamp = new Date()
    }


}
