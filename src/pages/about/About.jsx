const About = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="card bg-base-200 shadow-md p-8 space-y-6">
                <h1 className="text-3xl font-bold text-[#00b795] text-center">
                    About T-Resize
                </h1>

                <p className="text-lg leading-relaxed text-gray-700">
                    <span className="font-semibold text-[#00b795]">
                        T-Resize
                    </span>{" "}
                    is a fast, simple, and user-friendly image resizer tool
                    built with modern web technologies like{" "}
                    <span className="font-medium">
                        React, TailwindCSS, DaisyUI
                    </span>
                    . It allows users to upload images, customize dimensions,
                    lock aspect ratio, and even compress images to a target file
                    size – all without losing quality.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-base-100 p-6 rounded-xl border border-[#00b795]/40 hover:shadow-md transition">
                        <h2 className="text-xl font-semibold text-[#00b795] mb-2">
                            ✨ Key Features
                        </h2>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                            <li>Resize images by width and height</li>
                            <li>Lock/unlock aspect ratio</li>
                            <li>Compress image to specific KB</li>
                            <li>Live preview & drag-drop upload</li>
                            <li>Download resized image instantly</li>
                        </ul>
                    </div>

                    <div className="bg-base-100 p-6 rounded-xl border border-[#00b795]/40 hover:shadow-md transition">
                        <h2 className="text-xl font-semibold text-[#00b795] mb-2">
                            💡 Technologies Used
                        </h2>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                            <li>React + Vite</li>
                            <li>Tailwind CSS</li>
                            <li>DaisyUI for UI components</li>
                            <li>HTML5 Canvas for image processing</li>
                            <li>SweetAlert2 for user feedback</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-base-100 p-6 rounded-xl border border-[#00b795]/40 hover:shadow-md transition text-center">
                    <h2 className="text-xl font-semibold text-[#00b795] mb-2">
                        👨‍💻 Developer Info
                    </h2>
                    <p className="text-gray-700">
                        Developed by{" "}
                        <a
                            href="https://jahiduljihad.netlify.app/"
                            target="_blank"
                            rel="noreferrer"
                            className="underline text-[#00b795] font-medium"
                        >
                            Jahidul Islam Jihad
                        </a>{" "}
                        — passionate fullstack developer from Bangladesh.
                    </p>
                </div>

                <div className="text-center pt-6">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} T-Resize. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
