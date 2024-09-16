import * as Cookies from "js-cookie";
import { useEffect } from "react";
import { CiLight, CiDark } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice";
import { RootState } from "../../redux/store";

function Theme() {
  const dispatch = useDispatch();
  const colorScheme = useSelector(
    (state: RootState) => state.theme.colorScheme
  );
  useEffect(() => {
    const savedScheme = Cookies.get("color-scheme");
    if (savedScheme) {
      dispatch(toggleTheme(savedScheme));
      updateBodyBackground(savedScheme);
    }
  }, []);

  const toggleColorScheme = () => {
    const newScheme = colorScheme === "light" ? "dark" : "light";
    dispatch(toggleTheme(newScheme));
    Cookies.set("color-scheme", newScheme);
    updateBodyBackground(newScheme);
  };

  const updateBodyBackground = (scheme: string) => {
    document.body.style.backgroundColor =
      scheme === "light" ? "#ffffff" : "#121212";
    document.body.style.color = scheme === "light" ? "#000000" : "#ffffff";
  };

  return (
    <div>
      <button
        className={`p-2 rounded ${
          colorScheme === "light" ? "bg-gray-200" : "bg-gray-800 text-white"
        }`}
        onClick={toggleColorScheme}
      >
        {colorScheme === "light" ? <CiLight size={24} /> : <CiDark size={24} />}
      </button>
    </div>
  );
}

export default Theme;
