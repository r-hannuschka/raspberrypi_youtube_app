import { Injectable } from '@angular/core';
import * as socketIOClient from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

interface ChannelSubscription {
  id: string;

  subscriberCount: number;

  subject: Subject<any>;
}

@Injectable()
export class SocketManager {

  private socket;

  private channelMap: Map<string, ChannelSubscription>;

  /**
   *
   *
   * @private
   * @type {string}
   * @memberof SocketManager
   */
  private channelID: string;

  constructor() {
    // url configureable
    // this.socket = socketIOClient('http://192.168.188.200:8080');
    this.socket = socketIOClient('http://localhost:8080');
    this.channelMap = new Map();
    this.registerEvents();
  }

  /**
   * get socket messsages
   *
   * @param {any} channel
   * @memberof SocketManager
   */
  public getMessages(channel): Observable<any> {
    if (!this.channelMap.has(channel)) {
      const subject: Subject<any> = new Subject();

      this.channelMap.set(channel, {
        id: channel,
        subscriberCount: 0,
        subject: new Subject()
      });
      this.socket.emit('register', channel);
    }
    return this.createChannelObserver(channel);
  }

  /**
   * send execute message to server
   *
   * @param channel
   * @param task
   */
  public exec(channel: string, task): void {
    this.socket.emit('exec', {
      channel,
      task
    });
  }

  /**
   * create new proxy observer and add to subscription list
   * of channel subject to get notified if new data are here.
   *
   * @todo check message spam and buffer messages before send.
   *
   * @private
   * @param {string} channel
   * @returns {Observable<any>}
   * @memberof SocketManager
   */
  private createChannelObserver(channel: string): Observable<any> {
    let channelSubscription: ChannelSubscription = this.channelMap.get(channel);
    const subject = channelSubscription.subject;

    const observable: Observable<any> = Observable.create(observer => {

      // add observer to subject to get notfied if something changes
      const sub = subject.subscribe(observer);
      channelSubscription.subscriberCount++;

      // unsubscribe
      return () => {
        channelSubscription.subscriberCount -= 1;
        if (channelSubscription.subscriberCount <= 0) {
          this.socket.emit('unregister', channel);
          this.channelMap.delete(channelSubscription.id);

          channelSubscription = null;
        }
        sub.unsubscribe();
      }
    });
    return observable;
  }

  /**
   * register to socket message event
   * and notify all channel observers about changes
   *
   * @private
   * @memberof SocketManager
   */
  private registerEvents() {
    this.socket.on('message', (response) => {
      // channelID
      const cID  = response.channel;
      const body = response.body;

      if ( this.channelMap.has(cID) ) {
        const channel = this.channelMap.get(cID);
        channel.subject.next(body);
      }
    });
  }
}
