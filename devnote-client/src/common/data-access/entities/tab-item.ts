export class TabItem {
    constructor(sidebarItemId: number, name: string) {
        this.name = name;
        this.sidebarItemId = sidebarItemId;
    }

    id!: number;
    name!: string;
    content!: string;
    sidebarItemId!: number;
}
