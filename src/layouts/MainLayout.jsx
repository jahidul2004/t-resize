import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
    return (
        <div className="bg-gray-100">
            {/* Navbar */}
            <Navbar></Navbar>

            {/* Outlet */}
            <Outlet></Outlet>

            {/* Footer */}
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;
