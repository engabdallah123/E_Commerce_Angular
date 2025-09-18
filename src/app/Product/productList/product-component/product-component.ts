import { Component, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductServices } from '../../../_services/product-services';
import { Product } from '../../../_models/product';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../_services/loading-service';
import { SpinnerComponent } from '../../../core/spinner/spinner-component/spinner-component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WishlistServices } from '../../../_services/wishlist-services';
import Swal from 'sweetalert2';
import { CartServices } from '../../../_services/cart-services';
import { Subscription } from 'rxjs';





@Component({
  selector: 'app-product-component',
  standalone: true,
  imports: [SpinnerComponent, FormsModule, RouterModule, CommonModule],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductComponent implements OnInit {
  sub?: Subscription;

  slides = [
    { img: 'cat1.jpg', title: 'Slide 1' },
    { img: 'cat2.jpg', title: 'Slide 2' },
    { img: 'cat3.jpg', title: 'Slide 3' },
    { img: 'cat4.jpg', title: 'Slide 3' },
    { img: 'cat5.jpg', title: 'Slide 3' },
    { img: 'cat6.jpg', title: 'Slide 3' },
  ];

  products: Product[] | null = null;
  constructor(
    public productServices: ProductServices,
    public loadingServices: LoadingService,
    private wishlistServices: WishlistServices,
    private cartServices: CartServices,
    public router: Router
  ) {}

  loadProducts() {
    this.loadingServices.show();

    this.productServices.getAllProducts().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.products = res;
        } else if (res.data && Array.isArray(res.data)) {
          this.products = res.data;
        } else {
          this.products = [res];
        }

        this.loadingServices.hide();
      },
      error: (err) => {
        console.log(err);
        this.loadingServices.hide();
      },
      complete: () => console.log('done'),
    });
  }
  ngOnInit(): void {
    this.loadProducts();
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
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

