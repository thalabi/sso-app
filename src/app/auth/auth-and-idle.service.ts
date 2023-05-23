import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { JwksValidationHandler, OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, combineLatest, filter, map, of, tap } from 'rxjs';
import { AuthRestService } from './auth-rest.service';


export interface UserInfo { username: string, firstName: string, lastName: string, email: string, roles: Array<String>, backEndAuthorities: Array<String> }

@Injectable({
    providedIn: 'root'
})
export class AuthAndIdleService {
    sessionTimeoutMessage = 'Session timed out due to ' + (+environment.idle.inactivityTimer + +environment.idle.timeoutTimer) / 60 + ' minutes of inactivity'
    ssoLogoutMessage = 'Log out initiated from another browser window'
    idleState: string = 'Not started.'

    private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

    private isDoneLoadingSubject$ = new BehaviorSubject<boolean>(false);
    public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

    /**
     * Publishes `true` if and only if (a) all the asynchronous initial
     * login calls have completed or errorred, and (b) the user ended up
     * being authenticated.
     *
     * In essence, it combines:
     *
     * - the latest known state of whether the user is authorized
     * - whether the ajax calls for initial log in have all been done
     */
    public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
        this.isAuthenticated$,
        this.isDoneLoading$
    ]).pipe(tap(values => console.log('combineLatest from this.isAuthenticated$ and this.isDoneLoading$', values)), map(values => values.every(b => b)));

    constructor(private oauthService: OAuthService, private router: Router, private idle: Idle, private authRestService: AuthRestService) {
        console.log('constructor')

        // refresh access token after 75% of the token's life time is over
        this.oauthService.events.subscribe(({ type: oauthEvent }: OAuthEvent) => {

            console.log('this.oauthService.hasValidAccessToken()', this.oauthService.hasValidAccessToken())
            console.log('this.isAuthenticatedSubject$.next(', this.oauthService.hasValidAccessToken(), ')')
            this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());

            if (oauthEvent !== 'session_unchanged') {
                console.log('oauthEvent:', oauthEvent)
                //console.log('hasValidIdToken', this.oauthService.hasValidIdToken())
            }
            //this.oauthEventMessage = new Date().toTimeString().slice(3, 8) + " " + oauthEvent
            switch (oauthEvent) {
                case 'token_received': {
                    let expiration = new Date(this.oauthService.getAccessTokenExpiration()).toTimeString().slice(0, 8)
                    console.log('access token will expire at:', expiration)
                    break
                }
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

    runInitialLoginSequence(): Promise<void> {
        console.log('runInitialLoginSequence')
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();

        this.oauthService.setupAutomaticSilentRefresh();


        return this.oauthService.loadDiscoveryDocumentAndTryLogin()
            // For demo purposes, we pretend the previous call was very slow
            //.then(() => new Promise<void>(resolve => setTimeout(() => resolve(), 3000)))

            // .then(() => {
            //     console.log('then()')
            //     console.log('this.isDoneLoadingSubject$.next(true)')
            //     this.isDoneLoadingSubject$.next(true)
            // })
            .then(() => {

                console.log('then()')
                console.log('this.isDoneLoadingSubject$.next(true)')
                this.isDoneLoadingSubject$.next(true)

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
            })
            .catch(() => {
                console.log('catch()')
                console.log('this.isDoneLoadingSubject$.next(true)')
                this.isDoneLoadingSubject$.next(true)
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

    login() {
        this.oauthService.initLoginFlow()
    }

    logout() {
        this.oauthService.revokeTokenAndLogout();
    }

    getUserInfo(): Observable<UserInfo> {
        if (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()) {
            return this.authRestService.getUserInfo()
        } else {
            return of({} as UserInfo)
        }
    }
    private getUsername(): string {
        const userClaims: any = this.oauthService.getIdentityClaims()
        console.log('userClaims:', userClaims)
        return userClaims?.preferred_username || "no username"
    }

}
