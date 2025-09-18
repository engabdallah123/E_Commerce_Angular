export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}
export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public brand: string,
    public rating: number,
    public imageUrl: string,
    public catName: string,
    public category: Category,
    public catId:number
  ) {}
}
