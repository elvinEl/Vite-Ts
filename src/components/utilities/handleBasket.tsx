import { Dispatch } from "react";
import toast from "react-hot-toast";
import { TopProductsType } from "../../types/Types";
import { addBasket } from "../../redux/basketSlice";

export const handleAddBasket = (
  dispatch: Dispatch<any>,
  product: TopProductsType
) => {
  dispatch(addBasket(product));
  toast.success("Товар добавлен в корзину");
};
