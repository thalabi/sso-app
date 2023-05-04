import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAndIdleService } from '../service/auth-and-idle.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    @Input() oauthEventMessage: string = 'Undefined'
    @Input() idleState: string = 'Undefined'

    constructor(private authAndIdleService: AuthAndIdleService, private router: Router) { }

    ngOnInit(): void {
    }

    login() {
        this.authAndIdleService.login()
    }

    logout() {
        this.authAndIdleService.logout();
    }

    get loggedIn() {
        return this.authAndIdleService.isLoggedIn()
    }
}
