import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    @Input() idleState: string = 'Undefined'

    canActivateProtectedRoutes$: Observable<boolean> | undefined;
    isAuthenticated$: Observable<boolean> | undefined;
    isDoneLoading$: Observable<boolean> | undefined;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        this.canActivateProtectedRoutes$ = this.authService.canActivateProtectedRoutes$;
        this.isAuthenticated$ = this.authService.isAuthenticated$;
        this.isDoneLoading$ = this.authService.isDoneLoading$;
    }

    login() {
        this.authService.login()
    }

    logout() {
        this.authService.logout();
    }

}
