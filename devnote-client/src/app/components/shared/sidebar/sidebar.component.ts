import {Component} from '@angular/core';
import {SidebarService} from "../../../../common/services/sidebar-service";
import {ConfirmationService} from 'primeng/api';
import {SidebarItem} from "../../../../common/data-access/entities/sidebar-item";
import {ContextMenu} from "primeng/contextmenu";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent {

    sidebarItems: SidebarItem[] = [];
    addItemInputVisible = false;
    addItemInputValue: any;
    sidebarContextMenuItems: any;
    selectedSidebarItem: SidebarItem = {} as SidebarItem;
    modalSidebarItemEditVisible = false;
    errorDialogVisible = false;
    errorMessage = "";

    constructor(private sidebarService: SidebarService, private confirmationService: ConfirmationService) {
        sidebarService.getAll.subscribe(items => {
            this.sidebarItems = items;
        });

        this.sidebarContextMenuItems = [
            {label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.updateSidebarItemClick()},
            {label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => this.removeSidebarItem()}
        ];
    }

    addItem(itemName: string) {
        if (!itemName || itemName.trim() === "") {
            this.setErrorDialog("Please enter a name for the new item.");
            return;
        }

        this.sidebarService.add(new SidebarItem(itemName))
            .then(() => {
                this.addItemInputVisible = false;
            })
            .catch(error => {
                this.setErrorDialog(error.message);
            });
    };

    updateSidebarItem() {
        if (!this.selectedSidebarItem || !this.selectedSidebarItem.name || this.selectedSidebarItem.name.trim() === "") {
            this.setErrorDialog("Please enter a name for the new item.");
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
                this.sidebarService.remove(this.selectedSidebarItem.id);
            },
            reject: (type: any) => {
            },
            key: "confirmDialogSidebarDelete"
        });
    }

    openSidebarItemContextMenu($event: MouseEvent, sidebarItemContextMenu: ContextMenu, sidebarItem: any) {
        this.selectedSidebarItem = {...sidebarItem};
        sidebarItemContextMenu.show($event);
    }

    private updateSidebarItemClick() {
        this.modalSidebarItemEditVisible = true;
    }

    private setErrorDialog(message: string) {
        this.errorMessage = message;
        this.errorDialogVisible = true;
    }
}
