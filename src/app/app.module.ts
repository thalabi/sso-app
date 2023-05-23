import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { PingBeComponent } from './ping-be/ping-be.component';
import { AuthModule } from './auth/auth.module';
import { RestService } from './service/rest.service';

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
        AuthModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [
        RestService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
