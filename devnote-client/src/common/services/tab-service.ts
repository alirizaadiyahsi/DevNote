import {liveQuery} from "dexie";
import {devNoteDb} from "../data-access/dev-note-db";
import {TabItem} from "../data-access/entities/tab-item";

export class TabService {
    sidebarItemId: number = 0;
    getAll = liveQuery(() => devNoteDb.tabItems.where('sidebarItemId').equals(this.sidebarItemId).toArray());

    add(tabItem: TabItem) {
        return devNoteDb.tabItems.filter(item => item.name === tabItem.name && item.sidebarItemId == tabItem.sidebarItemId).count().then(count => {
            if (count === 0) {
                return devNoteDb.tabItems.add(tabItem);
            } else {
                throw new Error("Tab item already exists!");
            }
        });
    }

    update(tabItem: TabItem) {
        return devNoteDb.tabItems.filter(item => item.name === tabItem.name && item.sidebarItemId == tabItem.sidebarItemId).count().then(count => {
            if (count === 0) {
                devNoteDb.tabItems.update(tabItem.id, tabItem);
            } else {
                throw new Error("Tab item already exists!");
            }
        });
    }

    remove(id: number) {
        devNoteDb.tabItems.delete(id);
    }
}
