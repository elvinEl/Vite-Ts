export interface basketInitialState {
  basket: TopProductsType[];
}
export interface TopProductsType {
  id: number;
  category: string;
  description: string;
  rating: Rating;
  image: string;
  price: number;
  title: string;
  quantity: number;
}
interface Rating {
  rate: number;
  count: number;
}
export interface SwiperType {
  id: number;
  title: string;
  description: string;
  btnText: string;
}
export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className: string;
  disabled: boolean;
  style: React.CSSProperties;
}
export interface InputProps {
  value: string | number;
  type: string;
  id: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className: string;
  required: boolean;
  disabled: boolean;
  tabIndex: number;
  autoComplete: string;
  checked: boolean;
}
export interface ColorTheme {
  colorScheme: string;
}
export interface Category {
  name: string;
  subcategories: string[];
}
export interface CategoryData {
  categories: Category[];
}
export interface CategoryInitialState {
  selectedCategory: string | null;
}
export interface PriceFilterType {
  minCount: string;
  setMinCount: (value: string) => void;
  maxCount: string;
  setMaxCount: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  categories: { name: string }[];
}
interface CurrencyRate {
  value: number;
}

export interface CurrencyRates {
  [key: string]: CurrencyRate;
}
