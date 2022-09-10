import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class WRSResolverService implements Resolve<any> {
  constructor(private _postsService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._postsService.getWRSCalendar();
  }
}