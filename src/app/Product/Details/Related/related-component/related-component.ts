import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductServices } from '../../../../_services/product-services';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../../_models/product';
import { LoadingService } from '../../../../_services/loading-service';
import { CategoryServices } from '../../../../_services/category-services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-related-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './related-component.html',
  styleUrl: './related-component.css',
})
export class RelatedComponent implements OnInit, OnDestroy {
  constructor(
    public categoryServices: CategoryServices,
    public activatedRouter: ActivatedRoute,
    public loadingServices: LoadingService,
    private router: Router
  ) {}
  private routeSub!: Subscription;
  products: Product[] = [];
  loadProducts() {
    this.loadingServices.show();
    this.routeSub = this.activatedRouter.params.subscribe((data) => {
      this.categoryServices.getProductsByCat(data[`catId`]).subscribe((res) => {
        this.products = res.data;
        console.log(res);
        this.loadingServices.hide();
      });
    });
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
  ngOnInit(): void {
    this.loadProducts();
  }
  Details(productId: number, catId: number) {
    this.router.navigate([`/details`, productId, 'related', catId]);
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
  
  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
