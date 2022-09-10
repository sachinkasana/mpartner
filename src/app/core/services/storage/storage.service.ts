import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageType: any;
  constructor() {
    this.storageType =localStorage;
   }
  getItem(key: string) {
    const item = this.storageType.getItem(key);
    return (item) ? JSON.parse(item) : null;
  }

  setItem(key: string, value: any): void {
    this.storageType.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    this.storageType.removeItem(key);
  }

  clear() {
    this.storageType.clear();
  }
}
