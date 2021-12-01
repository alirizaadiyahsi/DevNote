import {liveQuery} from "dexie";
import {devNoteDb} from "../data-access/dev-note-db";
import {SidebarItem} from "../data-access/entities/sidebar-item";

export class SidebarService {
    getAll = liveQuery(() => devNoteDb.sidebarItems.toArray());

    add(sidebarItem: SidebarItem) {
        return devNoteDb.sidebarItems.filter(item => item.name === sidebarItem.name).count().then(count => {
            if (count === 0) {
                return devNoteDb.sidebarItems.add(sidebarItem);
            } else {
                throw new Error("Sidebar item already exists!");
            }
        });
    }

    update(sidebarItem: SidebarItem) {
        return devNoteDb.sidebarItems.filter(item => item.name === sidebarItem.name).count().then(count => {
            if (count === 0) {
                devNoteDb.sidebarItems.update(sidebarItem.id, sidebarItem);
            } else {
                throw new Error("Sidebar item already exists!");
            }
        });
    }

    remove(id: number, deleteCascade: boolean) {
        devNoteDb.sidebarItems.delete(id);

        if (deleteCascade) {
            devNoteDb.tabItems.where("sidebarItemId").equals(id).delete();
        }
    }
}




