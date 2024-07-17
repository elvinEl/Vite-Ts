import data from "../../mocks/topProductsData.json";
import { NavLink } from "react-router-dom";
import Button from "../../components/button/Button";
import { useDispatch } from "react-redux";
import { TopProductsType } from "../../types/Types";
import { handleAddBasket } from "../../components/utilities/handleBasket";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import PriceFilter from "../../components/utilities/PriceFilter";

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
            category.items.some(
              (prod) =>
                prod.id === item.id && category.name === selectedCategory
            )
          )
        : true;
      return isInCategory && item.price >= minPrice && item.price <= maxPrice;
    });

    setFilteredData(filtered);
  }, [minCount, maxCount, selectedCategory]);
  return (
    <>
      <PriceFilter
        minCount={minCount}
        setMinCount={setMinCount}
        maxCount={maxCount}
        setMaxCount={setMaxCount}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={data.categories}
      />
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
