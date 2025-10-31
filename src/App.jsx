import React, { useEffect } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";

function App() {

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen relative text-white">
        {
          data[0].map((canvasdets) => (
            <Canvas details={canvasdets} />
          ))
        }
      </div>
      <div className="w-full min-h-screen relative text-white">
        {
          data[2].map((canvasdets) => (
            <Canvas details={canvasdets} />
          ))
        }
      </div>
    </>
  )
}

export default App
