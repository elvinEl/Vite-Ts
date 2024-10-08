import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Button from "../../components/button/Button";
import { TopProductsType, CurrencyRates } from "../../types/Types";
import { RootState } from "../../redux/store";
import { handleAddBasket } from "../../components/utilities/handleBasket";
import useConvertCurrency from "../../components/utilities/convertCurrency";
import { renderStars } from "../../components/utilities/renderStars";
import Skeleton from "../../components/skeleton/Skeleton";
import { useGetProductsQuery } from "../../redux/api/fakeApi";

function AllProducts() {
  const dispatch = useDispatch();
  const { data: products, isLoading } = useGetProductsQuery();
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

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading ? (
        <div className="grid grid-cols-5 gap-6 py-4">
          {Array.from({ length: 10 }).map((_: any, index: number) => (
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
          ))}
        </div>
      ) : products && products.length !== 0 ? (
        <div className="grid grid-cols-5 gap-6 py-4">
          {products.map((product: TopProductsType) => (
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
                <span className="uppercase font-bold"> {product.category}</span>{" "}
              </p>
              <p className="text-[14px]  line-clamp-2">{product.title}</p>
              <p className="text-[14px] line-clamp-2 flex items-center gap-1">
                {product.rating.rate}
                <span className="flex">{renderStars(product.rating.rate)}</span>
              </p>
              <div>
                <Button
                  onClick={() => handleAddBasket(dispatch, product)}
                  className="px-5 py-2 mt-2 rounded-sm hover:bg-[#ca9334] duration-200 bg-[#E6A128] uppercase text-white text-[14px]"
                >
                  Add Basket
                </Button>
              </div>
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
