import data from "../../mocks/topProductsData.json";
import { NavLink } from "react-router-dom";
import Button from "../button/Button";
import { useDispatch } from "react-redux";
import { TopProductsType } from "../../types/Types";
import { handleAddBasket } from "../utilities/handleBasket";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Input from "../input/Input";

function AllProducts() {
  const allProducts = data.categories.flatMap((category) => category.items);
  const dispatch = useDispatch();
  const [maxCount, setMaxCount] = useState<string>("");
  const [minCount, setMinCount] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredData, setFilteredData] =
    useState<TopProductsType[]>(allProducts);

    useEffect(() => {
      const minPrice = parseFloat(minCount) || 0;
      const maxPrice = parseFloat(maxCount) || Infinity;
  
      const filtered = allProducts.filter((item) => {
        const isInCategory = selectedCategory
          ? data.categories.some((category) =>
              category.items.some((prod) => prod.id === item.id && category.name === selectedCategory)
            )
          : true;
        return isInCategory && item.price >= minPrice && item.price <= maxPrice;
      });
  
      setFilteredData(filtered);
    }, [minCount, maxCount, selectedCategory]);
  return (
    <>
      <div className="flex gap-4 bg-[#FAFAFA] border-[1px] border-gray-300 p-4">
        <select
          className="outline-none px-3 py-1 border-[1px]"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" key="">
            All categories
          </option>
          {data.categories.map((category, index) => (
            <option value={category.name} key={index}>
              {category.name}
            </option>
          ))}
        </select>
        <Input
          value={minCount}
          onChange={(e) => setMinCount(e.target.value)}
          className="border-[1px] outline-none px-2"
          type="number"
          placeholder="min"
        />
        <Input
          value={maxCount}
          onChange={(e) => setMaxCount(e.target.value)}
          className="border-[1px] outline-none px-2"
          type="number"
          placeholder="max"
        />
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      {filteredData.length !== 0 ? (
        <div className="grid grid-cols-5 gap-6 py-4">
          {filteredData.map((product: TopProductsType) => (
            <div key={product.id} className="col-span-1 product-card">
              <NavLink
                to={`/detail/${product.id}`}
                className="flex justify-center"
              >
                <img className=" h-[200px]" src={product.img[0]} alt="" />
              </NavLink>
              <p className="font-bold flex gap-1 mt-2">
                Цена:
                <span className="font-normal">{product.price}₽</span>
              </p>
              <p className="text-[14px] mt-2 line-clamp-2">{product.title}</p>
              <Button
                onClick={() => handleAddBasket(dispatch, product)}
                className="px-5 py-2 mt-2 rounded-sm hover:bg-blue-800 duration-200 bg-[#365EDC] uppercase text-white text-[14px]"
              >
                {product.btnText}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-[18px] font-bold flex  items-center pt-16">
          Нет товаров с такими ценами
        </div>
      )}
    </>
  );
}

export default AllProducts;
