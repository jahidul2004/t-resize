const Footer = () => {
    return (
        <footer className="px-4 py-8 dark:bg-gray-100 dark:text-gray-600">
            <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
                <div className="flex flex-row items-center pr-3 space-x-4 sm:space-x-8">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-[#00b795]">
                        <h1 className="text-xl font-bold text-white">T</h1>
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl">
                        T-Resizer
                    </h3>
                </div>
                <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
                    <li>
                        <a rel="noopener noreferrer" href="#">
                            Facebook
                        </a>
                    </li>
                    <li>
                        <a rel="noopener noreferrer" href="#">
                            Twitter
                        </a>
                    </li>
                    <li>
                        <a rel="noopener noreferrer" href="#">
                            Portfolio
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
