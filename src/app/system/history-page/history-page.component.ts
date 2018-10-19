import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';

import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Category} from '../shared/models/category.models';
import {WFMEvent} from '../shared/models/event.models';

@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor(private categoriesService: CategoriesService,
              private eventService: EventsService) { }

  isLoaded = false;
  categories: Category[] = [];
  events: WFMEvent[] = [];
  chartData = [];
  s1: Subscription;
  isFilterVisibility = false;
  fiteredEvents: WFMEvent[] = [];
  existFiltered = false;

  ngOnInit() {
    this.s1 = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Category[], WFMEvent[]]) => {
       this.categories = data[0];
       this.events = data[1];
       this.isLoaded = true;
      this.setOriginalEvents();
       this.calculateChartData();
    });
  }

  calculateChartData(type: string = 'outcome'): void {
     this.chartData = [];
     this.categories.forEach((cat) => {
        const CatEvent = this.fiteredEvents.filter((e) => e.category === cat.id && e.type === type);

        this.chartData.push({
          name: cat.name,
          value: CatEvent.reduce((total, e) => total + e.amount, 0)
        });
     });
  }

  private toggleFilterVisibility(dir: boolean) {
     this.isFilterVisibility = dir;
  }

  private setOriginalEvents() {
    this.fiteredEvents = this.events.slice();
  }
  openFilter() {
    this.toggleFilterVisibility(true);

  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
    this.existFiltered = false;


  }

  onFilterApply(filterData) {

    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.fiteredEvents = this.fiteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDay = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDay.isBetween(startPeriod, endPeriod);
      });
    this.existFiltered = true;
    this.calculateChartData(filterData.types[0]);
  }

   ngOnDestroy() {
    if (this.s1) {this.s1.unsubscribe(); }
   }
}
