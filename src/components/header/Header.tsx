import { NavLink } from "react-router-dom";
import Search from "./Search";
import Menu from "./Menu";
import { CgProfile } from "react-icons/cg";
import { SlBasket } from "react-icons/sl";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import Theme from "../theme/Theme";
import { useGetCategoriesQuery } from "../../redux/api/fakeApi";
import Skeleton from "../skeleton/Skeleton";
import { setSelectedCategory } from "../../redux/categorySlice";
// import { setCurrency } from "../../redux/currencySlice";
// import useConvertCurrency from "../utilities/convertCurrency";
type ApiResponse<T> = {
  data?: T;
  isLoading: boolean;
};

function Header() {
  const dispatch = useDispatch();
  const { data: categories, isLoading } =
    useGetCategoriesQuery() as ApiResponse<string[]>;

  const basketItems = useSelector((state: RootState) => state.basket.basket);
  const handleSelectCategory = (categoryName: string) => {
    dispatch(setSelectedCategory(categoryName));
  };
  //AYLIG LIMIT BITIB
  // const selectedCurrency = useSelector(
  //   (state: RootState) => state.currency.selectedCurrency
  // );
  // const currencyRates = useConvertCurrency();
  // const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   dispatch(setCurrency(e.target.value));
  // };

  return (
    <>
      <div className="flex justify-between items-center py-8 text-[18px] font-medium">
        <div className="col-span-1 flex items-start">
          <NavLink to="/">
            <img src="../img/logo.png" alt="" />
          </NavLink>
        </div>
        <div className="col-span-1 flex justify-between items-center gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_: any, index: number) => (
                <Skeleton key={index} type="menuItems" />
              ))
            : categories &&
              categories.map((category: string, index: number) => (
                <NavLink
                  onClick={() => handleSelectCategory(category)}
                  className='relative text-[16px] no-underline after:content-[""] after:absolute after:bg-[#E6A128] after:h-[3px] after:w-0 after:duration-300 after:left-0 after:bottom-[-5px] after:hover:w-[30px] hover:text-black transition-all'
                  to={`products/${category}`}
                  key={index}
                >
                  {category}
                </NavLink>
              ))}
        </div>
        <div className="col-span-1 flex justify-end items-center gap-4">
          {/* <select
            className="outline-none"
            onChange={handleCurrencyChange}
            value={selectedCurrency}
          >
            {Object.entries(currencyRates).map((currency) => (
              <option key={currency[0]} value={currency[0]}>
                {currency[0]}
              </option>
            ))}
          </select> */}

          <Theme />
          <p>8 800 355 55 55</p>
        </div>
      </div>
      <div className="flex w-full h-[50px] justify-between gap-12">
        <Menu categories={categories || []} isLoading={isLoading} />
        <Search />
        <div className="flex justify-end items-center gap-8">
          <NavLink className="relative" to="/basket">
            <p className="bg-yellow-500 rounded-[50%] h-[25px] w-[25px] flex justify-center items-center text-white absolute top-[-20px] right-[-20px]">
              {basketItems.length}{" "}
            </p>
            <SlBasket size={28} />
          </NavLink>
          <CgProfile size={28} />
        </div>
      </div>
    </>
  );
}

export default Header;
