import {BaseApi} from '../../../shared/core/base.api';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {WFMEvent} from '../models/event.models';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EventsService extends BaseApi {

   constructor(public http: Http ) {
      super(http);
   }

   addEvent(event: WFMEvent): Observable<WFMEvent> {
     return this.post('events', event);
   }

   getEvents(): Observable<WFMEvent[]> {
      return this.get('events');
   }

   getEventById(id: string): Observable<WFMEvent> {
      return this.get(`events/${id}`);
   }
}
