import React, { lazy, Suspense } from "react";

import Header from "../../Components/header";
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
  const LazyComponent = lazy(lazyImport);
  return (
    <div className="cac_view">
      <Header />
      <Navigation selection={selection} />
      <Side />
      <Suspense fallback={fallback()}>
        <LazyComponent {...params} Fallback={fallback} />
      </Suspense>
      <Footer />
    </div>
  );
};

export default DefaultView;
