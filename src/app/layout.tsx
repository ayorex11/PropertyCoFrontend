import type { Metadata } from "next";
import { Urbanist, Poppins, Barlow } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider"
import StoreProvider from "./StoreProvider";
import ModalContainer from "@/components/ModalContainer";
import { ToastContainer } from "react-toastify";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "PropertyCo",
  description: "Explore a wide range of real estate listings in Lagos, including homes for sale, rental properties, and joint venture opportunities. Our platform provides detailed property insights, market trends, and expert guidance to help you make informed decisions whether you're buying, renting, or investing. Join us today to find your perfect property and unlock your real estate potential!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${urbanist.variable} ${poppins.variable} ${barlow.variable} antialiased`}
      >
        <Provider>
          <StoreProvider>
            <ModalContainer/>
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            {children}
          </StoreProvider>
        </Provider>
      </body>
    </html>
  );
}
