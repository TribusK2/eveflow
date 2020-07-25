import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

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
export class ClockComponent implements OnInit, AfterViewInit {

  @ViewChild('clockDial', { static: true }) clockDial: ElementRef;

  public markers: Marker[] = [];

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {

    this.setClockMarkers();

    this.renderer.listen("window", "resize", () => {
      this.setClockMarkers();
    });

  }

  ngAfterViewInit() {

  }

  setClockMarkers() {
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

}
