import RemotelySavePlugin from "./main";

export class LocalStorageSettings {
  private prefix: string;

  constructor(private readonly plugin: RemotelySavePlugin) {
    this.prefix = this.plugin.manifest.id + ":";
  }

  migrate(): void {
    const keys = ["pluginDisabled"];
    for (const key of keys) {
      const old = localStorage.getItem(this.prefix + key);
      if (app.loadLocalStorage(this.prefix + key) == null && old != null) {
        if (old != null) {
          app.saveLocalStorage(this.prefix + key, old);
          localStorage.removeItem(this.prefix + key);
        }
      }
    }
  }

  getPluginDisabled(): boolean {
    return app.loadLocalStorage(this.prefix + "pluginDisabled") == "true";
  }

  setPluginDisabled(value: boolean): void {
    return app.saveLocalStorage(this.prefix + "pluginDisabled", `${value}`);
  }
}
