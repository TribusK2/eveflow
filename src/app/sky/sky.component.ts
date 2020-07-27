import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { TimeService } from '../shared/services/time.service';
import { CurrentTime } from '../clock/models/current-time.model';
import * as bgColorList from '../shared/json/bg-colors.json'
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

    console.log(this.bgColors)

    this.currentTime$ = this.getCurrentTime().subscribe(res => {
      // 720 - max angle of small clock hand
      // 00:00 - 0 s - rgba(0, 0, 10, 1), rgba(0, 0, 80, 1)
      // 06:00 - 21600 s - rgba(39, 0, 255, 1), rgba(255, 190, 190, 1)
      // 12:00 - 43200 s - rgba(0, 170, 255, 1), rgba(190, 240, 255, 1)
      // 18:00 - 64800 s - rgba(110, 140, 240, 1), rgba(255, 90, 0, 1)
      // 24:00 - 86400 s - rgba(0, 0, 10, 1), rgba(0, 0, 80, 1)

      const secondsAmount = (res.hour * 30 + res.minute * 0.5 + res.second * 0.01)*120;
      
      if(secondsAmount < 21600){
        this.bgColor = this.colorsService.setColorGradient(this.bgColors[0], this.bgColors[1], secondsAmount);
      }
      if(secondsAmount >= 21600 && secondsAmount < 43200){
        this.bgColor = this.colorsService.setColorGradient(this.bgColors[1], this.bgColors[2], secondsAmount);
      }
      if(secondsAmount >= 43200 && secondsAmount < 64800){
        this.bgColor = this.colorsService.setColorGradient(this.bgColors[2], this.bgColors[3], secondsAmount);
      }
      if(secondsAmount >= 64800){
        this.bgColor = this.colorsService.setColorGradient(this.bgColors[3], this.bgColors[0], secondsAmount);
      }

    })
  }

  getCurrentTime(): Observable<CurrentTime> {
    return this.timeService.getCurrentTime();
  }

  ngOnDestroy(){
    this.currentTime$.unsubscribe();
  }

}
