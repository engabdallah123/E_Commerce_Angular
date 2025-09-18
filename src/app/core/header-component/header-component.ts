import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryServices } from '../../_services/category-services';
import { WishlistServices } from '../../_services/wishlist-services';
import { CartServices } from '../../_services/cart-services';
import { AccountServices } from '../../_services/account-services';
import Swal from 'sweetalert2';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public categoryServices: CategoryServices,
    private router: Router,
    public wishlistServices: WishlistServices,
    public cartServices: CartServices,
    public accountServices: AccountServices
  ) {}

  wishlistCount: number = 0;
  cartCount: number = 0;
  claims: any = null;
  // Dropdown Categories
  categories: Category[] | null = [];
  ngOnInit(): void {
    this.claims = this.accountServices.GetClaims();
    this.categoryServices.getAllCategories().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.categories = res;
        } else if (res.data && Array.isArray(res.data)) {
          this.categories = res.data;
        } else {
          this.categories = [res];
        }
      },
      error: (err) => console.error(err),
    });

    this.wishlistServices.wishlistCount$.subscribe((count) => {
      this.wishlistCount = count;

      this.cartServices.cartCount$.subscribe((count) => {
        this.cartCount = count;
      });
    });
  }
  onCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const categoryId = select.value;
    if (categoryId) {
      this.router.navigate(['/ProByCat', categoryId]);
    }
  }

  // Sticky header on scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  // Mobile menu
  isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Profile dropdown
  @ViewChild('menu') menuRef!: ElementRef;
  menuOpen: boolean = false;
  toggleMenuProfile() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (
      this.menuOpen &&
      this.menuRef &&
      !this.menuRef.nativeElement.contains(event.target)
    ) {
      this.menuOpen = false;
    }
  }
  Logout() {
    this.accountServices.Logout();
    this.router.navigate([`/login`]);
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: `Please come back to us`,
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'my-swal',
      },
    });
  }
}
