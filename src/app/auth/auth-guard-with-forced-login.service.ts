import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AuthAndIdleService } from './auth-and-idle.service';

@Injectable()
export class AuthGuardWithForcedLogin implements CanActivate {


    constructor(
        private authAndIdleService: AuthAndIdleService,
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> {
        console.log('canActivate')
        return this.authAndIdleService.isDoneLoading$.pipe(
            filter(isDone => isDone),
            switchMap(_ => this.authAndIdleService.isAuthenticated$),
            tap(isAuthenticated => isAuthenticated || this.authAndIdleService.login(/*state.url*/)),
        );
    }
}
