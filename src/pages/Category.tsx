import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { NavLink } from "react-router-dom";
import Button from "../components/button/Button";
import { handleAddBasket } from "../components/utilities/handleBasket";
import { Toaster } from "react-hot-toast";
import PriceFilter from "../components/utilities/PriceFilter";
import useConvertCurrency from "../components/utilities/convertCurrency";
import { CurrencyRates, TopProductsType } from "../types/Types";
import { renderStars } from "../components/utilities/renderStars";
import Skeleton from "../components/skeleton/Skeleton";
import { useGetProductsByCategoryQuery } from "../redux/api/fakeApi";
function Category() {
  const dispatch = useDispatch();
  const categoryName = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const validCategoryName = categoryName || "";
  const { data: selectedCategory, isLoading } = useGetProductsByCategoryQuery({
    categoryName: validCategoryName,
  });

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

  const [maxCount, setMaxCount] = useState<string>("");
  const [minCount, setMinCount] = useState<string>("");
  // const [selectedCategoryName, setSelectedCategoryName] = useState<string>(
  //   categoryName || ""
  // );

  const filteredItems = (selectedCategory || []).filter((item) => {
    const minPrice = parseFloat(minCount) || 0;
    const maxPrice = parseFloat(maxCount) || Infinity;
    return item.price >= minPrice && item.price <= maxPrice;
  });

  return (
    <div>
      <PriceFilter
        minCount={minCount}
        setMinCount={setMinCount}
        maxCount={maxCount}
        setMaxCount={setMaxCount}
        // selectedCategory={selectedCategoryName}
        // setSelectedCategory={setSelectedCategoryName}
      />
      <div className="grid grid-cols-5 gap-5 py-4 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
        <Toaster position="top-center" reverseOrder={false} />

        {isLoading
          ? Array.from({ length: 10 }).map((_: void, index: number) => (
              <div
                key={index}
                className="col-span-1 product-card flex flex-col justify-between"
              >
                <Skeleton type="image" />
                <Skeleton type="title" />
                <Skeleton type="price" />
                <Skeleton type="category" />
                <Skeleton type="rating" />
                <Skeleton type="button" />
              </div>
            ))
          : filteredItems.map((product: TopProductsType) => (
              <div
                key={product.id}
                className="col-span-1 product-card flex flex-col justify-between"
              >
                <NavLink
                  to={`/detail/${product.id}`}
                  className="flex justify-center"
                >
                  <img
                    className="h-[200px]"
                    src={product.image}
                    alt={product.title}
                  />
                </NavLink>
                <p className="font-bold flex gap-1 mt-2">
                  Цена:
                  <span className="font-normal">
                    {convertPrice(product.price)} {selectedCurrency}
                  </span>
                </p>
                <p className="text-[14px] mt-2 line-clamp-2 ">
                  Category :
                  <span className="uppercase font-bold">
                    {" "}
                    {product.category}
                  </span>{" "}
                </p>
                <p className="text-[14px]  line-clamp-2">{product.title}</p>
                <p className="text-[14px] line-clamp-2 flex items-center gap-1">
                  {product.rating.rate}
                  <span className="flex">
                    {renderStars(product.rating.rate)}
                  </span>
                </p>
                <div>
                  <Button
                    onClick={() => handleAddBasket(dispatch, product)}
                    className="px-5 py-2 mt-2 rounded-sm hover:bg-[#ca9334] bg-[#E6A128] duration-200  uppercase text-white text-[14px]"
                  >
                    Add Basket
                  </Button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Category;
