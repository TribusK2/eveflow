import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { CurrentTime } from 'src/app/clock/models/current-time.model';
import { TimeService } from 'src/app/shared/services/time.service';
import * as sunColorsList from '../../shared/json/sun-colors.json'
import { SunColor } from 'src/app/shared/models/sun-color.model';
import { ColorsService } from 'src/app/shared/services/colors.service';

@Component({
  selector: 'app-sun',
  templateUrl: './sun.component.html',
  styleUrls: ['./sun.component.scss']
})
export class SunComponent implements OnInit, OnDestroy {

  private currentTime$: Subscription;
  public sunStyles = { 'left': "", 'top': "", 'background-color': "", 'box-shadow': "" };
  public sunShineStyles = { 'box-shadow': "" };
  public sunShineWideStyles = { 'box-shadow': "" };
  private initDisplacementTime: string;
  private initDisplacement: number;
  private circleRadius: number;
  private sunColors: SunColor[];

  constructor(
    private timeService: TimeService,
    private colorsService: ColorsService
  ) { }

  ngOnInit(): void {
    this.sunColors = sunColorsList.sunColors;
    this.initDisplacementTime = "01:00";
    this.circleRadius = 40 // % of paret Node

    // Calculate initial displacement time (for more realistic felling)
    this.initDisplacement = this.claculateAngle(this.initDisplacementTime);

    this.calculateStampAngles(this.sunColors);

    // Get current time
    this.currentTime$ = this.getCurrentTime().subscribe(res => {

      const sunAngle = ((res.hour * 30 + res.minute * 0.5 + res.second * 0.01) * (Math.PI / 180) / 2 + 6 / (12 / Math.PI) - this.initDisplacement);

      this.setSunPosition(sunAngle);
      this.setSunColors(sunAngle);

    });
  }

  /**
   * Setup sun colors
   * @param  {number} sunAngle
   * @returns void
   */
  setSunColors(sunAngle: number): void {
    let cutoffColors = this.sunColors.filter(color => sunAngle <= color.endAngle).slice(0, 2);
    if (cutoffColors.length < 2) cutoffColors.push(this.sunColors[0]);

    this.sunStyles["background-color"] = this.colorsService.setSunColors(cutoffColors[0], cutoffColors[1], sunAngle);
    this.sunStyles["box-shadow"] = this.colorsService.setSunShadow(cutoffColors[0], cutoffColors[1], sunAngle);
    this.sunShineStyles["box-shadow"] = this.colorsService.setSunShineShadow(cutoffColors[0], cutoffColors[1], sunAngle);
    this.sunShineWideStyles["box-shadow"] = this.colorsService.setSunShineWideShadow(cutoffColors[0], cutoffColors[1], sunAngle);

  }

  /**
   * Get current time parameters
   * @returns Observable
   */
  getCurrentTime(): Observable<CurrentTime> {
    return this.timeService.getCurrentTime();
  }

  /**
   * Calculate static angle of sun position
   * @param  {string} time
   * @returns number
   */
  claculateAngle(time: string): number {
    let timeArray = time.split(':');
    let initDisplacement = (parseInt(timeArray[0]) + parseInt(timeArray[1]) / 60) / (12 / Math.PI);
    return initDisplacement;
  }

  /**
   * Set sun position on the view depend on current time
   * @param  {CurrentTime} time
   * @returns void
   */
  setSunPosition(sunAngle: number): void {

    const xPos = (Math.cos(sunAngle)) * this.circleRadius;
    const yPos = (Math.sin(sunAngle)) * this.circleRadius;

    this.sunStyles.left = `${xPos}%`;
    this.sunStyles.top = `${yPos}%`;
  }

  /**
   * Calculate angle values for given sun colors
   * @param  {SunColor[]} colors
   * @returns void
   */
  calculateStampAngles(colors: SunColor[]): void {
    for (const color of colors) {
      const startAngle = this.claculateAngle(color.startTime);
      color.startAngle = startAngle + 6 / (12 / Math.PI) - this.initDisplacement;

      const endAngle = this.claculateAngle(color.endTime);
      color.endAngle = endAngle + 6 / (12 / Math.PI) - this.initDisplacement;
    }
  }

  ngOnDestroy() {
    this.currentTime$.unsubscribe();
  }

}
