import data from "../../mocks/topProductsData.json";
import { TopProductsType } from "../../types/Types";
import { useDispatch } from "react-redux";
import { addBasket } from "../../redux/basketSlice";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";

function TopProducts() {
  const dispatch = useDispatch();
  const handleAddBasket = (product: TopProductsType) => {
    dispatch(addBasket(product));
    toast.success("Товар добавлен в корзину");
  };

  return (
    <div className="py-8">
      <Toaster position="top-center" reverseOrder={false} />
      <p className="text-[30px] font-medium">Популярные товары</p>
      <div className="grid grid-cols-6 gap-6 py-4">
        {data.map((product: TopProductsType) => (
          <div key={product.id} className="col-span-1">
            <NavLink to={`/detail/${product.id}`}>
              <img className="w-full" src={product.img} alt="" />
            </NavLink>
            <p className="font-bold flex gap-1 mt-2">
              Цена:
              <span className="font-normal">{product.price.toFixed(3)}₽</span>
            </p>
            <p className="text-[14px] mt-2">{product.title}</p>
            <button
              onClick={() => handleAddBasket(product)}
              className="px-5 py-2 mt-2 rounded-sm hover:bg-blue-800 duration-200 bg-[#365EDC]  uppercase text-white text-[14px]"
            >
              {product.btnText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopProducts;
