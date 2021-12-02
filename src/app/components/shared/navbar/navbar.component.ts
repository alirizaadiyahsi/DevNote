import {Component, Inject, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

    topBarItems: MenuItem[];

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.topBarItems = [
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Light Theme',
                        icon: 'pi pi-fw pi-circle',
                        command: () => {
                            this.changeTheme('mdc-light-indigo');
                        }
                    },
                    {
                        label: 'Dark Theme',
                        icon: 'pi pi-fw pi-circle-fill',
                        command: () => {
                            this.changeTheme('mdc-dark-indigo');
                        }
                    }
                ]
            }
        ];
    }

    ngOnInit(): void {
    }

    private changeTheme(theme: string) {
        let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

        if (themeLink) {
            themeLink.href = theme + '.css';
        }
    }
}
