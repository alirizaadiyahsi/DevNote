import {liveQuery} from "dexie";
import {devNoteDb} from "../data-access/dev-note-db";
import {Setting} from "../data-access/entities/setting";

export class SettingService {
    getAll = liveQuery(() => devNoteDb.settings.toArray());

    addOrUpdate(setting: Setting) {
        devNoteDb.settings.get({key: setting.key}).then(existingSetting => {
            if (existingSetting) {
                existingSetting.value = setting.value;
                devNoteDb.settings.update(existingSetting.id, existingSetting)
            } else {
                devNoteDb.settings.add(setting);
            }
        });
    }

    getByKey(key: any) {
        return devNoteDb.settings.get({key: key});
    }
}
