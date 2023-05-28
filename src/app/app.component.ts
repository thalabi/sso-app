import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from './auth/auth.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'sso-app'
    sessionTimeoutMessage = 'Session timed out due to ' + (+environment.idle.inactivityTimer + +environment.idle.timeoutTimer) / 60 + ' minutes of inactivity'
    ssoLogoutMessage = 'Log out initiated from another browser window'
    idleState: string = 'Not started.'

    constructor(private authService: AuthService, private idle: Idle) {
        console.log('constructor')
    }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            console.log('this.configureIdle() and start watching ...')
            this.configureIdle()
            this.idle.watch()
        }
    }

    private configureIdle() {
        console.log('configureIdle()')
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
            this.idleState = 'timeoutWarning, seconds left: ' + secondsLeft
            console.log('idleState', this.idleState)
        });
        this.idle.onTimeout.subscribe(() => {
            this.idleState = 'timeout'
            console.log('idleState', this.idleState)

            // force logout due to idle timeout
            this.authService.logout(this.sessionTimeoutMessage)
        })
    }

}
