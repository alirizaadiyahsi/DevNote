export class Setting {
    id!: number;
    key!: string;
    value!: string;
}

export abstract class SettingKeys {
    public static APP_THEME = "app-theme";
}
