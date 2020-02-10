import React, { Suspense, lazy } from "react";

import "./style.css";

const Badges = ({ badges, className }) => {
  return (
    <div className={`cac_badges ${className || ""}`}>
      {badges.map((src, i) => {
        const badge = lazy(() => import(src));
        return (
          <div id={i} className="cac_badge-container" style={{ zIndex: 4 - i }}>
            <Suspense fallback={<div className="cac_badge_fallback" />}>
              <img class="cac_badge_image" src={badge} alt="badge" />
            </Suspense>
          </div>
        );
      })}
    </div>
  );
};

export default Badges;