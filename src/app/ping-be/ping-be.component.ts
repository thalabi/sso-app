import { Component, OnInit } from '@angular/core';
import { RestService } from '../service/rest.service';
import { AuthService, UserInfo } from '../auth/auth.service';
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

    constructor(private restService: RestService, private authService: AuthService) { }

    ngOnInit(): void {

        this.canActivateProtectedRoutes$ = this.authService.canActivateProtectedRoutes$;
        this.isAuthenticated$ = this.authService.isAuthenticated$;
        this.isDoneLoading$ = this.authService.isDoneLoading$;
        // test begin
        this.oAuthEventArray$ = this.authService.oAuthEventArray$;
        // test end


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
