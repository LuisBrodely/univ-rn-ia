export interface ResponseProducts {
  data:       Product[];
  message:    string;
  success:    boolean;
  httpStatus: string;
}

export interface ResponseProduct {
  data:       Product;
  message:    string;
  success:    boolean;
  httpStatus: string;
}

export interface ResponsePrice {
  data:       Price;
  message:    string;
  success:    boolean;
  httpStatus: string;
}

export interface Product {
  id:          number;
  name:        string;
  description: string;
  details:     string;
  prices:      Price[];
}

export interface Price {
  id:          number;
  price:       number;
  currency:    string;
  description: string;
}

export interface ProductClass {
  data: string;
}