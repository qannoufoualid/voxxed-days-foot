// file: server-socket.service.ts
import { Injectable, OnDestroy } from '@angular/core'
import { QueueingSubject } from 'queueing-subject'
import { Observable } from 'rxjs/Observable'
import websocketConnect from 'rxjs-websockets'
import { Subscription } from 'rxjs/Subscription'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import Connection from 'rxjs-websockets'
import { Player } from '../../bo/player';
import { User } from '../../bo/user';
import { Message } from '../../bo/message';
import { AlertService } from './alert.service';
import { environment } from '../../../environments/environment';
import { UtilsService } from './utils.service';
import 'rxjs/add/operator/share'

/**
 * The service that handle the communication with the backend via websockets.
 */
@Injectable()
export class ServerSocketService implements OnDestroy {

  /**
   * The inputstream of the websocket.
   */
  private inputStream: QueueingSubject<string>
  /**
   *  an observable of the message sent by the server
   */
  public messages: Observable<string>
  /**
   * The received message
   */
  public receivedMessage: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  
  /**
   * The url of the backend.
   */
  private url: string = environment.backendUrl;
  /**
   * The subscription of the service.
   */
  private socketSubscription: Subscription;

  constructor(private alertService: AlertService, private utils : UtilsService) {
  }

  public connect() {

    //Make a connection
    this.messages = websocketConnect(
      this.url,
      this.inputStream = new QueueingSubject<string>()
    ).messages.share();

    // the websocket connection is created lazily when the messages observable is
    // subscribed to
    this.socketSubscription = this.messages.subscribe((message: string) => {
      this.utils.log("<--- Recieved : " + message);
      this.receivedMessage.next(message);
    }, err => this.alertService.error("Technical error."));

  }

  /**
   * To send a message
   * @param message the message to be sent
   */
  public send(message: Message): void {
    //We add the token.
    let token = localStorage.getItem('token');
    message.token = token;
    this.utils.log("---> Sending : ");
    this.utils.log(message);
    this.inputStream.next(JSON.stringify(message))
  }

  public disconnect() {
    this.socketSubscription.unsubscribe();
  }

  public getRecievedMessage(): Observable<string> {
    return this.receivedMessage.asObservable();
  }

  public setRecievedMessage(newValue: string): void {
    this.receivedMessage.next(newValue);
  }

  public isSocketCreated() : boolean{
      return !this.socketSubscription.closed;
  }

  ngOnDestroy() {
    if(this.socketSubscription==null)
     this.socketSubscription.unsubscribe();
  }
}