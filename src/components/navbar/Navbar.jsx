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
                <Link to={"https://jahiduljihad.netlify.app/"} target="_blank">
                    Developer
                </Link>
            </li>
        </>
    );

    return (
        <div className="navbar bg-[#00b795] shadow-sm md:px-10 lg:px-20 text-white">
            <div className="flex-1">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-xl md:text-2xl lg:text-3xl font-bold"
                >
                    <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                        <span className="text-[#00b795] text-xl font-bold">
                            T
                        </span>
                    </div>
                    <span>T</span>-Resize
                </Link>
            </div>

            {/* Mobile Menu */}
            <div className="flex-none lg:hidden">
                <details className="dropdown dropdown-end">
                    <summary className="btn btn-ghost text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </summary>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                        {list}
                    </ul>
                </details>
            </div>

            {/* Desktop Menu */}
            <div className="flex-none hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-white">{list}</ul>
            </div>
        </div>
    );
};

export default Navbar;
