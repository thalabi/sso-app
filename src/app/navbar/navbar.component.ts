import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAndIdleService } from '../auth/auth-and-idle.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    @Input() oauthEventMessage: string = 'Undefined'
    @Input() idleState: string = 'Undefined'

    canActivateProtectedRoutes$: Observable<boolean> | undefined;
    isAuthenticated$: Observable<boolean> | undefined;
    isDoneLoading$: Observable<boolean> | undefined;

    constructor(private authAndIdleService: AuthAndIdleService, private router: Router) {
    }

    ngOnInit(): void {
        this.canActivateProtectedRoutes$ = this.authAndIdleService.canActivateProtectedRoutes$;
        this.isAuthenticated$ = this.authAndIdleService.isAuthenticated$;
        this.isDoneLoading$ = this.authAndIdleService.isDoneLoading$;
    }

    login() {
        this.authAndIdleService.login()
    }

    logout() {
        this.authAndIdleService.logout();
    }

}
