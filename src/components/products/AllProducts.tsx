import data from "../../mocks/topProductsData.json";
import { NavLink } from "react-router-dom";
import Button from "../button/Button";
import { useDispatch } from "react-redux";
import { TopProductsType } from "../../types/Types";
import { handleAddBasket } from "../utilities/handleBasket";
import { Toaster } from "react-hot-toast";
import Filter from "../filter/Filter";

function AllProducts() {
  const dispatch = useDispatch();
  return (
    <>
      <Filter />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-6 gap-6 py-4">
        {data.map((product: TopProductsType) => (
          <div key={product.id} className="col-span-1 product-card">
            <NavLink to={`/detail/${product.id}`}>
              <img className="w-full h-[200px]" src={product.img[0]} alt="" />
            </NavLink>
            <p className="font-bold flex gap-1 mt-2">
              Цена:
              <span className="font-normal">{product.price.toFixed(3)}₽</span>
            </p>
            <p className="text-[14px] mt-2 line-clamp-2">{product.title}</p>
            <Button
              onClick={() => handleAddBasket(dispatch, product)}
              className="px-5 py-2 mt-2 rounded-sm hover:bg-blue-800 duration-200 bg-[#365EDC]  uppercase text-white text-[14px]"
            >
              {product.btnText}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllProducts;
