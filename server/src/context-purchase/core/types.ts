type Flower = {
  id: number;
  flowerCode: string;
  name: string;
  deliveryDays: number;
  purchaseQuantity: number;
  maintanableDays: number;
};

export type PurchaseDetail = {
  flower: Flower;
  orderQuantity: number;
};

export type Purchase = {
  deliveryDate: Date;
  purchaseDetails: PurchaseDetail[];
};

export type CreatedPurchase = Purchase & {
  id: number;
};

export type PurchaseArrival = {
  id: number;
  purchaseId: number;
  arrivedAt: Date;
};
