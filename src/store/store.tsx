import { create } from 'zustand';
import axiosInstanceCrud from '../api/axiosInstanceCrud';
import { Product, ResponseProducts, ResponseProduct, ResponsePrice } from '../models/Product';
import { Price } from '../models/Product';

type State = {
  products: Product[];
  productClass: string;
  product: Product;
};

type Actions = {
  getProducts: () => Promise<void>;
  getProduct: (productClass: string) => Promise<void>;
  setProductClass: (productClass: string) => void;
  addPrice: (priceData: Price, product: Product) => Promise<void>;
  editPrice: (priceData: Price, product: Product) => Promise<void>;
  deletePrice: (priceId: number) => Promise<void>;
};

const useProductStore = create<State & Actions>((set) => ({
  products: [],
  productClass: '',
  product: {
    id: 0,
    name: '',
    description: '',
    details: '',
    prices: []
  },
  getProducts: async () => {
    try {
      const response = await axiosInstanceCrud.get<ResponseProducts>('/products');
      const { data } = response.data;
      set({ products: data });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  getProduct: async (productClass: string) => {
    try {
      const response = await axiosInstanceCrud.get<ResponseProduct>(`/products/${productClass}`);
      const { data } = response.data;
      set({ product: data });
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  },
  setProductClass: (productClass: string) => set({ productClass }),
  addPrice: async (priceData: Price, product: Product) => {
    try {
      const productId = product.id;
      const addPriceData = {
        ...priceData,
        productId
      };
      const response = await axiosInstanceCrud.post<ResponsePrice>('/prices', addPriceData);
      const { data } = response.data;
      set((state) => ({
        product: {
          ...state.product,
          prices: [...state.product.prices, data]
        }
      }));
    } catch (error) {
      console.error('Error adding price:', error);
    }
  },
  editPrice: async (priceData: Price, product: Product) => {
    try {
      const productId = product.id;
      const updatedPriceData = {
        ...priceData,
        productId
      };
      const response = await axiosInstanceCrud.put<ResponsePrice>(`/prices/${priceData.id}`, updatedPriceData);
      const { data } = response.data;
      set((state) => ({
        product: {
          ...state.product,
          prices: state.product.prices.map((price) => (price.id === data.id ? data : price))
        }
      }));
    } catch (error) {
      console.error('Error editing price:', error);
    }
  },
  deletePrice: async (priceId: number) => {
    try {
      await axiosInstanceCrud.delete(`/prices/${priceId}`);
      set((state) => ({
        product: {
          ...state.product,
          prices: state.product.prices.filter((price) => price.id !== priceId)
        }
      }));
    } catch (error) {
      console.error('Error deleting price:', error);
    }
  }
}));

export default useProductStore;
