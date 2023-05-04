import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    name: string = "";
    username: string = "";
    email: string = "";
    timestamp: Date = {} as Date;
    roles: any;

    constructor() { }

    ngOnInit(): void {
        this.timestamp = new Date()
    }
}
