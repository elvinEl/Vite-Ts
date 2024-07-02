export interface basketInitialState {
  basket: TopProductsType[];
}
export interface TopProductsType {
  id: number;
  img: string;
  price: number;
  title: string;
  btnText: string;
}
export interface SwiperType {
  id: number;
  title: string;
  description: string;
  btnText: string;
}
