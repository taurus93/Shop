export interface Order {
  orderDate: string;
  quantity: number;
  totalPrice: number;
  productID_FK: number;
  userEmail_FK: string;
  paymentID_FK: number;
}
