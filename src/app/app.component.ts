import { Component } from '@angular/core';
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

    constructor() {
        console.log('constructor')
    }

    ngOnInit(): void {
    }
}
