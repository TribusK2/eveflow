import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

import { TimeService } from '../shared/services/time.service';
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
  @ViewChild('lgHand', { static: true }) lgHand: ElementRef;
  @ViewChild('smHand', { static: true }) smHand: ElementRef;
  @ViewChild('minuteInput', { static: true }) minuteInput: ElementRef;

  public markers: Marker[] = [];
  private initTime: CurrentTime;
  private currentTime$: Subscription;
  private timeFlow: any;
  public noEditMode = true;
  public clockForm:FormGroup;
  private timeSpeed: number;

  constructor(
    private renderer: Renderer2,
    private _formBuilder: FormBuilder,
    private timeService: TimeService
  ) {
    this.clockForm = this._formBuilder.group({
      hourControl: ['', [Validators.min(0), Validators.max(23)]],
      minuteControl: ['', [Validators.min(0), Validators.max(59)]],
      secondControl: ['', [Validators.min(0), Validators.max(59)]]
    })
   }

  ngOnInit(): void {

    this.initTime = {
      hour: parseInt(moment().format('H')) ,
      minute: parseInt(moment().format('mm')),
      second: parseInt(moment().format('ss'))
    }
    this.timeSpeed = 100; // 1000 = 1 s/s

    this.setClockMarkers();

    this.renderer.listen("window", "resize", () => {
      this.setClockMarkers();
    });

    this.currentTime$ = this.getCurrentTime().subscribe(res => {

      this.updateDialClock(res.hour, res.minute, res.second);
      this.updateDigitalClock(res.hour, res.minute, res.second);

    })

    this.setInitTime(this.initTime);

    this.timeFlow = this.startTimeFlow();

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
    return this.timeService.getCurrentTime();
  }

  setInitTime(initTime: CurrentTime): void {
    this.changeTime(initTime);
  }

  startTimeFlow() {
    if (this.timeFlow) {
      clearInterval(this.timeFlow);
    }
    let s = this.clockForm.get('secondControl').value;;
    let m = this.clockForm.get('minuteControl').value;
    let h = this.clockForm.get('hourControl').value;
    return setInterval(() => {
      if (h > 23) {
        h = 0; m = 0; s = 0;
        this.changeTime({ hour: h, minute: m, second: s });
        return
      }
      if (m > 59) {
        h++; m = 0; s = 0;
        this.changeTime({ hour: h, minute: m, second: s });
        return
      }
      if (s > 59) {
        m++; s = 0;
        this.changeTime({ minute: m, second: s });
        return
      }
      this.changeTime({ second: s })
      s++
    }, this.timeSpeed)
  }

  onInputChange(event: any, item: string) {

    let value = event.target.value;
    if (isNaN(value)) value = 0;
    if (item === 'hour') {
      if (value > 23) value = 23;
      if (value < 0) value = 0;
      this.changeTime({ hour: value });
    };
    if (item === 'minute') {
      if (value > 59) {value = 59};
      if (value < 0) value = 0;
      this.changeTime({ minute: value })
    };

  }

  updateDigitalClock(newHour: number | string, newMinute: number | string, newSecond: number): void {

    newHour < 10 ? newHour = `0${newHour.toString()}` : newHour = newHour;
    if(typeof newHour === 'string' && newHour.length > 2)newHour = newHour.slice(-2)

    newMinute < 10 ? newMinute = `0${newMinute.toString()}` : newMinute = newMinute;
    if(typeof newMinute === 'string' && newMinute.length > 2)newMinute = newMinute.slice(-2)

    this.clockForm.get('hourControl').setValue(newHour);
    this.clockForm.get('minuteControl').setValue(newMinute);
    this.clockForm.get('secondControl').setValue(newSecond);
  }

  updateDialClock(newHour: number, newMinute: number, newSecond: number): void {
    const smHandAngle = newHour * 30 + newMinute * 0.5 + newSecond * 0.01;
    const lgHandAngle = newMinute * 6 + newSecond * 0.1;
    this.renderer.setStyle(this.smHand.nativeElement, 'transform', `rotateZ(${smHandAngle}deg)`)
    this.renderer.setStyle(this.lgHand.nativeElement, 'transform', `rotateZ(${lgHandAngle}deg)`)
  }

  changeTime(newTime: Partial<CurrentTime>): void {
    this.timeService.changeTime(newTime);
  }

  toggleEditMode() {

    if (this.noEditMode) {
      clearInterval(this.timeFlow);
    } else {
      this.timeFlow = this.startTimeFlow();
    }
    this.noEditMode = !this.noEditMode;
  }

  ngOnDestroy(): void {
    this.currentTime$.unsubscribe();
  }

}
