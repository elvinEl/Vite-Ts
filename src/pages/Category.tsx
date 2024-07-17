import products from "../mocks/topProductsData.json";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { NavLink } from "react-router-dom";
import Button from "../components/button/Button";
import { handleAddBasket } from "../components/utilities/handleBasket";
import { Toaster } from "react-hot-toast";
import PriceFilter from "../components/utilities/PriceFilter";
import { useState } from "react";
function Category() {
  const dispatch = useDispatch();
  const categoryName = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const selectedCategory = products.categories.find(
    (category) => category.name === categoryName
  );
  const [maxCount, setMaxCount] = useState<string>("");
  const [minCount, setMinCount] = useState<string>("");
  const [selectedCategoryName, setSelectedCategoryName] =
    useState<string>(categoryName || "");
  const filteredItems = selectedCategory
    ? selectedCategory.items.filter((item) => {
        const minPrice = parseFloat(minCount) || 0;
        const maxPrice = parseFloat(maxCount) || Infinity;
        return item.price >= minPrice && item.price <= maxPrice;
      })
    : [];
  if (!selectedCategory) {
    return <p>Категория не найдена</p>;
  }

  return (
    <div>
      <PriceFilter
        minCount={minCount}
        setMinCount={setMinCount}
        maxCount={maxCount}
        setMaxCount={setMaxCount}
        selectedCategory={selectedCategoryName}
        setSelectedCategory={setSelectedCategoryName}
        categories={products.categories}
      />
      <div className="grid grid-cols-5 gap-5 py-4 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
        <Toaster position="top-center" reverseOrder={false} />

        {filteredItems
          ? filteredItems.map((product) => (
              <div key={product.id} className="col-span-1 product-card">
                <NavLink
                  to={`/detail/${product.id}`}
                  className="flex justify-center"
                >
                  <img className="h-[200px]" src={product.img[0]} alt="" />
                </NavLink>
                <p className="font-bold flex gap-1 mt-2">
                  Цена:
                  <span className="font-normal">{product.price}₽</span>
                </p>
                <p className="text-[14px] mt-2 line-clamp-2">{product.title}</p>
                <Button
                  onClick={() => handleAddBasket(dispatch, product)}
                  className="px-5 py-2 mt-2 rounded-sm hover:bg-blue-800 duration-200 bg-[#365EDC]  uppercase text-white text-[14px]"
                >
                  {product.btnText}
                </Button>
              </div>
            ))
          : "Товар не найден"}
      </div>
    </div>
  );
}

export default Category;
