import {
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';
import {MenuItem} from "primeng/api";
import {SidebarService} from "../../../../services/sidebar-service";
import {SidebarItem} from "../../../../data-access/entities/sidebar-item";

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

    constructor(private sidebarService: SidebarService) {
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

    removeNewRootItem() {
        this.resetNewRootItemInput();
    }

    createNewRootItem() {
        let sidebarItem = {
            data: {
                name: this.newRootItemInputValue
            }
        } as SidebarItem;
        this.sidebarService.add(sidebarItem);

        this.resetNewRootItemInput();
    }

    disableNewRootItemInputSelection() {
        this.selectNewRootItemInput = false;
    }

    private resetNewRootItemInput() {
        this.newRootItemInputVisible = false;
        this.selectNewRootItemInput = true;
        this.newRootItemInputValue = "New Item";
    }

    removeSidebarItem(id: number) {
        this.sidebarService.remove(id);
    }
}
