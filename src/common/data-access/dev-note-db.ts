import Dexie, {Table} from 'dexie';
import {SidebarItem} from "./entities/sidebar-item";
import {TabItem} from "./entities/tab-item";
import {Setting} from "./entities/setting";

export class DevNoteDb extends Dexie {

    sidebarItems!: Table<SidebarItem, number>;
    tabItems!: Table<TabItem, number>;
    settings!: Table<Setting, number>;

    constructor() {
        super('devNoteDb');
        this.version(4).stores({
            sidebarItems: '++id, name, children, order',
            tabItems: '++id, name, content, sidebarItemId',
            settings: '++id, key, value'
        });
    }
}

export const devNoteDb = new DevNoteDb();
