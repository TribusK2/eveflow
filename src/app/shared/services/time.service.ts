import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CurrentTime } from 'src/app/clock/models/current-time.model';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  /*  
      "00:00" - 0 s.
      "01:00" - 3600 s.  - sunmin
      "06:00" - 21600 s.
      "07:00" - 25200 s. - sunrise
      "12:00" - 43200 s.
      "13:00" - 46800 s. - sunmax
      "18:00" - 64800 s.
      "19:00" - 68400 s. - sunset
      "24:00" - 86400 s.
  */

  private currentTime = new BehaviorSubject<CurrentTime>({ hour: 0, minute: 0, second: 0 })
  public currentTime$ = this.currentTime.asObservable();

  constructor() { }

  /**
   * Get curent time parameters as Observable
   * @returns Observable
   */
  getCurrentTime(): Observable<CurrentTime> {
    return this.currentTime$;
  }

  /**
   * Setup given time into the App Storege
   * @param  {Partial<CurrentTime>} newTime
   * @returns void
   */
  changeTime(newTime: Partial<CurrentTime>): void {
    this.currentTime.next({ ...this.currentTime.value, ...newTime });
  }

  /**
   * Calculate second value from given time
   * @param  {string} time
   * @returns number
   */
  secondCalculate(time: string): number{
    let timeArray = time.split(':');
    let seconds = (parseInt(timeArray[0]) * 30 + parseInt(timeArray[1]) * 0.5)*120;
    return seconds;
  }

}
