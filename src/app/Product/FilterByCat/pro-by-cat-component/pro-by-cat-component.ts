import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryServices } from '../../../_services/category-services';
import { Category } from '../../../_models/category';
import { Product } from '../../../_models/product';
import { LoadingService } from '../../../_services/loading-service';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../../core/spinner/spinner-component/spinner-component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { WishlistServices } from '../../../_services/wishlist-services';
import { CartServices } from '../../../_services/cart-services';




@Component({
  selector: 'app-pro-by-cat-component',
  imports: [FormsModule, SpinnerComponent, CommonModule, RouterModule],
  templateUrl: './pro-by-cat-component.html',
  styleUrl: './pro-by-cat-component.css',
})
export class ProByCatComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRouter: ActivatedRoute,
    public categoryServices: CategoryServices,
    public loadingServices: LoadingService,
    private wishlistServices: WishlistServices,
    private cartServices: CartServices,
    private router: Router
  ) {}
  private routeSub!: Subscription;

  category!: Category;
  products: Product[] = [];

  ngOnInit(): void {
    this.routeSub = this.activatedRouter.params.subscribe((params) => {
      const categoryId = +params['id'];
      this.loadProducts(categoryId);
    });
  }
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
  loadProducts(categoryId: number) {
    this.loadingServices.show();
    this.categoryServices.getProductsByCat(categoryId).subscribe({
      next: (res) => {
        this.products = res.data;
        if (this.products.length > 0) {
          this.category = this.products[0].category;
        }
        console.log(res);
        this.loadingServices.hide();
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.loadingServices.hide();
      },
    });
  }
  
  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  // wishlist
  addToWishlist(product: Product) {
    this.wishlistServices.add(product);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Added To Wishlist Successfully',
      showConfirmButton: false,
      timer: 1000,
      customClass: {
        popup: 'my-swal',
      },
    });
  }
  // get images
  getImageUrl(url: any): string {
    if (!url) return 'logo3.png'; // صورة افتراضية

    const strUrl = String(url); //  forever return it to string

    if (strUrl.startsWith('http')) {
      return strUrl; // from internet
    }

    return 'http://localhost:5104' + strUrl; // from my server
  }

  // cart
  addToCart(prduct: Product) {
    this.cartServices.addToCart(prduct);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Added To Cart Successfully',
      showConfirmButton: false,
      timer: 1000,
      customClass: {
        popup: 'my-swal',
      },
    });
  }
  Details(productId: number, catId: number) {
    this.router.navigate([`/details`, productId, 'related', catId]);
  }
}
