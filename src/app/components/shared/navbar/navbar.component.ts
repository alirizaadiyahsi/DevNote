import {Component, Inject, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {DOCUMENT} from "@angular/common";
import {SettingService} from "../../../../common/services/setting-service";
import {Setting, SettingKeys} from "../../../../common/data-access/entities/setting";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

    topBarItems: MenuItem[];

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private settingService: SettingService
    ) {
        this.topBarItems = [
            {
                label: 'Settings',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Themes',
                        icon: 'pi pi-fw pi-palette',
                        items: [
                            {
                                label: 'Light',
                                icon: 'pi pi-fw pi-circle',
                                command: () => this.changeTheme('mdc-light-indigo')
                            },
                            {
                                label: 'Dark',
                                icon: 'pi pi-fw pi-circle-fill',
                                command: () => this.changeTheme('mdc-dark-indigo')
                            }
                        ]
                    }
                ]
            }
        ];
    }

    ngOnInit(): void {
        this.settingService.getByKey(SettingKeys.APP_THEME).then(setting => {
            // @ts-ignore
            this.changeTheme(setting.value);
        });
    }

    private changeTheme(theme: string) {
        let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
        if (themeLink) {
            this.settingService.addOrUpdate({key: SettingKeys.APP_THEME, value: theme} as Setting);
            themeLink.href = theme + '.css';
        }
    }
}
