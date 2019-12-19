import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LOCAL_STORAGE, WebStorageService, StorageService} from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private httpClient: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public data:any=[]

  saveInLocal(key, val): void {
    console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
  }

  getFromLocal(key) {
    console.log("here")
    console.log('recieved= key:' + key);
    this.data[key]= this.storage.get(key);
    console.log(this.data[key]);
    return this.data[key];
  }

  getLocalStorage(){
    console.log(this.storage);
  }

  getItemName(key){
    console.log('recieved= key:' + key);
    this.data[key]= this.storage.get(key);
    console.log(this.data[key]);
    return this.data[key];
  }

  getItemPass(key){
    console.log('recieved= key:' + key);
    this.data[key]= this.storage.get(key);
    console.log(this.data[key]);
    return this.data[key];
  }

  deleteStorage(){
    this.storage.remove("token");
    this.storage.remove("firstname");
  }

  deleteRememberMeStorage(){
    this.storage.remove("username");
    this.storage.remove("fpassword");
  }

}
