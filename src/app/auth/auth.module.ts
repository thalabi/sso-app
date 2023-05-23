import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthConfig, OAuthModule, OAuthModuleConfig, OAuthStorage } from 'angular-oauth2-oidc';
import { authAppInitializerFactory } from './auth-app-initializer.factory';
import { authCodeFlowConfig } from './auth-config';
//import { AuthGuardWithForcedLogin } from './auth-guard-with-forced-login.service';
import { AuthAndIdleService } from './auth-and-idle.service';
import { AuthGuard } from './auth.guard';
import { NgIdleModule } from '@ng-idle/core';
import { authModuleConfig } from './auth-module-config';
import { AuthRestService } from './auth-rest.service';

// We need a factory since localStorage is not available at AOT build time
export function storageFactory(): OAuthStorage {
    return localStorage;
}

@NgModule({
    imports: [
        HttpClientModule,
        OAuthModule.forRoot(),
        NgIdleModule.forRoot()
    ],
    providers: [
        AuthRestService,
        AuthAndIdleService,
        AuthGuard,
        //AuthGuardWithForcedLogin,
    ],
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                { provide: APP_INITIALIZER, useFactory: authAppInitializerFactory, deps: [AuthAndIdleService], multi: true },
                { provide: AuthConfig, useValue: authCodeFlowConfig },
                { provide: OAuthModuleConfig, useValue: authModuleConfig },
                { provide: OAuthStorage, useFactory: storageFactory },
            ]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
        if (parentModule) {
            throw new Error('AuthModule is already loaded. Import it in the AppModule only');
        }
    }
}
