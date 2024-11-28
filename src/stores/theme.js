import { action, computed, makeAutoObservable, observable } from "mobx";

export class ThemeStore {
    theme = localStorage.getItem('theme') || 'light';
    
    constructor() {
        makeAutoObservable(this, {
            theme: observable,
            themeMode: computed,
            cssMode: computed,
            setTheme: action
        });

    }

    get themeMode() {
        return this.theme
    }

    get cssMode() {
        return this.theme === 'dark' ? 'dark' : 'light';
    }
    
    setTheme() {
        switch (this.theme) {
            case 'dark':
                this.theme = 'light';
                break;
            case 'light':
                this.theme = 'dark';
                break;
            default:
                break;
        };
        localStorage.setItem('theme', this.theme);
    }
}

export default ThemeStore;