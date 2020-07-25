import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CurrentTime } from './models/current-time.model';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  private currentTime = new BehaviorSubject<CurrentTime>({ hour: 0, minute: 0 })
  public currentTime$ = this.currentTime.asObservable();

  constructor() { }

  getCurrentTime(): Observable<CurrentTime> {
    return this.currentTime$;
  }

  changeTime(newTime: Partial<CurrentTime>): void {
    this.currentTime.next({ ...this.currentTime.value, ...newTime });
  }

}
