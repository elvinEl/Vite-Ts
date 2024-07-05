import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TopProductsType } from "../types/Types";
import {
  deleteBasket,
  incrementQuantity,
  decrementQuantity,
} from "../redux/basketSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";

function Basket() {
  const dispatch = useDispatch();
  const basketItems = useSelector((state: RootState) => state.basket.basket);
  const calculateTotalPrice = () => {
    let totalPrice: number = 0;
    basketItems.forEach((item: TopProductsType) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(3);
  };
  const handleDeleteItem = (id: number) => {
    dispatch(deleteBasket(id));
    toast.success("Товар удален из корзины");
  };
  const handleIncrementPrice = (id: number) => {
    dispatch(incrementQuantity(id));
  };
  const handleDecrementPrice = (id: number) => {
    dispatch(decrementQuantity(id));
  };
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-2 py-8 gap-8">
        {basketItems.map((item: TopProductsType) => (
          <div className="col-span-1 flex gap-4  font-medium" key={item.id}>
            <NavLink to={`/detail/${item.id}`}>
              <img className="h-[200px] object-cover w-full" src={item.img} alt="" />
            </NavLink>
            <div>
              {item.title} - {item.price.toFixed(3)}₽ x {item.quantity}
              <div className="flex gap-2">
                <button
                  onClick={() => handleIncrementPrice(item.id)}
                  className=" text-black px-3 hover:shadow-md border-[1px] border-gray-200 rounded-[4px] duration-200 "
                >
                  +
                </button>

                <button
                  onClick={() => handleDecrementPrice(item.id)}
                  className=" text-black px-3 hover:shadow-md rounded-[4px] border-[1px] border-gray-200 duration-200 "
                >
                  -
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded-[4px] duration-200 hover:bg-red-700"
                >
                  <FaRegTrashAlt size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="font-medium text-[24px]">
        Общие цены:{calculateTotalPrice()}₽
      </p>
    </div>
  );
}

export default Basket;
