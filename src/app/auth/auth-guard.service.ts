import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthAndIdleService } from './auth-and-idle.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authAndIdleService: AuthAndIdleService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> {
        return this.authAndIdleService.canActivateProtectedRoutes$
            .pipe(tap(x => console.log('You tried to go to ' + state.url + ' and this guard said ' + x)));
    }
}
