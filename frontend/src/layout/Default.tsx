// components
import Navbar from "../components/common/Navbar.tsx";
import Footer from "../components/common/Footer.tsx";
// libraries
import { Outlet } from "react-router-dom";

export default function Default() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
