import { Component, Input, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    @Input() oauthEventMessage: string = 'Undefined'
    @Input() idleState: string = 'Undefined'

    constructor(private oauthService: OAuthService, private router: Router) { }

    ngOnInit(): void {
    }

    login() {
        this.oauthService.initLoginFlow()
    }

    logout() {
        this.oauthService.revokeTokenAndLogout();
    }

    get token() {
        let claims: any = this.oauthService.getIdentityClaims();
        return claims ? claims : null;
    }
}
