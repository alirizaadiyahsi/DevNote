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

    constructor(private sidebarService: SidebarService, private confirmationService: ConfirmationService) {
        this.sidebarContextMenuItems = [
            {label: 'Add Sub Item', icon: 'pi pi-plus', command: (event) => console.log(event)},
            {label: 'Remove Item', icon: 'pi pi-trash', command: (event) => console.log(event)}
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

    disableNewRootItemInputSelection() {
        this.selectNewRootItemInput = false;
    }

    removeSidebarItem(id: number) {
        // todo: this can be global
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

    private resetNewRootItemInput() {
        this.newRootItemInputVisible = false;
        this.selectNewRootItemInput = true;
        this.newRootItemInputValue = "New Item";
    }

    // todo: this can be global
    private setErrorDialog(message: string) {
        this.errorMessage = message;
        this.errorDialogVisible = true;
    }
}
