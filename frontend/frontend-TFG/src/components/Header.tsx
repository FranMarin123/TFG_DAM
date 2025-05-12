import type { JSX } from "react";

import React from 'react';
import './Header.css'; 
import Logo from '../assets/LogoServly.jpeg';

const Header: React.FC = (): JSX.Element => {
  return (
    <header className="header-container">
      <div className="logo-container">
        <img
          src={Logo}
          alt="Logo"
          className="logo"
        />
      </div>
      <h1>Servly</h1>
    </header>
  );
};

export default Header;

