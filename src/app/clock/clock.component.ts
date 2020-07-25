import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Subscription, combineLatest, Observable, of, empty } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClockService } from './clock.service';
import { CurrentTime } from './models/current-time.model';

declare interface Marker {
  rotate: number;
  posX: number;
  posY: number;
}

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnDestroy {

  @ViewChild('clockDial', { static: true }) clockDial: ElementRef;

  public markers: Marker[] = [];
  private initTime: CurrentTime;
  private currentTime$: Subscription;
  public hour: string;
  public minute: string;
  public timeForm: FormGroup;
  private lastChangeSource: string;

  constructor(
    private renderer: Renderer2,
    private clockService: ClockService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.initTime = {
      hour: 12,
      minute: 0
    }

    this.timeForm = this._formBuilder.group({
      hourControl: [0, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(0), Validators.max(23)]],
      minuteControl: [0, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(0), Validators.max(59)]]
    })

    this.setClockMarkers();

    this.renderer.listen("window", "resize", () => {
      this.setClockMarkers();
    });

    // this.onTimeChange().subscribe((res: number[]) => {
    //   const hourControl = this.timeForm.controls.hourControl;
    //   hourControl.setValue(res[0], { emitEvent: false });
    //   const minuteControl = this.timeForm.controls.minuteControl;
    //   minuteControl.setValue(res[1], { emitEvent: false });
    //   if (this.timeForm.valid) {
    //     this.updateClock(hourControl.value, minuteControl.value, 'inside');
    //   } else {
    //     if (hourControl.errors && hourControl.errors.max) hourControl.setValue(hourControl.errors.max.max);
    //     if (hourControl.errors && hourControl.errors.min) hourControl.setValue(hourControl.errors.min.min);
    //     if (hourControl.errors && hourControl.errors.pattern) hourControl.setValue('00');

    //     if (minuteControl.errors && minuteControl.errors.max) minuteControl.setValue(minuteControl.errors.max.max);
    //     if (minuteControl.errors && minuteControl.errors.min) minuteControl.setValue(minuteControl.errors.min.min);
    //     if (minuteControl.errors && minuteControl.errors.pattern) minuteControl.setValue('00');
    //   }
    // });


    this.currentTime$ = this.getCurrentTime().subscribe(res => {

      this.updateClock(res.hour, res.minute);

      
    })

    this.setInitTime(this.initTime);

    setTimeout(() => {
      this.changeTime({ hour: 5, minute: 3333 })
    }, 3000);

    setTimeout(() => {
      this.changeTime({ hour: 5, minute: 3 })
    }, 6000);

  }

  setClockMarkers(): void {
    const clockHeight = parseInt(window.getComputedStyle(this.clockDial.nativeElement).getPropertyValue('height'));

    this.markers = [];
    for (let i = 0; i < 12; i++) {
      let marker: Marker = {
        rotate: i * 30,
        posX: (clockHeight / 2) * Math.sin(i * 30 * (Math.PI / 180)),
        posY: (-clockHeight / 2) * Math.cos(i * 30 * (Math.PI / 180)) + clockHeight / 2
      };
      this.markers.push(marker);
    }
  }

  getCurrentTime(): Observable<CurrentTime> {
    return this.clockService.getCurrentTime();
  }

  setInitTime(initTime: CurrentTime): void {
    this.changeTime(initTime);
  }

  onInputChange(event: any, item:string){
    let value = parseInt(event.target.value);
    if(item === 'hour') this.changeTime({hour: value});
    if(item === 'minute') this.changeTime({minute: value});
  }


  updateClock(newHour: number | string, newMinute: number | string): void {
    const hourControl = this.timeForm.controls.hourControl;
    const minuteControl = this.timeForm.controls.minuteControl;
    const hour = typeof newHour === 'string' ? parseInt(newHour) : newHour;
    const minute = typeof newMinute === 'string' ? parseInt(newMinute) : newMinute;

    hour < 10 ? hourControl.setValue(`0${hour}`, { emitEvent: false }) : hourControl.setValue(`${hour}`, { emitEvent: false });
    minute < 10 ? minuteControl.setValue(`0${minute}`, { emitEvent: false }) : minuteControl.setValue(`${minute}`, { emitEvent: false });
    
    if (!this.timeForm.valid) {

      if (hourControl.errors && hourControl.errors.max) hourControl.setValue(hourControl.errors.max.max);
      if (hourControl.errors && hourControl.errors.min) hourControl.setValue(hourControl.errors.min.min);
      if (hourControl.errors && hourControl.errors.pattern) hourControl.setValue('00');

      if (minuteControl.errors && minuteControl.errors.max) minuteControl.setValue(minuteControl.errors.max.max);
      if (minuteControl.errors && minuteControl.errors.min) minuteControl.setValue(minuteControl.errors.min.min);
      if (minuteControl.errors && minuteControl.errors.pattern) minuteControl.setValue('00');

      const correctedTime: CurrentTime = {
        hour: parseInt(hourControl.value),
        minute: parseInt(minuteControl.value),
      }
      this.changeTime(correctedTime);
    }
  }

  changeTime(newTime: Partial<CurrentTime>): void {
    this.clockService.changeTime(newTime);
  }

  ngOnDestroy(): void {
    this.currentTime$.unsubscribe();
  }

}
