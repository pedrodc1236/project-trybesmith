export interface ProductDetails {
  name: string,
  amount: string,
}

export interface ProductId extends ProductDetails {
  id?: number,
}

export interface ProductFull extends ProductId {
  orderId: number,
}
