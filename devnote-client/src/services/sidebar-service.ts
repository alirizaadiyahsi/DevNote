import {liveQuery} from "dexie";
import {devNoteDb} from "../data-access/dev-note-db";
import {SidebarItem} from "../data-access/entities/sidebar-item";

export class SidebarService {
    getAll = liveQuery(() => devNoteDb.sidebarItems.toArray());

    add(item: SidebarItem) {
        devNoteDb.sidebarItems.add(item);
    }

    remove(id: number) {
        devNoteDb.sidebarItems.delete(id);
    }
}




