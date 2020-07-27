import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { TimeService } from '../shared/services/time.service';
import { CurrentTime } from '../clock/models/current-time.model';
import * as bgColorList from '../shared/json/sky-colors.json'
import { ColorsService } from '../shared/services/colors.service';
import { GradientColor } from '../shared/models/gradient-color.model';

@Component({
  selector: 'app-sky',
  templateUrl: './sky.component.html',
  styleUrls: ['./sky.component.scss']
})
export class SkyComponent implements OnInit, OnDestroy {

  @ViewChild('sky', { static: true }) sky: ElementRef;

  private currentTime$: Subscription;
  private bgColors: GradientColor[]
  
  public bgColor: {'background-image': string};

  constructor(
    private timeService: TimeService,
    private colorsService: ColorsService
    ) { }

  ngOnInit(): void {
    this.bgColors = bgColorList.bgColors;

    this.calculateAllStampSeconds(this.bgColors);

    this.currentTime$ = this.getCurrentTime().subscribe(res => {

      const secondsAmount = (res.hour * 30 + res.minute * 0.5 + res.second * 0.01)*120;

      if(secondsAmount < this.bgColors[0].endSecond){
        this.bgColor = this.colorsService.setColorGradient(this.bgColors[0], this.bgColors[1], secondsAmount);
      }
      if(secondsAmount >= this.bgColors[1].startSecond && secondsAmount < this.bgColors[1].endSecond){
        this.bgColor = this.colorsService.setColorGradient(this.bgColors[1], this.bgColors[2], secondsAmount);
      }
      if(secondsAmount >= this.bgColors[2].startSecond && secondsAmount < this.bgColors[2].endSecond){
        this.bgColor = this.colorsService.setColorGradient(this.bgColors[2], this.bgColors[3], secondsAmount);
      }
      if(secondsAmount >= this.bgColors[3].startSecond){
        this.bgColor = this.colorsService.setColorGradient(this.bgColors[3], this.bgColors[4], secondsAmount);
      }
      if(secondsAmount >= this.bgColors[4].startSecond){
        this.bgColor = this.colorsService.setColorGradient(this.bgColors[4], this.bgColors[5], secondsAmount);
      }
      if(secondsAmount >= this.bgColors[5].startSecond){
        this.bgColor = this.colorsService.setColorGradient(this.bgColors[5], this.bgColors[6], secondsAmount);
      }
      if(secondsAmount >= this.bgColors[6].startSecond){
        this.bgColor = this.colorsService.setColorGradient(this.bgColors[6], this.bgColors[7], secondsAmount);
      }
      if(secondsAmount >= this.bgColors[7].startSecond){
        this.bgColor = this.colorsService.setColorGradient(this.bgColors[7], this.bgColors[0], secondsAmount);
      }

    })
  }

  calculateAllStampSeconds(colors: GradientColor[]){
    for (const color of colors) {
      const startSecond = this.secondCalculate(color.startTime);
      color.startSecond = startSecond;

      const endSecond = this.secondCalculate(color.endTime);
      color.endSecond = endSecond;
    }
  }

  secondCalculate(time: string){
    return this.colorsService.secondCalculate(time);
  }

  getCurrentTime(): Observable<CurrentTime> {
    return this.timeService.getCurrentTime();
  }

  ngOnDestroy(){
    this.currentTime$.unsubscribe();
  }

}
