import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Home from "./components/Home";
import clsxm from "./lib/clsxm";

const App = () => {
  useEffect(() => {
    document.cookie = "session_token=60d0e366-bae3-47e1-b093-abc5fe3bc360";
  }, []);

  return (
    <div
      className={clsxm(
        "md:pt-[75px] md:pr-[115px] md:pl-[50px]",
        "pt-10 pr-[22px] pl-8 mb-2.5"
      )}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:courseId" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
