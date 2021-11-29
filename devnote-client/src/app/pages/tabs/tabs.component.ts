import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TabItem} from "../../../common/data-access/entities/tab-item";
import {TabService} from "../../../common/services/tab-service";
import {SidebarItem} from "../../../common/data-access/entities/sidebar-item";

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.less']
})
export class TabsComponent implements OnInit {

    sidebarItemId: number = 0;
    tabItems: TabItem[] = [];
    addTabInputValue: string = '';
    errorDialogVisible = false;
    errorMessage: any;

    constructor(
        private route: ActivatedRoute,
        private tabService: TabService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.sidebarItemId = +params['id'];
            this.tabService.sidebarItemId = this.sidebarItemId;
            this.tabService.getAll.subscribe(items => {
                this.tabItems = items;
                this.tabItems.push({
                    content: "",
                    sidebarItemId: 0,
                    id: 0,
                    name: ''
                });
            });
        });
    }

    addNewTab(itemName: string) {
        if (!itemName || itemName.trim() === "") {
            this.setErrorDialog("Please enter a name for the tab.");
            return;
        }

        this.tabService.add(new TabItem(this.sidebarItemId, itemName))
            .then((id) => {
                this.addTabInputValue = "";
            })
            .catch(error => {
                this.setErrorDialog(error.message);
            });
    }

    private setErrorDialog(message: string) {
        this.errorMessage = message;
        this.errorDialogVisible = true;
    }
}
