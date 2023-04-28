import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './sso-config';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'sso-app'
    sessionTimeoutMessage = 'Session timed out due to ' + (+environment.idle.inactivityTimer + +environment.idle.timeoutTimer) / 60 + ' minutes of inactivity'
    ssoLogoutMessage = 'Log out initiated from another browser window'
    oauthEventMessage: string = 'Undefined'
    idleState: string = 'Not started.'

    constructor(private oauthService: OAuthService, private router: Router, private idle: Idle) { }

    ngOnInit(): void {
        this.configureSingleSignOn()
        this.configureIdle()
    }
    configureSingleSignOn() {
        this.oauthService.configure(authCodeFlowConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.loadDiscoveryDocumentAndTryLogin(
        ).then(result => {
            if (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()) {
                console.log("logged in");

                const username: string = this.getUsername()
                console.log('username:', username)

                this.idle.watch()

                // dynamic routing based on username
                if (username === 'sso2user1') {
                    this.router.navigate(['/ping-be']);
                }
            }

        });
        // refresh access token after 75% of the token's life time is over
        this.oauthService.setupAutomaticSilentRefresh();
        this.oauthService.events.subscribe(({ type: oauthEvent }: OAuthEvent) => {
            if (oauthEvent !== 'session_unchanged') {
                console.log('oauthEvent:', oauthEvent)
                //console.log('hasValidIdToken', this.oauthService.hasValidIdToken())
            }
            this.oauthEventMessage = new Date().toTimeString().slice(3, 8) + " " + oauthEvent
            switch (oauthEvent) {
                case 'session_terminated':
                case 'token_refresh_error': {
                    // when user logs from another window and revokes the token
                    // logout due to token revoked by another sign on
                    this.oauthService.revokeTokenAndLogout(
                        {
                            client_id: this.oauthService.clientId,
                            post_logout_redirect_uri: this.oauthService.redirectUri + '?logoutMessage=' + this.ssoLogoutMessage
                        }
                    )
                    break
                }
                default: {
                    break
                }
            }
        })
    }

    configureIdle() {
        // the plus before the string converts it to number
        this.idle.setIdle(+environment.idle.inactivityTimer); // how long can they be inactive before considered idle, in seconds
        this.idle.setTimeout(+environment.idle.timeoutTimer); // how long can they be idle before considered timed out, in seconds
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // provide sources that will "interrupt" aka provide events indicating the user is active

        this.idle.onIdleStart.subscribe(() => {
            this.idleState = 'idleStart'
            console.log('idleState', this.idleState)
        });
        this.idle.onIdleEnd.subscribe(() => {
            this.idleState = 'idleEnd'
            console.log('idleState', this.idleState)
        });
        this.idle.onTimeoutWarning.subscribe((secondsLeft: number) => {
            this.idleState = 'timeoutWarning, seconds left' + secondsLeft
            console.log('idleState', this.idleState)
        });
        this.idle.onTimeout.subscribe(() => {
            this.idleState = 'timeout'
            console.log('idleState', this.idleState)

            // force logout due to idle timeout
            this.oauthService.revokeTokenAndLogout(
                {
                    client_id: this.oauthService.clientId,
                    post_logout_redirect_uri: this.oauthService.redirectUri + '?logoutMessage=' + this.sessionTimeoutMessage
                }
            )
        })
    }

    private getUsername(): string {
        const userClaims: any = this.oauthService.getIdentityClaims()
        console.log('userClaims:', userClaims)
        let expiration = new Date(this.oauthService.getAccessTokenExpiration()).toTimeString().slice(0, 8)
        console.log('access token expiration:', expiration)
        return userClaims?.preferred_username || "no username"
    }
}
