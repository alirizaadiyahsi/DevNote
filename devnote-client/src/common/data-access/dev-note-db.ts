import Dexie, {Table} from 'dexie';
import {SidebarItem} from "./entities/sidebar-item";

export class DevNoteDb extends Dexie {

    sidebarItems!: Table<SidebarItem, number>;

    constructor() {
        super('devNoteDb');
        this.version(1).stores({
            sidebarItems: '++id, name, children'
        });
    }
}

export const devNoteDb = new DevNoteDb();
