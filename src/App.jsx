import React, { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import "./locomotive-scroll.css";
import gsap from 'gsap';

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    // Cleanup on unmount
    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
              gsap.to("body", {
                backgroundColor: "#fd2c2a",
                duration: 0,
                ease: "linear",
              })
            },
          });
        } else {
          gsap.to("body", {
            backgroundColor: "#ffffff",
            duration: 1.2,
            delay: 0,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <span ref={growingSpan} className="growing block top-[-10px] left-[-10px] w-[10px] h-[10px] bg-[#fd2c2a] absolute rounded-full"></span>
      <div
        className='w-full relative min-h-screen 
        transition-all duration-500 ease-in-out'
      >
        {showCanvas && 
          data[0].map((canvasdets, i) => (
            <Canvas 
              key={i} 
              details={canvasdets}
            />
          ))
        }

        <div className="w-full relative z-[1] h-screen">
          <nav className="w-full p-3 flex justify-between z-50">
            <div className="brand text-1xl font-md">Thirtysixstudios</div>
            <div className="links flex gap-10">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md font-light hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer w-full px-8 py-12">
            <div className="text w-[360px] ml-[24.7%]">
              <h3 className="text-[34px] leading-[1.065] font-[300]">
                At Thirtysixstudio, we build digital assets and immersive experiences for purposeful brands.
              </h3>
              <p className="text-[15px] w-[350px] mt-8 font-light leading-[1.25]">
                We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital craft can do for present-day ads and campaigns.
              </p>
              <p className="text-md mt-7">Scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0">
            <h1
              ref={headingref}
              className="text-[16.5vw] font-normal tracking-tight leading-none pl-2"
            >
              Thirtysixstudio
            </h1>
          </div>
        </div>

        {showCanvas && 
          data[1].map((canvasdets, i) => (
            <Canvas 
              key={i} 
              details={canvasdets}
            />
          ))
        }
        <div className="w-full relative z-[1] h-screen"></div>
      </div>
    </>
  );
}

export default App;
