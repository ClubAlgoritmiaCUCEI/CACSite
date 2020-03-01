import React, { lazy, Suspense } from "react";

import Header from "../../Components/header";
import Navigation from "../../Components/navigation";
import Side from "../../Components/side";
import Footer from "../../Components/footer";

import "./style.css";

const DefaultView = ({ selection, children, lazyImport, ...params }) => {
  const LazyComponent = lazy(lazyImport);
  return (
    <div className="cac_view">
      <Header />
      <Navigation selection={selection} />
      <Side />
      <Suspense fallback={<div />}>
        <LazyComponent {...params} />
      </Suspense>
      <Footer />
    </div>
  );
};

export default DefaultView;
