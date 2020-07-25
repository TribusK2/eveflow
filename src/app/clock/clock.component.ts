import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

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
  @ViewChild('lgHand', { static: true }) lgHand: ElementRef;
  @ViewChild('smHand', { static: true }) smHand: ElementRef;

  public markers: Marker[] = [];
  private initTime: CurrentTime;
  private currentTime$: Subscription;
  public hour: string;
  public minute: string;
  private timeFlow: any;
  public noEditMode: boolean;

  constructor(
    private renderer: Renderer2,
    private clockService: ClockService
  ) { }

  ngOnInit(): void {
this.noEditMode = true;
    this.initTime = {
      hour: 22,
      minute: 0,
      seconds: 0
    }

    this.setClockMarkers();

    this.renderer.listen("window", "resize", () => {
      this.setClockMarkers();
    });

    this.currentTime$ = this.getCurrentTime().subscribe(res => {

      this.updateDigitalClock(res.hour, res.minute);
      this.updateDialClock(res.hour, res.minute, res.seconds);

    })

    this.setInitTime(this.initTime);

    this.timeFlow = this.startTimeFlow();

    // setTimeout(() => {
    //   clearInterval(this.inter)
    // }, 5000);
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

  startTimeFlow() {
    let s = 0;
    let m = parseInt(this.minute);
    let h = parseInt(this.hour);
    return setInterval(() => {
      if(h > 23){
        h = 0; m = 0; s = 0;
        this.changeTime({ hour: h, minute: m, seconds: s });
        return
      }
      if (m > 59) {
        h++; m = 0; s = 0;
        this.changeTime({ hour: h, minute: m, seconds: s });
        return
      }
      if (s > 59) {
        m++; s = 0;
        this.changeTime({ minute: m, seconds: s });
        return
      }
      this.changeTime({ seconds: s })
      s++
    }, 1)
  }

  onInputChange(event: any, item: string) {
    console.log(event.target.value)
    // let value = parseInt(event.target.value);
    // if (item === 'hour') {
    //   value > 23 ? value = 23 : value;
    //   value < 0 ? value = 0 : value;
    //   this.changeTime({ hour: value });
    // };
    // if (item === 'minute') {
    //   value > 59 ? value = 59 : value;
    //   value < 0 ? value = 0 : value;
    //   this.changeTime({ minute: value })
    // };
  }


  updateDigitalClock(newHour: number, newMinute: number): void {
    let hour: string;
    let minute: string;
    newHour < 10 ? hour = `0${newHour.toString()}` : hour = newHour.toString();
    newMinute < 10 ? minute = `0${newMinute.toString()}` : minute = newMinute.toString();
    this.hour = hour;
    this.minute = minute;
  }

  updateDialClock(newHour: number, newMinute: number, newSeconds: number) {
    const smHandAngle = newHour * 30 + newMinute * 0.5 + newSeconds * 0.01;
    const lgHandAngle = newMinute * 6 + newSeconds * 0.1;
    this.renderer.setStyle(this.smHand.nativeElement, 'transform', `rotateZ(${smHandAngle}deg)`)
    this.renderer.setStyle(this.lgHand.nativeElement, 'transform', `rotateZ(${lgHandAngle}deg)`)
  }

  changeTime(newTime: Partial<CurrentTime>): void {
    this.clockService.changeTime(newTime);
  }

  ngOnDestroy(): void {
    this.currentTime$.unsubscribe();
  }

}
