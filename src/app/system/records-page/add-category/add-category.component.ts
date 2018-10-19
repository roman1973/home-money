import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/models/category.models';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {
  @Output() onCategoryAdd = new EventEmitter<Category>();
  sub1: Subscription;

  constructor(private categoriesService: CategoriesService) { }



  onSubmit(form: NgForm) {

     let { name, capacity } = form.value;
     const category = new Category(name, capacity);
     if (capacity < 0) { capacity *= -1; }
     this.categoriesService.addCategory(category)
       .subscribe((categorys: Category) => {
         form.reset();
         form.form.patchValue({capasity: 1});
         this.onCategoryAdd.emit(categorys)
    });

  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();

  }


}
