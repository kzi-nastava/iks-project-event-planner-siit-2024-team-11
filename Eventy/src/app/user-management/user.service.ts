import { Injectable } from '@angular/core';
import {IUser} from './model/users.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users : IUser[] = [
    {
      email : "user1",
      password : "password1"
    },
    {
      email : "user2",
      password : "password2"
    },
    {
      email : "user3",
      password : "password3"
    }
  ];

  login(email : string, password : string) : IUser | null {
    for(let user of this.users) {
      if(user.email === email && user.password === password ) {
        return user;
      }
    }

    return null;
  }

  register(email : string, password : string) : void {
    const newUser: IUser = {
      email : email,
      password : password
    }

    this.users.push(newUser);
  }
}
