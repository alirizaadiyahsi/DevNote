import {
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';
import {MenuItem} from "primeng/api";
import {SidebarService} from "../../../../services/sidebar-service";
import {SidebarItem} from "../../../../data-access/entities/sidebar-item";
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent {

    @ViewChild('newRootItemInput') newRootItemInput: ElementRef | undefined;

    sidebarItems: SidebarItem[] = [];
    selectedSidebarItem: any;
    sidebarContextMenuItems: MenuItem[];
    newRootItemInputVisible = false;
    selectNewRootItemInput = true;
    newRootItemInputValue = "New Item";
    errorDialogVisible = false;
    errorMessage = "";
    addSubSidebarItemDialogVisible = false;
    addSubSidebarItemDialogHeader = "";
    newSubItemInputValue = "";

    constructor(private sidebarService: SidebarService, private confirmationService: ConfirmationService) {
        this.sidebarContextMenuItems = [
            {
                label: 'Add Sub Item', icon: 'pi pi-plus', command: (event) => {
                    this.addSubSidebarItemClick();
                }
            },
            {
                label: 'Remove Item', icon: 'pi pi-trash', command: (event) => {
                    this.removeSidebarItem(this.selectedSidebarItem.id);
                }
            }
        ];

        sidebarService.getAll.subscribe(items => {
            this.sidebarItems = items;
        });
    }

    ngAfterViewChecked() {
        if (this.selectNewRootItemInput) {
            this.newRootItemInput?.nativeElement.focus();
            this.newRootItemInput?.nativeElement.select();
        }
    }

    addNewRoot() {
        this.newRootItemInputVisible = true;
    }

    cancelNewRootItem() {
        this.resetNewRootItemInput();
    }

    createNewRootItem() {
        if (this.newRootItemInputValue.trim() === "") {
            this.setErrorDialog("Please enter a name for the new item.");
            return;
        }

        let sidebarItem = {
            data: {
                name: this.newRootItemInputValue
            }
        } as SidebarItem;
        this.sidebarService.add(sidebarItem)
            .then(() => {
                this.resetNewRootItemInput();
            })
            .catch(error => {
                this.setErrorDialog(error.message);
            });
    }

    editRootItem(rowData: any, id: number) {
        if (rowData.name.trim() === "") {
            this.setErrorDialog("Please enter a name for the new item.");
            return;
        }

        let sidebarItem = {
            data: {
                name: rowData.name
            }
        } as SidebarItem;
        this.sidebarService.update(id, sidebarItem)
            .then(() => {
                this.selectNewRootItemInput = false;
            })
            .catch(error => {
                this.setErrorDialog(error.message);
            });
    }

    cancelEditRootItem() {
        this.sidebarItems.forEach(item => {
            item.data.editEnabled = false;
        });
    }

    editRootItemButtonClick(id: number) {
        this.sidebarItems.forEach(item => {
            if (item.id === id) {
                item.data.editEnabled = true;
            }
        });
    }

    disableNewRootItemInputSelection() {
        this.selectNewRootItemInput = false;
    }

    removeSidebarItem(id: number) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.sidebarService.remove(id);
            },
            reject: (type: any) => {
            },
            key: "positionDialog"
        });
    }

    addSubSidebarItemClick() {
        this.addSubSidebarItemDialogHeader = `Add Sub Item to "${this.selectedSidebarItem.data.name}"`;
        this.addSubSidebarItemDialogVisible = true;
    }

    addSubSidebarItem() {
        if (this.newSubItemInputValue.trim() === "") {
            this.setErrorDialog("Please enter a name for the new item.");
            return;
        }

        this.addSubSidebarItemDialogVisible = false;
        let subSidebarItem = {
            data: {
                name: this.newSubItemInputValue
            }
        } as SidebarItem;
        this.sidebarService.addSubItem(this.selectedSidebarItem.id, subSidebarItem)
            .then(() => {
                this.selectNewRootItemInput = false;
            })
            .catch(error => {
                this.setErrorDialog(error.message);
            });
    }

    private resetNewRootItemInput() {
        this.newRootItemInputVisible = false;
        this.selectNewRootItemInput = true;
        this.newRootItemInputValue = "New Item";
    }

    private setErrorDialog(message: string) {
        this.errorMessage = message;
        this.errorDialogVisible = true;
    }
}
