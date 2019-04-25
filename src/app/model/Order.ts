export interface Order {
  orderDate: string;
  quantity: number;
  totalPrice: number;
  productPicture: string;
  productName: string;
  productDescription: string;
  productID_FK: number;
  userEmail_FK: string;
  paymentID_FK: number;
}
