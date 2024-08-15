import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import ClientThemeWrapper from "@/context/ClientThemeWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata: Metadata = {
  title: "Simple CRUD",
  description: "ToDo app for learning using Next JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <ThemeProvider>
          <ClientThemeWrapper>
            <div className="max-w-5xl mx-auto flex-1 mb-auto">
              <Navbar />
              <div className="content">{children}</div>
            </div>
            <Footer />
          </ClientThemeWrapper>
        </ThemeProvider>
        <ToastContainer position="top-center" containerId="a" stacked />
      </body>
    </html>
  );
}
