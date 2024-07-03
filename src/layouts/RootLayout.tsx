import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollTop from "../components/utilities/ScrollToTop";
function RootLayout() {
  return (
    <>
      <header className="max-w-[80%] mx-auto">
        <Header />
      </header>
      <main className="max-w-[80%] mx-auto py-12 min-h-[50vh]">
        <ScrollTop />
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default RootLayout;
