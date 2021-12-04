export class SidebarItem {
    constructor(name: string) {
        this.name = name;
    }

    id!: number;
    name!: string;
    order!: number;
}
