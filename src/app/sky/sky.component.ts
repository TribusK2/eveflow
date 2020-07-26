import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ClockService } from '../clock/clock.service';
import { CurrentTime } from '../clock/models/current-time.model';
import * as bgColorList from './bg-colors.json'

@Component({
  selector: 'app-sky',
  templateUrl: './sky.component.html',
  styleUrls: ['./sky.component.scss']
})
export class SkyComponent implements OnInit, OnDestroy {

  @ViewChild('sky', { static: true }) sky: ElementRef;

  private currentTime$: Subscription;
  public bgColor: {'background-image': string};

  constructor(
    private clockService: ClockService
    ) { }

  ngOnInit(): void {

    this.currentTime$ = this.getCurrentTime().subscribe(res => {
      // 720 - max angle of small clock hand
      // 00:00 - 0 s - rgba(0, 0, 10, 1), rgba(0, 0, 80, 1)
      // 06:00 - 21600 s - rgba(39, 0, 255, 1), rgba(255, 190, 190, 1)
      // 12:00 - 43200 s - rgba(0, 170, 255, 1), rgba(190, 240, 255, 1)
      // 18:00 - 64800 s - rgba(110, 140, 240, 1), rgba(255, 90, 0, 1)
      // 24:00 - 86400 s - rgba(0, 0, 10, 1), rgba(0, 0, 80, 1)

      let secondsAmount = (res.hour * 30 + res.minute * 0.5 + res.second * 0.01)*120;
      
      if(secondsAmount < 21600){

        let startTopR = 0; let startTopG = 0; let startTopB = 10;
        let startBottomR = 0; let startBottomG = 0; let startBottomB = 80;

        let endTopR = 39; let endTopG = 0; let endTopB = 255;
        let endBottomR = 190; let endBottomG = 240; let endBottomB = 255;

        let topR = this.curentValueCalculation(0, 21600, startTopR, endTopR, secondsAmount);
        let topG = this.curentValueCalculation(0, 21600, startTopG, endTopG, secondsAmount);
        let topB = this.curentValueCalculation(0, 21600, startTopB, endTopB, secondsAmount);

        let bottomR = this.curentValueCalculation(0, 21600, startBottomR, endBottomR, secondsAmount);
        let bottomG = this.curentValueCalculation(0, 21600, startBottomG, endBottomG, secondsAmount);
        let bottomB = this.curentValueCalculation(0, 21600, startBottomB, endBottomB, secondsAmount);

        this.bgColor ={'background-image': `linear-gradient(rgba(${topR}, ${topG}, ${topB}, 1), rgba(${bottomR}, ${bottomG}, ${bottomB}, 1))`}
      }

      // this.bgColor ={'background-image': `linear-gradient(rgba(${secondsAmount}, 238, 238, 1), rgba(255, 255, 240, 1))`}
      // this.bgColor ={'background-image': 'linear-gradient(rgba(175, 238, 238, 1), rgba(255, 255, 240, 1))'}
    })
  }

  curentValueCalculation(x1: number, x2: number, y1: number, y2: number, secondsAmount: number){
    return (y2 - y1)/(x2-x1)*secondsAmount + y1 - (y2 - y1)/(x2-x1)*x1;
  }

  getCurrentTime(): Observable<CurrentTime> {
    return this.clockService.getCurrentTime();
  }

  ngOnDestroy(){
    this.currentTime$.unsubscribe();
  }

}
