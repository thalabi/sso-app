import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PingBeComponent } from './ping-be/ping-be.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
    // order of routes is important. Router use first match
    { path: "welcome", component: WelcomeComponent },
    { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
    { path: "ping-be", component: PingBeComponent, canActivate: [AuthGuard] },

    { path: "", redirectTo: "welcome", pathMatch: "full" }, // don't include leading slash otherwise logoutMeassge query param will not work
    { path: "**", redirectTo: "welcome" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
