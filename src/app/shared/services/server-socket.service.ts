// file: server-socket.service.ts
import { Injectable, OnDestroy } from '@angular/core'
import { QueueingSubject } from 'queueing-subject'
import { Observable } from 'rxjs/Observable'
import websocketConnect from 'rxjs-websockets'
import { Subscription } from 'rxjs/Subscription'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import Connection from 'rxjs-websockets'
import 'rxjs/add/operator/share'
import { Player } from '../../bo/player';
import { User } from '../../bo/user';

@Injectable()
export class ServerSocketService implements OnDestroy {
  private inputStream: QueueingSubject<string>
  public messages: Observable<string>
  public receivedMessage: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private url : string = 'ws://127.0.0.1:8999';
  private socketSubscription: Subscription;

  constructor() {
  }

  public connect(user : User) {
    
    // Using share() causes a single websocket to be created when the first
    // observer subscribes. This socket is shared with subsequent observers
    // and closed when the observer count falls to zero.
    let str : string = "?login="+user.login+"&password="+user.password;

    this.messages = websocketConnect(
      this.url+str,
      this.inputStream = new QueueingSubject<string>()
    ).messages.share();
   
    // the websocket connection is created lazily when the messages observable is
    // subscribed to
    this.socketSubscription = this.messages.subscribe((message: string) => {
       console.log(message);
        this.receivedMessage.next(message);
    });
  }

  public send(message: string):void {
    this.inputStream.next(message)
  }

  public disconnect(){
    this.socketSubscription.unsubscribe()
  }

  ngOnDestroy() {
    this.socketSubscription.unsubscribe()
  }

  public getRecievedMessage(): Observable<string> {
    return this.receivedMessage.asObservable();
  }

  public setRecievedMessage(newValue: string): void {
    this.receivedMessage.next(newValue);
  }

}