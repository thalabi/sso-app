import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { PingBeComponent } from './ping-be/ping-be.component';
import { environment } from '../environments/environment';
import { NgIdleModule } from '@ng-idle/core';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        WelcomeComponent,
        PingBeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        OAuthModule.forRoot({
            resourceServer: {
                // prefixes have to be in lowerr case
                allowedUrls: environment.keycloak.urlPrefixesWithBearerToken,
                sendAccessToken: true
            }
        }),
        NgIdleModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
