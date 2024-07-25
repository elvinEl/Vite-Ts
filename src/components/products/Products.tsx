import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";
import Button from "../button/Button";
import { TopProductsType, CurrencyRates } from "../../types/Types";
import { RootState } from "../../redux/store";
import { handleAddBasket } from "../utilities/handleBasket";
import useConvertCurrency from "../utilities/convertCurrency";
import { renderStars } from "../utilities/renderStars";
import Skeleton from "../skeleton/Skeleton";

function TopProducts() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.colorScheme);
  const currencyRates: CurrencyRates = useConvertCurrency();
  const selectedCurrency = useSelector(
    (state: RootState) => state.currency.selectedCurrency
  );
  const [products, setProducts] = useState<TopProductsType[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleFilter = (filterValue: string) => {
    setSelectedFilter(filterValue);
    const sortedProducts = [...products].sort((a, b) =>
      filterValue === "asc" ? a.price - b.price : b.price - a.price
    );
    setProducts(sortedProducts);
  };

  const convertPrice = (price: number) => {
    if (currencyRates[selectedCurrency]) {
      return (price / currencyRates[selectedCurrency].value).toFixed(0);
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
            className={`flex items-center gap-1 hover:bg-gray-100 duration-200 rounded-[12px] px-3 py-1 ${
              theme === "dark" ? "hover:text-black" : ""
            }`}
          >
            Увидеть все
            <span>
              <FaChevronRight />
            </span>
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-5 py-4 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
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
          : products.slice(0, 10).map((product: TopProductsType) => (
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
                  </span>
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

export default TopProducts;
