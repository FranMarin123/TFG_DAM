import type { JSX } from "react";

import './Footer.css'; 
import Logo from '../assets/LogoServly.jpeg';

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer>
      <div className="logo-container">
        <img
          src={Logo}
          alt="Logo"
          className="logo"
        />
      </div>
      <p>© 2025 Servly</p>
    </footer>
  );
};

export default Footer;
