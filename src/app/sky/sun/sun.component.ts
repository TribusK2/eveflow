import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { CurrentTime } from 'src/app/clock/models/current-time.model';
import { TimeService } from 'src/app/shared/services/time.service';
import * as sunColorsList from '../../shared/json/sun-colors.json'
import { SkyObjectColor } from 'src/app/shared/models/sky-object-color.model';
import { ColorsService } from 'src/app/shared/services/colors.service';
import { MathService } from 'src/app/shared/services/math.service';

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
  private sunColors: SkyObjectColor[];

  constructor(
    private timeService: TimeService,
    private colorsService: ColorsService,
    private mathService: MathService,
  ) { }

  ngOnInit(): void {
    this.sunColors = sunColorsList.sunColors;
    this.initDisplacementTime = "01:00";
    this.circleRadius = 40 // % of paret Node

    // Calculate initial displacement time (for more realistic felling)
    this.initDisplacement = this.mathService.claculateAngle(this.initDisplacementTime);

    this.mathService.calculateStampAngles(this.sunColors, this.initDisplacement);

    // Get current time
    this.currentTime$ = this.getCurrentTime().subscribe(res => {

      const sunAngle = (((res.hour + res.minute / 60 + res.second / 3600)*30) * (Math.PI / 180) / 2 + 6 / (12 / Math.PI) - this.initDisplacement);

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

    this.sunStyles["background-color"] = this.colorsService.setColors(cutoffColors[0], cutoffColors[1], sunAngle);
    this.sunStyles["box-shadow"] = this.colorsService.setShadow(cutoffColors[0], cutoffColors[1], sunAngle);
    this.sunShineStyles["box-shadow"] = this.colorsService.setShineShadow(cutoffColors[0], cutoffColors[1], sunAngle);
    this.sunShineWideStyles["box-shadow"] = this.colorsService.setShineWideShadow(cutoffColors[0], cutoffColors[1], sunAngle);

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
   * Get current time parameters
   * @returns Observable
   */
  getCurrentTime(): Observable<CurrentTime> {
    return this.timeService.getCurrentTime();
  }

  ngOnDestroy() {
    this.currentTime$.unsubscribe();
  }

}
