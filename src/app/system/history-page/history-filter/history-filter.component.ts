import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../../shared/models/category.models';

@Component({
  selector: 'wfm-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Input() categories: Category[] = [];

  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'},
  ];
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];
  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

   closeFilter() {
  this.selectedTypes = [];
  this.selectedCategories = [];
  this.selectedPeriod = 'd';
  this.onFilterCancel.emit();
  }

  calculateInputParams(field, checked, value) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i !== value);
    }
  }

  handleChangeType({checked, value}) {
    this.calculateInputParams('selectedTypes', checked, value);
  }

  handleChangeCategory({checked, value}) {
    this.calculateInputParams('selectedCategories', checked, value);

  }

  applyFilter() {
   this.onFilterApply.emit({
     types: this.selectedTypes,
     categories: this.selectedCategories,
     period: this.selectedPeriod
   });
  }
}
