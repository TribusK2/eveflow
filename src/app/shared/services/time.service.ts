import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CurrentTime } from 'src/app/clock/models/current-time.model';


@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private currentTime = new BehaviorSubject<CurrentTime>({ hour: 0, minute: 0, second: 0 })
  public currentTime$ = this.currentTime.asObservable();

  constructor() { }

  getCurrentTime(): Observable<CurrentTime> {
    return this.currentTime$;
  }

  changeTime(newTime: Partial<CurrentTime>): void {
    this.currentTime.next({ ...this.currentTime.value, ...newTime });
  }

}
