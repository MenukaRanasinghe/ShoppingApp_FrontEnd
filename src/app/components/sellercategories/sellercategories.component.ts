import { Component } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-sellercategories',
  templateUrl: './sellercategories.component.html',
  styleUrls: ['./sellercategories.component.scss']
})
export class SellercategoriesComponent {
  categories: any[] = [];
  categoryCount: number | undefined;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  addCategory(): void {
    console.log('Add Category clicked');
  }

  updateCategory(categoryId: number): void {
    console.log(`Update category clicked for ID: ${categoryId}`);
  }

  deleteCategory(categoryId: number): void {
    console.log(`Delete category clicked for ID: ${categoryId}`);
  }
}
