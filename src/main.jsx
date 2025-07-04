import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Resizer from "./pages/resizer/Resizer";
import About from "./pages/about/About";
import { Analytics } from "@vercel/analytics/react";

// Service worker auto register (vite-plugin-pwa way)
import { registerSW } from "virtual:pwa-register";
registerSW({ immediate: true });

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Resizer></Resizer>,
            },
            {
                path: "/about",
                element: <About></About>,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
        <Analytics />
    </StrictMode>
);
