import React, { lazy, Suspense, useEffect } from "react";

import { useMediaQuery } from "react-responsive";

import Header from "../../Components/header";
import HeaderMobile from "../../Components/header-mobile";
import Navigation from "../../Components/navigation";
import Side from "../../Components/side";
import Footer from "../../Components/footer";

import "./style.css";

const DefaultView = props => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const {
    selection,
    lazyImport,
    fallback,
  } = props;
  const LazyComponent = lazy(lazyImport);

  useEffect(() => {
    window.gtag("config", "UA-161018242-1", { 'page_path': `/${selection}` });
  }, [selection])

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
        <LazyComponent {...props} Fallback={fallback} />
      </Suspense>
      <Footer />
    </div>
  );
};

export default DefaultView;
