import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TabItem} from "../../../common/data-access/entities/tab-item";
import {TabService} from "../../../common/services/tab-service";
import {ContextMenu} from "primeng/contextmenu";
import {ConfirmationService} from "primeng/api";

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
    modalTabItemEditVisible = false;
    selectedTabItem: TabItem = {} as TabItem;
    tabContextMenuItems: any;

    constructor(
        private route: ActivatedRoute,
        private tabService: TabService,
        private confirmationService: ConfirmationService
    ) {
        this.tabContextMenuItems = [
            {label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.updateTabItemClick()},
            {label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => this.removeTabItem()}
        ];
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

                if (!this.selectedTabItem.id) {
                    if (this.tabItems.length > 0) {
                        this.selectedTabItem = this.tabItems[0];
                    }
                }
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
                this.selectedTabItem = {id: id, name: itemName, content: "", sidebarItemId: this.sidebarItemId};
            })
            .catch(error => {
                this.setErrorDialog(error.message);
            });
    }

    updateTabItemHeader() {
        if (!this.selectedTabItem || !this.selectedTabItem.name || this.selectedTabItem.name.trim() === "") {
            this.setErrorDialog("Please enter a name for the tab.");
            return;
        }

        this.tabService.updateHeader(this.selectedTabItem)
            .then(() => {
                this.modalTabItemEditVisible = false;
            })
            .catch(error => {
                this.setErrorDialog(error.message);
            });
    }

    updateTabItemContent(tabItem: TabItem) {
        this.tabService.updateContent(tabItem)
            .then(() => {
                this.selectedTabItem = tabItem;
            })
            .catch(error => {
                this.setErrorDialog(error.message);
            });
    }

    removeTabItem() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.tabService.remove(this.selectedTabItem.id);
                this.selectedTabItem = {} as TabItem;
            },
            reject: (type: any) => {
            },
            key: "confirmDialogSidebarDelete"
        });
    }

    openTabItemContextMenu($event: MouseEvent, tabItemContextMenu: ContextMenu, tabItem: TabItem) {
        this.selectedTabItem = {...tabItem};
        tabItemContextMenu.toggle($event);
    }

    onTabChange(tabItem: TabItem) {
        this.selectedTabItem = {...tabItem};
    }

    private setErrorDialog(message: string) {
        this.errorMessage = message;
        this.errorDialogVisible = true;
    }

    private updateTabItemClick() {
        this.modalTabItemEditVisible = true;
    }
}
