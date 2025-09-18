import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductServices } from '../../../_services/product-services';
import { CategoryServices } from '../../../_services/category-services';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-component.html',
  styleUrl: './add-component.css',
})
export class AddComponent implements OnInit {
  productForm!: FormGroup;
  previewUrls: string[] = [];
  selectedFiles: File[] = [];
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductServices,
    private categoryServices: CategoryServices
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      stock: [0, Validators.required],
      brand: [''],
      catId: [null, Validators.required],
    });

    this.loadCategories();
  }
  loadCategories() {
    this.categoryServices.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: (err) => console.error('❌ Error in load categories', err),
    });
  }

  // : Add Product
  onSubmit() {
    if (this.productForm.invalid) return;

    this.productService.AddProduct(this.productForm.value).subscribe({
      next: (res: any) => {
        console.log('✅ Product Added', res);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product Added Successfully',
          showConfirmButton: false,
          timer: 1000,
          customClass: {
            popup: 'my-swal',
          },
        });
        if (this.selectedFiles.length > 0) {
          this.uploadPhotos(res.productId);
        }
      },
      error: (err) => console.error('❌ Add product failed', err),
    });
  }

  // Upload Photos
  uploadPhotos(productId: number) {
    const formData = new FormData();
    this.selectedFiles.forEach((file) => formData.append('Files', file));
    formData.append('ProductId', productId.toString());

    this.productService.UploadPhoto(formData).subscribe({
      next: (res) => console.log('✅ Photos uploaded', res),
      error: (err) => console.error('❌ Upload failed', err),
    });
  }

  // File input handler
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files); // هنا بيجمع كل الصور

      // Preview
      this.previewUrls = [];
      this.selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }
}
