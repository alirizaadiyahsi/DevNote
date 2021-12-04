import {Component, ElementRef, ViewChild} from '@angular/core';
import {SidebarService} from "../../../../common/services/sidebar-service";
import {ConfirmationService} from 'primeng/api';
import {SidebarItem} from "../../../../common/data-access/entities/sidebar-item";
import {ContextMenu} from "primeng/contextmenu";
import {TabService} from "../../../../common/services/tab-service";
import {Router} from "@angular/router";
import {TabItem} from "../../../../common/data-access/entities/tab-item";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent {

    @ViewChild("addItemInput") private addItemInput: ElementRef | undefined;

    sidebarItems: SidebarItem[] = [];
    addItemInputVisible = false;
    addItemInputValue: any;
    sidebarContextMenuItems: any;
    selectedSidebarItem: SidebarItem = {} as SidebarItem;
    selectedSidebarItems: SidebarItem [] = [];
    modalSidebarItemEditVisible = false;
    errorDialogVisible = false;
    errorMessage = "";

    constructor(
        private sidebarService: SidebarService,
        private tabService: TabService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {
        this.sidebarContextMenuItems = [
            {label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.updateSidebarItemClick()},
            {label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => this.removeSidebarItem()}
        ];

        sidebarService.getAll.subscribe(items => {
            this.sidebarItems = items;
            if (!this.selectedSidebarItem.id) {
                if (this.sidebarItems.length > 0) {
                    this.selectedSidebarItem = this.sidebarItems[0];
                    this.selectedSidebarItems = [this.selectedSidebarItem];
                    this.router.navigate(['/tabs', this.selectedSidebarItem.id]);
                }
            } else {
                this.selectedSidebarItems = [this.sidebarItems.filter(item => item.id === this.selectedSidebarItem.id)[0]];
                this.router.navigate(['/tabs', this.selectedSidebarItem.id]);
            }
        });
    }

    addItem(itemName: string) {
        if (!itemName || itemName.trim() === "") {
            this.setErrorDialog("Please enter a name for the item.");
            return;
        }

        this.sidebarService.add(new SidebarItem(itemName))
            .then((id) => {
                this.addItemInputVisible = false;
                this.addItemInputValue = "";
                this.selectedSidebarItem = {id: id, name: itemName, order: 0};

                this.tabService.add({
                    name: "New Tab",
                    content: "",
                    sidebarItemId: id
                } as TabItem)
            })
            .catch(error => {
                this.setErrorDialog(error.message);
            });
    };

    updateSidebarItem() {
        if (!this.selectedSidebarItem || !this.selectedSidebarItem.name || this.selectedSidebarItem.name.trim() === "") {
            this.setErrorDialog("Please enter a name for the item.");
            return;
        }

        this.sidebarService.update(this.selectedSidebarItem)
            .then(() => {
                this.modalSidebarItemEditVisible = false;
            })
            .catch(error => {
                this.setErrorDialog(error.message);
            });
    }

    removeSidebarItem() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.sidebarService.remove(this.selectedSidebarItem.id, true);
                this.selectedSidebarItem = {} as SidebarItem;
            },
            reject: (type: any) => {
            },
            key: "confirmDialogSidebarDelete"
        });
    }

    openSidebarItemContextMenu($event: MouseEvent, sidebarItemContextMenu: ContextMenu, sidebarItem: any) {
        this.selectedSidebarItem = {...sidebarItem};
        sidebarItemContextMenu.toggle($event);
    }

    gotoTabsPage(event: any) {
        let sidebarItem = event.value[0];
        this.router.navigate(['/tabs', sidebarItem.id]);
    }

    private updateSidebarItemClick() {
        this.modalSidebarItemEditVisible = true;
    }

    private setErrorDialog(message: string) {
        this.errorMessage = message;
        this.errorDialogVisible = true;
    }

    onReorderSidebar($event: any) {
        this.sidebarItems.forEach((item, index) => {
            item.order = index;
        });

        this.sidebarService.bulkUpdate(this.sidebarItems);
    }
}
