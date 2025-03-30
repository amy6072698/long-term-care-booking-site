import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";


export default function FrontLayout() {
  return (
    <>
      <ScrollToTop />
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
}
