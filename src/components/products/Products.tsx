import data from "../../mocks/topProductsData.json";
import { TopProductsType } from "../../types/Types";
import { useDispatch } from "react-redux";
import { addBasket } from "../../redux/basketSlice";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function TopProducts() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<TopProductsType[]>(data);
  const [selectedFilter, setSelectedFilter] = useState("");
  const handleAddBasket = (product: TopProductsType) => {
    dispatch(addBasket(product));
    toast.success("Товар добавлен в корзину");
  };

  const handleFilter = (filterValue: string) => {
    console.log(filterValue);
    setSelectedFilter(filterValue);
    if (filterValue === "asc") {
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    } else if (filterValue === "desc") {
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setProducts(sortedProducts);
    }
  };

  return (
    <div className="py-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between items-center">
        <p className="text-[30px] font-medium">Недавние объявления</p>

        <select
          className="border-[1px] outline-none"
          onChange={(e) => handleFilter(e.target.value)}
          value={selectedFilter}
        >
          <option value="asc" key="asc">
            сначала дешёвые
          </option>
          <option value="desc" key="desc">
            сначала дорогие
          </option>
        </select>
      </div>
      <div className="grid grid-cols-6 gap-6 py-4">
        {products.map((product: TopProductsType) => (
          <div key={product.id} className="col-span-1">
            <NavLink to={`/detail/${product.id}`}>
              <img className="w-full h-[200px]" src={product.img} alt="" />
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
