import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { PingBeComponent } from './ping-be/ping-be.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    { path: "welcome", component: WelcomeComponent },
    { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
    { path: "ping-be", component: PingBeComponent, canActivate: [AuthGuard] },
    { path: "", redirectTo: "welcome", pathMatch: "full" },
    { path: "**", redirectTo: "welcome", pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
