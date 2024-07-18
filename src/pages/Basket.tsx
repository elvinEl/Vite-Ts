import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TopProductsType, CurrencyRates } from "../types/Types";
import {
  deleteBasket,
  incrementQuantity,
  decrementQuantity,
} from "../redux/basketSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import Button from "../components/button/Button";
import { AiOutlineInbox } from "react-icons/ai";
import useConvertCurrency from "../components/utilities/convertCurrency";

function Basket() {
  const dispatch = useDispatch();
  const basketItems = useSelector((state: RootState) => state.basket.basket);
  const theme = useSelector((state: RootState) => state.theme.colorScheme);

  const currencyRates: CurrencyRates = useConvertCurrency();
  const selectedCurrency = useSelector(
    (state: RootState) => state.currency.selectedCurrency
  );
  const convertPrice = (price: number) => {
    if (currencyRates[selectedCurrency]) {
      return (price / currencyRates[selectedCurrency].value).toFixed(0);
    }
    return price;
  };
  const calculateTotalPrice = () => {
    let totalPrice: number = 0;
    basketItems.forEach((item: TopProductsType) => {
      totalPrice += item.price * item.quantity;
    });
    return convertPrice(totalPrice);
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
      {basketItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center text-[18px] font-bold h-[10rem] border-[2px] rounded-[8px]">
          <span>
            <AiOutlineInbox size={32} />
          </span>
          Корзина пуста.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 py-8 gap-8">
            {basketItems.map((item: TopProductsType) => (
              <div className="col-span-1 flex gap-4  font-medium" key={item.id}>
                <NavLink to={`/detail/${item.id}`}>
                  <img
                    className="h-[200px] w-[200px] object-cover "
                    src={item.img[0]}
                    alt=""
                  />
                </NavLink>
                <div>
                  {item.title} - {item.price}
                  {selectedCurrency} x {item.quantity}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleIncrementPrice(item.id)}
                      className={` text-black px-3 hover:shadow-md border-[1px] border-gray-200 rounded-[4px] duration-200 ${
                        theme === "dark" ? "text-white" : ""
                      }`}
                    >
                      +
                    </Button>

                    <Button
                      onClick={() => handleDecrementPrice(item.id)}
                      className={` text-black px-3 hover:shadow-md border-[1px] border-gray-200 rounded-[4px] duration-200 ${
                        theme === "dark" ? "text-white" : ""
                      }`}
                    >
                      -
                    </Button>
                    <Button
                      onClick={() => handleDeleteItem(item.id)}
                      className="bg-red-600 text-white px-3 py-2 rounded-[4px] duration-200 hover:bg-red-700"
                    >
                      <FaRegTrashAlt size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="font-medium text-[24px]">
            Общие цены:{calculateTotalPrice()}
            {selectedCurrency}
          </p>
        </>
      )}
    </div>
  );
}

export default Basket;
