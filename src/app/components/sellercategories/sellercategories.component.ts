import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sellercategories',
  templateUrl: './sellercategories.component.html',
  styleUrls: ['./sellercategories.component.scss']
})
export class SellercategoriesComponent {
  categories: any[] = [];
  isNewCategoryModalOpen = false;
  selectedCategoryId: number | null = null;
  categoryCount: number | undefined;
  newCategory: any = {
    id: null,
    name: ''
  };

  constructor(private categoryService: CategoryService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  addCategory(): void {
    this.resetNewCategory(); 
    this.isNewCategoryModalOpen = true;
  }
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error loading products', error);
      }
    );
  }

  deleteCategory(categoryId: any): void {
    const confirmation = window.confirm('Are you sure you want to delete this category?');
    
    if (confirmation) {
      this.categoryService.deleteCategory(categoryId).subscribe(
        response => {
          this.snackBar.open(`Category with ID ${categoryId} deleted successfully`, 'Close', {
            duration: 3000,
          });
          console.log(`Category with ID ${categoryId} deleted successfully`, response);
          this.loadCategories();
        },
        error => {
          this.snackBar.open(`Error deleting category with ID ${categoryId}`, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'] 
          });
          console.error(`Error deleting category with ID ${categoryId}`, error);
        }
      );
    }
  }
  updateCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    const selectedCategory = this.categories.find(product => product.id === categoryId);

    if (selectedCategory) {
      this.newCategory = { ...selectedCategory };
      this.isNewCategoryModalOpen = true;
    }
  }

  saveCategory(form: NgForm) {
    if (this.selectedCategoryId !== null) {
      this.categoryService.updateCategory(this.selectedCategoryId, this.newCategory).subscribe(
        response => {
          this.snackBar.open(`Category with ID ${this.selectedCategoryId} updated successfully`, 'Close', {
            duration: 3000,
          });
          console.log(`Category with ID ${this.selectedCategoryId} updated successfully`, response);
          this.loadCategories();
        },
        error => {
          this.snackBar.open(`Error updating category with ID ${this.selectedCategoryId}`, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error(`Error updating category with ID ${this.selectedCategoryId}`, error);
        }
      );
    } else {
      this.categoryService.addCategory(this.newCategory).subscribe(
        response => {
          this.snackBar.open('New category added successfully', 'Close', {
            duration: 3000,
          });
          console.log('New category added successfully', response);
          this.loadCategories();
        },
        error => {
          this.snackBar.open('Error adding new category', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error adding new category', error);
        }
      );
    }
  
    this.closeModal();
  }
  
  
  openAddCategoryModal() {
    this.addCategory(); 
    console.log('Opening modal or form for adding a new category');
  }

  closeModal() {
    this.isNewCategoryModalOpen = false;
  }
  getNextCategoryId(): number {
    const maxId = Math.max(...this.categories.map(category => category.id), 0);
    return maxId + 1;
  }
  resetNewCategory(form?: NgForm) {
    this.newCategory = {
      ...this.newCategory,
      name: ''
    };
    if(form){
      form.resetForm();
    }
  }
  
  
}
