import React, { useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  return (
    <nav className="flex items-center justify-between flex-wrap bg-brand-main p-4">
      <a href="/">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img
            src="/images/time-management.png"
            alt="pri0rity"
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
          />
          <span className="font-semibold text-xl tracking-tight">pri0rity</span>
        </div>
      </a>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-white border-white hover:bg-brand-light"
          onClick={() => setOpen(!isOpen)}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      {(width >= 1024 || isOpen) && (
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-md lg:ml-3 lg:flex-grow text-brand-light">
            <a
              target="_blank"
              href="https://github.com/JuanOriana/pri0rity"
              className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4"
            >
              Code
            </a>
            <a
              target="_blank"
              href="https://juanoriana-eta.vercel.app/"
              className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4"
            >
              Author
            </a>
          </div>
          {/*<div>*/}
          {/*  <a*/}
          {/*    href="#"*/}
          {/*    className="inline-block text-md px-4 py-2 leading-none*/}
          {/*    border rounded text-white border-white hover:bg-brand-light mt-4 lg:mt-0"*/}
          {/*  >*/}
          {/*    Download*/}
          {/*  </a>*/}
          {/*</div>*/}
        </div>
      )}
    </nav>
  );
}
export default Navbar;
