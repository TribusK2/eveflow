import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import * as moonColorsList from '../../shared/json/moon-colors.json'
import { SkyObjectColor } from 'src/app/shared/models/sky-object-color.model';
import { MathService } from 'src/app/shared/services/math.service';
import { TimeService } from 'src/app/shared/services/time.service';
import { CurrentTime } from 'src/app/clock/models/current-time.model';
import { ColorsService } from 'src/app/shared/services/colors.service';

@Component({
  selector: 'app-moon',
  templateUrl: './moon.component.html',
  styleUrls: ['./moon.component.scss']
})
export class MoonComponent implements OnInit, OnDestroy {

  private currentTime$: Subscription;
  public moonStyles = { 'left': "", 'top': "", 'background-color': "" };
  public moonShineStyles = { 'box-shadow': "" };
  public moonShineWideStyles = { 'box-shadow': "" };
  private initDisplacementTime: string;
  private initDisplacement: number;
  private circleRadius: number;
  private moonColors: SkyObjectColor[];

  constructor(
    private timeService: TimeService,
    private colorsService: ColorsService,
    private mathService: MathService,
  ) { }

  ngOnInit(): void {
    this.moonColors = moonColorsList.moonColors;
    this.initDisplacementTime = "10:00";
    this.circleRadius = 40 // % of paret Node

    // Calculate initial displacement time (for change possition in relation to sun)
    this.initDisplacement = this.mathService.claculateAngle(this.initDisplacementTime);

    this.mathService.calculateStampAngles(this.moonColors, this.initDisplacement);

    // Get current time
    this.currentTime$ = this.getCurrentTime().subscribe(res => {

      const moonAngle = (((res.hour + res.minute / 60 + res.second / 3600)*30) * (Math.PI / 180) / 2 + 6 / (12 / Math.PI) - this.initDisplacement);

      this.setMoonPosition(moonAngle);
      this.setMoonColors(moonAngle);

    });
  }

  /**
   * Setup moon colors
   * @param  {number} moonAngle
   * @returns void
   */
  setMoonColors(moonAngle: number): void {
    let cutoffColors = this.moonColors.filter(color => moonAngle <= color.endAngle).slice(0, 2);
    if (cutoffColors.length < 2) cutoffColors.push(this.moonColors[0]);

    this.moonStyles["box-shadow"] = `inset 0 0 500px ${this.colorsService.setColors(cutoffColors[0], cutoffColors[1], moonAngle)}`;
    this.moonShineStyles["box-shadow"] = `0 0 60px 22px ${this.colorsService.setShineShadow(cutoffColors[0], cutoffColors[1], moonAngle)}`;
    this.moonShineWideStyles["box-shadow"] = this.colorsService.setShineWideShadow(cutoffColors[0], cutoffColors[1], moonAngle);

  }

  /**
   * Set moon position on the view depend on current time
   * @param  {CurrentTime} time
   * @returns void
   */
  setMoonPosition(moonAngle: number): void {

    const xPos = (Math.cos(moonAngle)) * this.circleRadius;
    const yPos = (Math.sin(moonAngle)) * this.circleRadius;

    this.moonStyles.left = `${xPos}%`;
    this.moonStyles.top = `${yPos}%`;
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
