import { Injectable } from '@angular/core';
import { ServerSocketService } from './server-socket.service';
import { User } from '../../bo/user';

@Injectable()
export class UserService {

  constructor(private serverSocket : ServerSocketService) { }

  create(user: User) {
    


  }

  


}
