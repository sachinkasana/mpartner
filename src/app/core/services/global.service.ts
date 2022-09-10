import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalService{
    private showSearchBar: boolean = false;
    private warrantyData=null;;

    setData(flag:boolean){
        this.showSearchBar = flag; 
    }

    getData(){
        return this.showSearchBar;
    }

    setWarrantyData(data:any){
        this.warrantyData = data;
    }

    getWarrantyData(){
        return this.warrantyData;
    }
}