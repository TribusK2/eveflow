import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { CurrentTime } from 'src/app/clock/models/current-time.model';
import { TimeService } from 'src/app/shared/services/time.service';

@Component({
  selector: 'app-sun',
  templateUrl: './sun.component.html',
  styleUrls: ['./sun.component.scss']
})
export class SunComponent implements OnInit, OnDestroy {

  private currentTime$: Subscription;
  public sunPosition: { 'left': string, 'top': string };
  private initDisplacementTime: string;
  private initDisplacement: number;
  private circleRadius: number;

  constructor(
    private timeService: TimeService
  ) { }

  ngOnInit(): void {
    this.initDisplacementTime = "01:00";
    this.circleRadius = 40 // % of paret Node


    // Calculate initial displacement time (for more realistic felling)
    this.initDisplacement = this.claculateInitDisplacement(this.initDisplacementTime);

    // Get current time
    this.currentTime$ = this.getCurrentTime().subscribe(res => {

      // Calculate current second
      const sunAngle = ((res.hour * 30 + res.minute * 0.5 + res.second * 0.01) * (Math.PI / 180) / 2 + 6 / (12 / Math.PI) + this.initDisplacement);

      const xPos = (Math.cos(sunAngle)) * this.circleRadius;
      const yPos = (Math.sin(sunAngle)) * this.circleRadius;

      this.sunPosition = { 'left': `${xPos}%`, 'top': `${yPos}%` }
    });
  }

  /**
   * Get current time parameters
   * @returns Observable
   */
  getCurrentTime(): Observable<CurrentTime> {
    return this.timeService.getCurrentTime();
  }

  claculateInitDisplacement(time: string): number {
    let timeArray = time.split(':');
    let initDisplacement = (parseInt(timeArray[0]) + parseInt(timeArray[1]) / 60) / (-12 / Math.PI);
    return initDisplacement;
  }

  ngOnDestroy() {
    this.currentTime$.unsubscribe();
  }

}
