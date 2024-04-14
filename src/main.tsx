import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CameraPage, HomePage, UploadPhotoPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/upload",
    element: <UploadPhotoPage />,
  },
  {
    path: "/camera",
    element: <CameraPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground">
        <RouterProvider router={router} />
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
