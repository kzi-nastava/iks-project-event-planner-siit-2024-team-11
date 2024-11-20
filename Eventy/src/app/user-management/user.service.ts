import { Injectable } from '@angular/core';
import {Organizer, Provider, User} from './model/users.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users : (Organizer | Provider | User)[] = [
    {
      email : "user1@gmail.com",
      password : "password1",
      address : "Neka Ulica 4",
      phoneNumber : "05334564",
      firstName : "Ime",
      lastName : "Prezime"
    },
    {
      email : "user2@gmail.com",
      password : "password2",
      address : "Jos Neka Ulica 28",
      phoneNumber : "0493913438",
      name : "Moja kompanija",
      description : "Opis kompanije"
    },
    {
      email : "user3@gmail.com",
      password : "password3",
      address : "Ulica Ovo 32",
      phoneNumber : "+3224 3234 13"
    }
  ];

  login(email : string, password : string) : User | Provider | Organizer | null {
    for(let user of this.users) {
      if(user.email === email && user.password === password ) {
        return user;
      }
    }

    return null;
  }

  register(newUser: (Organizer | Provider)) : void {
    this.users.push(newUser);
  }
}
