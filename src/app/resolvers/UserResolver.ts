import { Injectable } from "../../../node_modules/@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "../../../node_modules/@angular/router";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { map, take } from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<User> {
    //constructor
    constructor(private userService: UserService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        let encOId = route.paramMap.get('encOId');

        return this.userService.getUserDetails(encOId).pipe(
            map(res => {
                if (res) {
                    return res;
                } else {
                    this.router.navigate(['']);
                }
            })
        );
    }
}