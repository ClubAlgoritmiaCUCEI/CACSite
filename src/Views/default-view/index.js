import React, { lazy, Suspense } from "react";

import { useMediaQuery } from "react-responsive";

import Header from "../../Components/header";
import HeaderMobile from "../../Components/header-mobile";
import Navigation from "../../Components/navigation";
import Side from "../../Components/side";
import Footer from "../../Components/footer";

import "./style.css";

const DefaultView = ({
  selection,
  children,
  lazyImport,
  fallback,
  ...params
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });

  const LazyComponent = lazy(lazyImport);
  return (
    <div className="cac_view" id="page-wrap">
      {isTabletOrMobile ? (
        <HeaderMobile
          selection={selection}
          pageWrapId={"page-wrap"}
          outerContainerId={"page-wrap"}
        />
      ) : (
        <>
          <Header />
          <Navigation selection={selection} />
          <Side />
        </>
      )}
      <Suspense fallback={fallback()}>
        <LazyComponent {...params} Fallback={fallback} />
      </Suspense>
      <Footer />
    </div>
  );
};

export default DefaultView;
