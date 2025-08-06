// components
// import Navbar from "../components/common/Navbar";
// import Footer from "../components/common/Footer";
// libraries
import { Outlet } from "react-router-dom";

export default function Default() {
  return (
    <>
      {/* <Navbar />*/}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}
