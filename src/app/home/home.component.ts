import { Component, OnInit } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../sso-config';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    name: string = "";
    username: string = "";
    email: string = "";
    timestamp: Date = {} as Date;
    roles: any;

    constructor(private oauthService: OAuthService) { }

    ngOnInit(): void {
        const userClaims: any = this.oauthService.getIdentityClaims();
        console.log('userClaims', userClaims);
        this.name = userClaims.name ? userClaims.name : "no name";
        this.username = userClaims.preferred_username ? userClaims.preferred_username : "no username"
        this.email = userClaims.email ? userClaims.email : "no email"
        const accessToken = this.oauthService.getAccessToken();
        console.log('accessToken', accessToken)
        this.timestamp = new Date()
    }
}
