import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Button from "../button/Button";
import categoriesData from "../../mocks/menuData.json";
import { NavLink } from "react-router-dom";
import { CategoryData } from "../../types/Types";
import { FaAngleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../../redux/categorySlice";
function Menu() {
  const dispatch = useDispatch();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(
    null
  );
  const categories: CategoryData = categoriesData;

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleCategoryHover = (index: number) => {
    setOpenCategoryIndex(index);
  };

  const handleCategoryLeave = () => {
    setOpenCategoryIndex(null);
  };

  const handleSelectCategory = (categoryName: string) => {
    dispatch(setSelectedCategory(categoryName));
    setIsOpenMenu(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={toggleMenu}
        className="px-4 py-2 bg-[#E6A128] text-white rounded-[5px]"
      >
        <p className="text-[22px] flex items-center gap-2">
          <span>
            {isOpenMenu ? (
              <AiOutlineClose size={22} />
            ) : (
              <AiOutlineMenu size={22} />
            )}
          </span>
          КАТАЛОГ
        </p>
      </Button>

      {isOpenMenu && (
        <div className="absolute mt-4 w-full rounded-md shadow-lg z-10">
          <ul className="bg-white w-60 border-[1px]">
            {categories.categories.map((category, index) => (
              <li
                key={index}
                className="px-4 flex justify-between items-center py-2 hover:bg-gray-100 cursor-pointer relative"
                onMouseEnter={() => handleCategoryHover(index)}
                onMouseLeave={handleCategoryLeave}
              >
                {category.name}
                <FaAngleRight />
                {openCategoryIndex === index && (
                  <div className="absolute flex flex-col left-full top-0  bg-white shadow-lg z-10">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <NavLink
                        onClick={() => handleSelectCategory(subcategory)}
                        to={`category/${subcategory}`}
                        className="px-6 w-full py-2 hover:bg-gray-100 cursor-pointer"
                        key={subIndex}
                      >
                        
                        {subcategory}
                      </NavLink>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Menu;
