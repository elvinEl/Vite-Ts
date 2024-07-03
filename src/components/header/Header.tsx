import { NavLink } from "react-router-dom";
import Search from "./Search";
import Menu from "./Menu";
import { CgProfile } from "react-icons/cg";
import { SlBasket } from "react-icons/sl";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
function Header() {
  const menuItems: string[] = ["Оплата", "Доставка", "Контакты", "Госзаказ"];
  const basketItems = useSelector((state: RootState) => state.basket.basket);

  return (
    <>
      <div className="grid grid-cols-3 py-8 text-[18px] font-medium">
        <div className="col-span-1 flex items-start">
          <NavLink to="/">
            <img src="../img/logo.png" alt="" />
          </NavLink>
        </div>
        <div className="col-span-1 flex justify-center items-center gap-8 ">
          {menuItems.map((item, index) => (
            <NavLink
              className='relative no-underline after:content-[""] after:absolute after:bg-[#E6A128] after:h-[3px] after:w-0 after:duration-300 after:left-0 after:bottom-[-5px] after:hover:w-[30px] hover:text-black transition-all'
              to={`/${item.toLowerCase()}`}
              key={index}
            >
              {item}
            </NavLink>
          ))}
        </div>
        <div className="col-span-1 flex justify-end items-center gap-4">
          {/* <label>
            <input type="radio" name="color-scheme" value="light" />
            Light
          </label>
          <label>
            <input type="radio" name="color-scheme" value="dark" />
            Dark
          </label> */}
          <p>8 800 355 55 55</p>
        </div>
      </div>
      <div className="flex w-full justify-between gap-12">
        <Menu />
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
