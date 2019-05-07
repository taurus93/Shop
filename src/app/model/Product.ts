export interface Product {
  productCode: string;
  productName: string;
  productPrice: number;
  productPicture: string;
  productDescription: string;
  categoryID_FK: number;
}
