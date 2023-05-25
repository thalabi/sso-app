import { Component, OnInit } from '@angular/core';
import { RestService } from '../service/rest.service';
import { AuthAndIdleService, UserInfo } from '../auth/auth-and-idle.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-ping-be',
    templateUrl: './ping-be.component.html',
    styleUrls: ['./ping-be.component.css']
})
export class PingBeComponent implements OnInit {

    userInfo: UserInfo = {} as UserInfo;
    noBearerTokenPingResponse: string = "";
    timestamp: Date = {} as Date;

    canActivateProtectedRoutes$: Observable<boolean> | undefined;
    isAuthenticated$: Observable<boolean> | undefined;
    isDoneLoading$: Observable<boolean> | undefined;
    // test begin
    oAuthEventArray$: Observable<string[]> | undefined;
    // test end

    constructor(private restService: RestService, private authAndIdleService: AuthAndIdleService) { }

    ngOnInit(): void {

        this.canActivateProtectedRoutes$ = this.authAndIdleService.canActivateProtectedRoutes$;
        this.isAuthenticated$ = this.authAndIdleService.isAuthenticated$;
        this.isDoneLoading$ = this.authAndIdleService.isDoneLoading$;
        // test begin
        this.oAuthEventArray$ = this.authAndIdleService.oAuthEventArray$;
        // test end


        this.authAndIdleService.getUserInfo()
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
