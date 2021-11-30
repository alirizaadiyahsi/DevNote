import Dexie, {Table} from 'dexie';
import {SidebarItem} from "./entities/sidebar-item";
import {TabItem} from "./entities/tab-item";

export class DevNoteDb extends Dexie {

    sidebarItems!: Table<SidebarItem, number>;
    tabItems!: Table<TabItem, number>;

    constructor() {
        super('devNoteDb');
        this.version(2).stores({
            sidebarItems: '++id, name, children',
            tabItems: '++id, name, content, sidebarItemId'
        });
    }
}

export const devNoteDb = new DevNoteDb();
