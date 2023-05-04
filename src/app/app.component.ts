import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthAndIdleService } from './service/auth-and-idle.service';

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

    constructor(private authService: AuthAndIdleService) { }

    ngOnInit(): void {
        this.authService.configureSingleSignOn()
        this.authService.configureIdle()
    }
}
