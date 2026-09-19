import Footer from "./Footer";
import Header from "./Header";

export const Layout = ({children}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};