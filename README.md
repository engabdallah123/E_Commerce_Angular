# 🛒 E-Commerce Angular Project

This project is an **E-Commerce Web Application** built with **Angular**.  
It provides the core features of an online store such as product browsing, filtering, cart, wishlist, order management, and an **Admin Dashboard**.

---

## ✨ Features

### 👤 Customer Side
- **Products**
  - Browse all products.
  - Product details (images, description, price, etc.).
- **Categories**
  - Browse products by category.
- **Filter & Pagination**
  - Filter products by price, category, or search query.
  - Paginated product list for better navigation.
- **Cart**
  - Add products to shopping cart.
  - Update quantity or remove items.
- **Wishlist**
  - Save favorite products for later.
- **Orders**
  - Place new orders.
  - Track order status: `Pending → Processing → Shipped → Delivered → Cancelled`.

---

### 🛠️ Admin Dashboard
- **Products Management**
  - Add / Edit / Delete products.
  - Manage product categories.
- **Users Management**
  - Manage users (edit / block / delete).
- **Orders Dashboard**
  - View all orders from customers.
  - Update order status.
- **Messages**
  - Receive messages/feedback from customers.
- **(Optional) Statistics**
  - Display analytics about sales and orders.

---

## 🧰 Tech Stack
- **Frontend:** Angular, TypeScript, RxJS  
- **UI Framework:** Angular Material / Bootstrap / SCSS  
- **State Management:** NgRx (or Angular Services)  
- **Backend API:** ASP.NET Core Web API (or any RESTful API)  
- **Database:** SQL Server / MySQL (via backend)  

---

## 🎥 Demo Video

A detailed demo and walkthrough of the project is available on LinkedIn:
🔗 Watch the video

---

## 🔗 Backend API

The Angular frontend connects to the backend API here:  
[Backend Repository / API Link](YOUR_BACKEND_REPO_LINK)


## 🚀 Installation

```bash
# 1. Clone the repo
git clone https://github.com/engabdallah123/E_Commerce_Angular.git

# 2. Move to project folder
cd E_Commerce_Angular

# 3. Install dependencies
npm install

# 4. Run the project
ng serve -o

# 5. Configure API
- Make sure the Angular app points to the backend API URL in `environment.ts`:
```ts
export const environment = {
  production: false,
  apiUrl: 'https://your-backend-link.com/api'
};




