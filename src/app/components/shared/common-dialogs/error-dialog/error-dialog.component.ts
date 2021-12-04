import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.component.html',
    styleUrls: ['./error-dialog.component.less']
})
export class ErrorDialogComponent implements OnInit {
    @Input() errorDialogVisible: any;
    @Input() errorMessage: any;

    constructor() {
    }

    ngOnInit(): void {
    }

}
