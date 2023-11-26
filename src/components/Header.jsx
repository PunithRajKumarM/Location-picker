import React from "react";
import Logo from "../assets/logo.png";

export default function Header() {
  return (
    <div className="header">
      <img src={Logo} alt="Just a logo" />
      <h1>Place picker</h1>
      <p>
        Create your personal collection that you would like to visit or you have
        visited.
      </p>
    </div>
  );
}
