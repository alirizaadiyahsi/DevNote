import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    token: string | null = null;

    constructor() {

    }

    ngOnInit() {
        this.token = localStorage.getItem("accessToken");
    }
}
