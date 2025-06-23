import { Link } from "react-router-dom";

const Navbar = () => {
    const list = (
        <>
            <li>
                <Link to={"/"}>Home</Link>
            </li>
            <li>
                <Link to={"/about"}>About</Link>
            </li>
            <li>
                <Link to={"https://jahiduljihad.netlify.app/"}>Developer</Link>
            </li>
        </>
    );
    return (
        <div className="navbar bg-[#00b795] shadow-sm md:px-10 lg:px-20">
            <div className="flex-1">
                <a className="text-xl md:text-2xl lg:text-3xl font-bold">
                    <span className="">T</span>-Resize
                </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">{list}</ul>
            </div>
        </div>
    );
};

export default Navbar;
