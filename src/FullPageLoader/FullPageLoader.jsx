import React, { useEffect, useState } from "react";
import AOS from "aos";
import "./FullPageLoader.css";

function FullPageLoader() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <React.Fragment>
      {/* <div className="fullpage-loader-holder">
			<div className="fullpage-loader">
			<div className="circle"></div>
			<div className="circle"></div>
			<div className="circle"></div>
			<div className="shadow"></div>
			<div className="shadow"></div>
			<div className="shadow"></div>
			</div>
		</div> */}
      <div className="center-body">
        {/* <div class="loading loading01">
          <span>S</span>
          <span>T</span>
          <span>A</span>
          <span>K</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
          <span className="no-span"> </span>
          <span className="no-span"></span>
          <span className="no-span">F</span>
          <span className="no-span">I</span>
          <span className="no-span">X</span>
          <span className="no-span">M</span>
          <span className="no-span"></span>
        </div> */}
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="loader-circle-7"></div>
      </div>
    </React.Fragment>
  );
}

export default FullPageLoader;
