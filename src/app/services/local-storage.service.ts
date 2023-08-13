import {Injectable} from "@angular/core";
import { LocalStorageKeys } from "../types";

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService{

  constructor() {}

  setItem(key: LocalStorageKeys, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
