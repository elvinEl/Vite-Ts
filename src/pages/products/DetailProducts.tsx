import { useParams } from "react-router-dom";
import { TopProductsType, CurrencyRates } from "../../types/Types";
import { addBasket } from "../../redux/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/button/Button";
import useConvertCurrency from "../../components/utilities/convertCurrency";
import { RootState } from "../../redux/store";
import { renderStars } from "../../components/utilities/renderStars";
import Skeleton from "../../components/skeleton/Skeleton";
import { useGetProductsByIdQuery } from "../../redux/api/fakeApi";
function DetailProducts() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const validId = id || "";
  const { data: product, isLoading } = useGetProductsByIdQuery({ id: validId });
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
  const handleAddBasket = (product: TopProductsType) => {
    dispatch(addBasket(product));
    toast.success("Товар добавлен в корзину");
  };
  return (
    <div className="container mx-auto p-8">
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Skeleton type="detail-image" />
          </div>
          <div className="flex flex-col ">
            <Skeleton type="title" />
            <Skeleton type="category" />
            <Skeleton type="text" />
            <Skeleton type="rating" />
            <Skeleton type="price" />
            <Skeleton type="button" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              className="rounded-lg shadow-lg h-[600px]"
              src={product?.image}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-4xl font-bold mb-4">{product?.title}</p>
              <p className="mb-4 uppercase font-bold">{product?.category}</p>
              <p className="mb-4">{product?.description}</p>
              <p className="text-[18px] line-clamp-2 mb-4 flex items-center gap-1">
                {product?.rating?.rate}
                <span className="flex">
                  {product &&
                    product.rating &&
                    renderStars(product.rating.rate)}
                </span>
              </p>
              <p className="text-3xl font-semibold text-blue-600 mb-4">
                {product && product.price && convertPrice(product?.price)}{" "}
                {selectedCurrency}
              </p>

              <Button
                onClick={() => product && handleAddBasket(product)}
                className="px-5 py-2 mt-2 rounded-sm hover:bg-[#ca9334] bg-[#E6A128] duration-200  uppercase text-white text-[14px]"
              >
                Add Basket
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailProducts;
