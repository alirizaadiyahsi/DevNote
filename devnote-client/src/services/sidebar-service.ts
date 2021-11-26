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

    update(id: number, sidebarItem: SidebarItem) {
        return devNoteDb.sidebarItems.filter(item => item.data.name === sidebarItem.data.name).count().then(count => {
            if (count === 0) {
                devNoteDb.sidebarItems.update(id, sidebarItem);
            } else {
                throw new Error("Sidebar item already exists!");
            }
        });
    }

    addSubItem(parentId: number, subSidebarItem: SidebarItem) {
        return devNoteDb.sidebarItems.get(parentId).then(parentItem => {
            if (!parentItem) {
                throw new Error("Parent item not found!");
            }

            if (parentItem.children && parentItem.children.length > 0){
                let existingSubItemCount = parentItem.children.filter(child => child.data.name === subSidebarItem.data.name).length;
                if (existingSubItemCount && existingSubItemCount > 0) {
                    throw new Error("Sidebar item already exists!");
                }
            }

            if (parentItem.children) {
                parentItem.children.push(subSidebarItem);
            } else {
                parentItem.children = [subSidebarItem];
            }

            devNoteDb.sidebarItems.update(parentId, parentItem);
        });
    }
}




