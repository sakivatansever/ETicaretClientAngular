import { Injectable } from '@angular/core';
import { HttpclientService } from '../httpclient.service';
import { User } from '../../../entities/user';
import { Create_User } from '../../../contracts/users/create_user';
import { Observable, firstValueFrom, observable } from 'rxjs';

import { CustomerToastrService, ToastrMessageType, ToastrPosition } from '../../ui/customer-toastr.service';
import { Token } from '../../../contracts/token/token';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclientService: HttpclientService, private toastrSerice: CustomerToastrService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpclientService.post<Create_User | User>({
      controller: "users"
    }, user);

  return await  firstValueFrom(observable) as Create_User;
  }






}
