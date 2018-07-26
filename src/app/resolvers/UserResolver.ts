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
                return { "_id": "5b1e3e328dda81c4c4b251c6", "name": "Santosh Pandey", "emailId": "spandey2@sapient.com", "role": "Admin", "createdAt": "2018-06-11T09:17:38.117Z", "updatedAt": "2018-06-12T06:57:29.400Z", "__v": 0 }
            })
            //   map(res => {
            //     if(res) {
            //         return res.json()
            //     } else {
            //         this.router.navigate(['']);
            //     }
            //   })
        );
    }
}