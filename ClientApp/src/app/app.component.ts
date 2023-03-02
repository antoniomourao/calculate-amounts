import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app';

  /**
   * Service
   *
   * @readonly
   * @type {AppService}
   * @memberof AppComponent
   */
  public get service(): AppService {
    return this.service;
  }

  constructor(private readonly appService: AppService) {}
}
