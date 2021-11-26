import {liveQuery} from "dexie";
import {devNoteDb} from "../data-access/dev-note-db";
import {SidebarItem} from "../data-access/entities/sidebar-item";

export class SidebarService {
    getAll = liveQuery(() => devNoteDb.sidebarItems.toArray());

    add(sidebarItem: SidebarItem) {
        return devNoteDb.sidebarItems.filter(item => item.data.name === sidebarItem.data.name).count().then(count => {
            if (count === 0) {
                devNoteDb.sidebarItems.add(sidebarItem);
            } else {
                throw new Error("Sidebar item already exists!");
            }
        });
    }

    remove(id: number) {
        devNoteDb.sidebarItems.delete(id);
    }
}




