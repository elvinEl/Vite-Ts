import data from "../../mocks/topProductsData.json";
import { TopProductsType, CurrencyRates } from "../../types/Types";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Button from "../button/Button";
import { RootState } from "../../redux/store";
import { FaChevronRight } from "react-icons/fa";
import { handleAddBasket } from "../utilities/handleBasket";
import useConvertCurrency from "../utilities/convertCurrency";

function TopProducts() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.colorScheme);
  const currencyRates: CurrencyRates = useConvertCurrency();

  const chairs =
    data.categories.find((category) => category.name === "chairs")?.items ?? [];
  const [products, setProducts] = useState<TopProductsType[]>(
    chairs.slice(0, 10)
  );
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const handleFilter = (filterValue: string) => {
    setSelectedFilter(filterValue);
    const sortedProducts = [...products].sort((a, b) =>
      filterValue === "asc" ? a.price - b.price : b.price - a.price
    );
    setProducts(sortedProducts);
  };

  const convertPrice = (price: number) => {
    if (currencyRates[selectedCurrency]) {
      return (price / currencyRates[selectedCurrency].value).toFixed(2);
    }
    return price;
  };

  return (
    <div className="py-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between items-center">
        <p className="text-[30px] font-medium">Недавние объявления</p>
        <div className="flex gap-8">
          <select
            className="outline-none"
            onChange={(e) => setSelectedCurrency(e.target.value)}
            value={selectedCurrency}
          >
            {Object.entries(currencyRates).map((currency) => (
              <option key={currency[0]} value={currency[0]}>
                {currency[0]}
              </option>
            ))}
          </select>
          <select
            className={`border-[1px] outline-none p-1 ${
              theme === "dark" ? "bg-black" : ""
            }`}
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
          <NavLink
            to="/all-products"
            className="flex items-center gap-1 hover:bg-gray-100 duration-200 rounded-[12px] px-3 py-1"
          >
            Увидеть все
            <span>
              <FaChevronRight />
            </span>
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-5 py-4 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
        {products.map((product: TopProductsType) => (
          <div
            key={product.id}
            className="col-span-1 product-card flex flex-col justify-between"
          >
            <NavLink
              to={`/detail/${product.id}`}
              className="flex justify-center"
            >
              <img className="h-[200px]" src={product.img[0]} alt="" />
            </NavLink>
            <p className="font-bold flex gap-1 mt-2">
              Цена:
              <span className="font-normal">
                {convertPrice(product.price)} {selectedCurrency}
              </span>
            </p>
            <p className="text-[14px] mt-2 line-clamp-2">{product.title}</p>
            <div>
              <Button
                onClick={() => handleAddBasket(dispatch, product)}
                className="px-5 py-2 mt-2 rounded-sm hover:bg-[#ca9334] duration-200 bg-[#E6A128] uppercase text-white text-[14px]"
              >
                {product.btnText}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopProducts;
