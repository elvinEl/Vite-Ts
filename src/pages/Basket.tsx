import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TopProductsType } from "../types/Types";
import { deleteBasket } from "../redux/basketSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

function Basket() {
  const dispatch = useDispatch();
  const basketItems = useSelector((state: RootState) => state.basket.basket);
  const calculateTotalPrice = () => {
    let totalPrice: number = 0;
    basketItems.forEach((item: TopProductsType) => {
      totalPrice += item.price;
    });
    return totalPrice.toFixed(3);
  };
  const handleDeleteItem = (id: number) => {
    dispatch(deleteBasket(id));
    toast.success("Товар удален из корзины");
  };
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-2 py-8 gap-8">
        {basketItems.map((item: TopProductsType) => (
          <div className="col-span-1 flex gap-4  font-medium" key={item.id}>
            <img src={item.img} alt="" /> {item.title} - {item.price.toFixed(3)}
            ₽
            <div>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="bg-red-600 text-white px-2 py-2 rounded-[4px] duration-200 hover:bg-red-700"
              >
                <FaRegTrashAlt size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="font-medium text-[24px]">
        Total prices:{calculateTotalPrice()}₽
      </p>
    </div>
  );
}

export default Basket;
