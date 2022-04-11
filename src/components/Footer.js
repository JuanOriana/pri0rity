import React from "react";

function Footer() {
  return (
    <footer className="text-center bg-brand-main opacity-90 p-2 text-white">
      &copy; {new Date().getFullYear()} Juan Pablo Oriana. All Rights Reserved.
    </footer>
  );
}

export default Footer;
